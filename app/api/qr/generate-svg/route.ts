import { NextRequest, NextResponse } from 'next/server'
import { generateQRCodeSVG } from '@/lib/qr/generator'
import type { GenerateQROptions } from '@/types'
import { qrGenerationRateLimit } from '@/lib/security/rate-limit'
import { validateQRData, validateCustomizations } from '@/lib/security/validation'
import { securityHeaders } from '@/lib/security/headers'
import { validateRequestBodySize, safeJsonParse } from '@/lib/security/request-limits'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = await qrGenerationRateLimit(request)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    // Validate request body size
    const bodySizeCheck = await validateRequestBodySize(request)
    if (bodySizeCheck) {
      return bodySizeCheck
    }

    // Safely parse JSON with size limits
    const parseResult = await safeJsonParse<GenerateQROptions>(request)
    if (parseResult.error) {
      return parseResult.error
    }

    const body = parseResult.data
    const { type, data, customizations } = body

    // Validate input
    if (!type || !data) {
      const response = NextResponse.json(
        { error: 'Type and data are required' },
        { status: 400 }
      )
      return securityHeaders(response)
    }

    // Validate QR code type
    const validTypes = ['url', 'text', 'email', 'phone', 'sms', 'wifi', 'vcard', 'event', 'location', 'social', 'barcode', 'custom']
    if (!validTypes.includes(type)) {
      const response = NextResponse.json(
        { error: 'Invalid QR code type' },
        { status: 400 }
      )
      return securityHeaders(response)
    }

    // Validate and sanitize QR data
    const dataValidation = validateQRData(type, data)
    if (!dataValidation.valid) {
      const response = NextResponse.json(
        { error: dataValidation.error || 'Invalid QR code data' },
        { status: 400 }
      )
      return securityHeaders(response)
    }

    // Validate customizations
    const customizationsValidation = validateCustomizations(customizations)
    if (!customizationsValidation.valid) {
      const response = NextResponse.json(
        { error: customizationsValidation.error || 'Invalid customizations' },
        { status: 400 }
      )
      return securityHeaders(response)
    }

    // Generate SVG with validated data
    const svg = await generateQRCodeSVG({
      type,
      data: dataValidation.sanitized!,
      customizations: customizationsValidation.sanitized,
    })

    const response = NextResponse.json({ svg })
    return securityHeaders(response)
  } catch (error) {
    console.error('Error generating QR code SVG:', error)
    // Don't expose internal error details
    const response = NextResponse.json(
      { error: 'Failed to generate QR code SVG' },
      { status: 500 }
    )
    return securityHeaders(response)
  }
}

