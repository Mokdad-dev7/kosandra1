import { NextRequest, NextResponse } from 'next/server'
import { generateQRCode, generateQRCodeSVG } from '@/lib/qr/generator'
import type { GenerateQROptions } from '@/types'
import { qrGenerationRateLimit } from '@/lib/security/rate-limit'
import { validateQRData, validateCustomizations, validateUrl, sanitizeString } from '@/lib/security/validation'
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

    // Generate QR code with validated data
    const dataUrl = await generateQRCode({
      type,
      data: dataValidation.sanitized!,
      customizations: customizationsValidation.sanitized,
    })

    const response = NextResponse.json({ dataUrl })
    return securityHeaders(response)
  } catch (error) {
    console.error('Error generating QR code:', error)
    // Don't expose internal error details
    const response = NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    )
    return securityHeaders(response)
  }
}

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = await qrGenerationRateLimit(request)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    const searchParams = request.nextUrl.searchParams
    const format = searchParams.get('format')
    const dataUrl = searchParams.get('dataUrl')

    // Validate and sanitize query parameters
    if (format && format !== 'svg') {
      const response = NextResponse.json({ error: 'Invalid format parameter' }, { status: 400 })
      return securityHeaders(response)
    }

    if (format === 'svg' && dataUrl) {
      // Validate dataUrl to prevent SSRF
      const sanitizedDataUrl = sanitizeString(dataUrl, 2048)
      // Allow data: protocol for this endpoint as it's needed for QR code data URLs
      if (!validateUrl(sanitizedDataUrl, ['http:', 'https:', 'data:'])) {
        const response = NextResponse.json({ error: 'Invalid data URL' }, { status: 400 })
        return securityHeaders(response)
      }

      // Only allow data: URLs or same-origin URLs
      if (!sanitizedDataUrl.startsWith('data:') && !sanitizedDataUrl.startsWith(request.nextUrl.origin)) {
        const response = NextResponse.json({ error: 'Invalid data URL source' }, { status: 400 })
        return securityHeaders(response)
      }

      try {
        // Extract the data from the dataUrl and regenerate as SVG
        // This is a simplified approach - in production, you'd want to store the original options
        const fetchResponse = await fetch(sanitizedDataUrl)
        if (!fetchResponse.ok) {
          throw new Error('Failed to fetch data URL')
        }
        const blob = await fetchResponse.blob()
        
        // For now, return the PNG as-is
        // In a full implementation, you'd regenerate the QR code as SVG
        const response = new NextResponse(blob, {
          headers: {
            'Content-Type': 'image/png',
          },
        })
        return securityHeaders(response)
      } catch (fetchError) {
        console.error('Error fetching data URL:', fetchError)
        const response = NextResponse.json({ error: 'Failed to process data URL' }, { status: 400 })
        return securityHeaders(response)
      }
    }

    const response = NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    return securityHeaders(response)
  } catch (error) {
    console.error('Error:', error)
    // Don't expose internal error details
    const response = NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
    return securityHeaders(response)
  }
}

