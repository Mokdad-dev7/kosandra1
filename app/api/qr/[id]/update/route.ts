import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/get-session'
import { prisma } from '@/lib/db/client'
import { z } from 'zod'
import { validateQRData, validateCustomizations, validateUrl, sanitizeString } from '@/lib/security/validation'
import { apiRateLimit } from '@/lib/security/rate-limit'
import { securityHeaders } from '@/lib/security/headers'
import { validateRequestBodySize, safeJsonParse } from '@/lib/security/request-limits'

const updateQRSchema = z.object({
  data: z.any(),
  customizations: z.any().optional(),
  dynamicUrl: z.string().max(2048).optional(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Rate limiting
    const rateLimitResponse = await apiRateLimit(request)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    // Preview mode
    if (!process.env.DATABASE_URL) {
      const response = NextResponse.json({ error: 'Database not configured' }, { status: 503 })
      return securityHeaders(response)
    }

    const session = await getSession()

    if (!session?.user) {
      const response = NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      return securityHeaders(response)
    }

    if (!prisma) {
      const response = NextResponse.json({ error: 'Database not configured' }, { status: 503 })
      return securityHeaders(response)
    }

    // Validate and sanitize QR code ID
    const qrId = sanitizeString(params.id, 50)
    if (!qrId || qrId !== params.id) {
      const response = NextResponse.json({ error: 'Invalid QR code ID' }, { status: 400 })
      return securityHeaders(response)
    }

    // Validate request body size
    const bodySizeCheck = await validateRequestBodySize(request)
    if (bodySizeCheck) {
      return bodySizeCheck
    }

    // Safely parse JSON with size limits
    const parseResult = await safeJsonParse<z.infer<typeof updateQRSchema>>(request)
    if (parseResult.error) {
      return parseResult.error
    }

    const body = parseResult.data
    const validatedData = updateQRSchema.parse(body)

    const qrCode = await prisma.qRCode.findFirst({
      where: {
        id: qrId,
        userId: session.user.id,
      },
    })

    if (!qrCode) {
      const response = NextResponse.json({ error: 'QR code not found' }, { status: 404 })
      return securityHeaders(response)
    }

    // Validate and sanitize QR data if provided
    let sanitizedData = qrCode.data
    if (validatedData.data) {
      const dataValidation = validateQRData(qrCode.type, validatedData.data)
      if (!dataValidation.valid) {
        const response = NextResponse.json(
          { error: dataValidation.error || 'Invalid QR code data' },
          { status: 400 }
        )
        return securityHeaders(response)
      }
      sanitizedData = JSON.stringify(dataValidation.sanitized)
    }

    // Validate customizations if provided
    let sanitizedCustomizations = qrCode.customizations
    if (validatedData.customizations) {
      const customizationsValidation = validateCustomizations(validatedData.customizations)
      if (!customizationsValidation.valid) {
        const response = NextResponse.json(
          { error: customizationsValidation.error || 'Invalid customizations' },
          { status: 400 }
        )
        return securityHeaders(response)
      }
      sanitizedCustomizations = customizationsValidation.sanitized
    }

    // Validate dynamic URL if provided
    let sanitizedDynamicUrl = qrCode.dynamicUrl
    if (validatedData.dynamicUrl) {
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

    const updated = await prisma.qRCode.update({
      where: { id: qrId },
      data: {
        data: sanitizedData,
        customizations: sanitizedCustomizations,
        dynamicUrl: sanitizedDynamicUrl,
        updatedAt: new Date(),
      },
    })

    const response = NextResponse.json({ qrCode: updated })
    return securityHeaders(response)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response = NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
      return securityHeaders(response)
    }

    console.error('Error updating QR code:', error)
    // Don't expose internal error details
    const response = NextResponse.json(
      { error: 'Failed to update QR code' },
      { status: 500 }
    )
    return securityHeaders(response)
  }
}

