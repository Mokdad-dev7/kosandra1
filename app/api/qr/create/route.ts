import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/get-session'
import { prisma } from '@/lib/db/client'
import { z } from 'zod'
import type { QRCodeType, QRCodeData, QRCodeCustomizations } from '@/types'
import { validateQRData, validateCustomizations, validateUrl, sanitizeString } from '@/lib/security/validation'
import { apiRateLimit } from '@/lib/security/rate-limit'
import { securityHeaders } from '@/lib/security/headers'
import { validateRequestBodySize, safeJsonParse } from '@/lib/security/request-limits'

const createQRSchema = z.object({
  type: z.enum(['url', 'text', 'email', 'phone', 'sms', 'wifi', 'vcard']),
  data: z.any(), // QRCodeData - will be validated separately
  customizations: z.any().optional(), // QRCodeCustomizations - will be validated separately
  isDynamic: z.boolean().optional(),
  dynamicUrl: z.string().max(2048).optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = await apiRateLimit(request)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    // Preview mode - return mock response
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { 
          error: 'Database not configured. This is preview mode.',
          qrCode: { id: 'preview-' + Date.now(), message: 'QR code would be saved here' }
        },
        { status: 503 }
      )
    }

    const session = await getSession()

    if (!session?.user) {
      const response = NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      return securityHeaders(response)
    }

    // Validate request body size
    const bodySizeCheck = await validateRequestBodySize(request)
    if (bodySizeCheck) {
      return bodySizeCheck
    }

    // Safely parse JSON with size limits
    const parseResult = await safeJsonParse<z.infer<typeof createQRSchema>>(request)
    if (parseResult.error) {
      return parseResult.error
    }

    const body = parseResult.data
    const validatedData = createQRSchema.parse(body)

    if (!prisma) {
      const response = NextResponse.json(
        { error: 'Database not configured. Please run "prisma generate" first.' },
        { status: 503 }
      )
      return securityHeaders(response)
    }

    // Validate and sanitize QR data
    const dataValidation = validateQRData(validatedData.type, validatedData.data)
    if (!dataValidation.valid) {
      const response = NextResponse.json(
        { error: dataValidation.error || 'Invalid QR code data' },
        { status: 400 }
      )
      return securityHeaders(response)
    }

    // Validate customizations
    const customizationsValidation = validateCustomizations(validatedData.customizations)
    if (!customizationsValidation.valid) {
      const response = NextResponse.json(
        { error: customizationsValidation.error || 'Invalid customizations' },
        { status: 400 }
      )
      return securityHeaders(response)
    }

    // Validate dynamic URL if provided
    let sanitizedDynamicUrl: string | null = null
    if (validatedData.isDynamic && validatedData.dynamicUrl) {
      const sanitized = sanitizeString(validatedData.dynamicUrl, 2048)
      if (!validateUrl(sanitized)) {
        const response = NextResponse.json(
          { error: 'Invalid or unsafe dynamic URL' },
          { status: 400 }
        )
        return securityHeaders(response)
      }
      sanitizedDynamicUrl = sanitized
    }

    // Only allow dynamic QR codes for URL type
    if (validatedData.isDynamic && validatedData.type !== 'url') {
      const response = NextResponse.json(
        { error: 'Dynamic QR codes are only supported for URL type' },
        { status: 400 }
      )
      return securityHeaders(response)
    }

    const qrCode = await prisma.qRCode.create({
      data: {
        userId: session.user.id,
        type: validatedData.type,
        data: JSON.stringify(dataValidation.sanitized),
        customizations: customizationsValidation.sanitized || null,
        isDynamic: validatedData.isDynamic || false,
        dynamicUrl: sanitizedDynamicUrl,
      },
    })

    const response = NextResponse.json({ qrCode }, { status: 201 })
    return securityHeaders(response)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response = NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
      return securityHeaders(response)
    }

    console.error('Error creating QR code:', error)
    // Don't expose internal error details
    const response = NextResponse.json(
      { error: 'Failed to create QR code' },
      { status: 500 }
    )
    return securityHeaders(response)
  }
}

