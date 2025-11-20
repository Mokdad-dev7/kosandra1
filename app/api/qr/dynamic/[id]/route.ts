import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/get-session'
import { prisma } from '@/lib/db/client'
import { z } from 'zod'
import { validateUrl, sanitizeString, validateQRData, validateCustomizations } from '@/lib/security/validation'
import { dynamicQRRateLimit, apiRateLimit } from '@/lib/security/rate-limit'
import { securityHeaders } from '@/lib/security/headers'
import { validateRequestBodySize, safeJsonParse } from '@/lib/security/request-limits'

const updateDynamicQRSchema = z.object({
  data: z.any(),
  customizations: z.any().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Rate limiting for dynamic QR scans (prevent abuse)
    const rateLimitResponse = await dynamicQRRateLimit(request)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    // Preview mode
    if (!process.env.DATABASE_URL || !prisma) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }

    // Validate QR code ID format (prevent injection)
    const qrId = sanitizeString(params.id, 50)
    if (!qrId || qrId !== params.id) {
      return NextResponse.json({ error: 'Invalid QR code ID' }, { status: 400 })
    }

    const qrCode = await prisma.qRCode.findUnique({
      where: { id: qrId },
    })

    if (!qrCode || !qrCode.isDynamic) {
      return NextResponse.json({ error: 'QR code not found or not dynamic' }, { status: 404 })
    }

    // Track the scan (with throttling protection)
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                      request.headers.get('x-real-ip') || 
                      'unknown'
    const userAgent = sanitizeString(request.headers.get('user-agent') || 'unknown', 500)

    // Limit analytics entries per QR code to prevent DoS
    const recentScans = await prisma.qRCodeAnalytics.count({
      where: {
        qrCodeId: qrCode.id,
        scannedAt: {
          gte: new Date(Date.now() - 60 * 1000), // Last minute
        },
      },
    })

    // Only log if under threshold (prevent database flooding)
    if (recentScans < 1000) {
      try {
        await prisma.qRCodeAnalytics.create({
          data: {
            qrCodeId: qrCode.id,
            ipAddress: ipAddress !== 'unknown' ? ipAddress : null,
            userAgent: userAgent !== 'unknown' ? userAgent : null,
          },
        })
      } catch (error) {
        // Don't fail the request if analytics logging fails
        console.error('Failed to log QR scan:', error)
      }
    }

    // Get the current data (either from dynamicUrl or data field)
    let redirectUrl: string | null = null

    if (qrCode.dynamicUrl) {
      redirectUrl = qrCode.dynamicUrl
    } else {
      try {
        const data = JSON.parse(qrCode.data)
        if (qrCode.type === 'url' && data.url) {
          redirectUrl = data.url
        }
      } catch (error) {
        console.error('Failed to parse QR code data:', error)
        return NextResponse.json({ error: 'Invalid QR code data' }, { status: 500 })
      }
    }

    // CRITICAL SECURITY: Validate redirect URL to prevent open redirect attacks
    if (redirectUrl) {
      // Sanitize URL
      const sanitizedUrl = sanitizeString(redirectUrl, 2048)

      // Validate URL format and security
      if (!validateUrl(sanitizedUrl)) {
        console.error('Invalid or unsafe redirect URL:', sanitizedUrl)
        return NextResponse.json(
          { error: 'Invalid or unsafe redirect URL' },
          { status: 400 }
        )
      }

      // Additional check: Prevent redirects to localhost/private IPs
      try {
        const url = new URL(sanitizedUrl)
        const hostname = url.hostname.toLowerCase()

        // Block private IPs and localhost
        if (
          hostname === 'localhost' ||
          hostname === '127.0.0.1' ||
          hostname.startsWith('192.168.') ||
          hostname.startsWith('10.') ||
          (hostname.startsWith('172.') && 
           parseInt(hostname.split('.')[1] || '0') >= 16 && 
           parseInt(hostname.split('.')[1] || '0') <= 31)
        ) {
          console.error('Blocked redirect to private IP:', hostname)
          return NextResponse.json(
            { error: 'Redirect to private network not allowed' },
            { status: 403 }
          )
        }
      } catch (error) {
        console.error('Failed to parse redirect URL:', error)
        return NextResponse.json(
          { error: 'Invalid redirect URL format' },
          { status: 400 }
        )
      }

      // Safe redirect with security headers
      const response = NextResponse.redirect(sanitizedUrl)
      return securityHeaders(response)
    }

    // For non-URL types, return the data as JSON
    try {
      const data = JSON.parse(qrCode.data)
      const response = NextResponse.json({ type: qrCode.type, data })
      return securityHeaders(response)
    } catch (error) {
      return NextResponse.json({ error: 'Failed to parse QR code data' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error handling dynamic QR code:', error)
    // Don't expose internal error details
    return NextResponse.json(
      { error: 'Failed to process QR code' },
      { status: 500 }
    )
  }
}

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
    if (!process.env.DATABASE_URL || !prisma) {
      const response = NextResponse.json({ error: 'Database not configured' }, { status: 503 })
      return securityHeaders(response)
    }

    const session = await getSession()

    if (!session?.user) {
      const response = NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      return securityHeaders(response)
    }

    // Validate QR code ID
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
    const parseResult = await safeJsonParse<z.infer<typeof updateDynamicQRSchema>>(request)
    if (parseResult.error) {
      return parseResult.error
    }

    const body = parseResult.data
    const validatedData = updateDynamicQRSchema.parse(body)

    const qrCode = await prisma.qRCode.findFirst({
      where: {
        id: qrId,
        userId: session.user.id,
        isDynamic: true,
      },
    })

    if (!qrCode) {
      const response = NextResponse.json({ error: 'QR code not found' }, { status: 404 })
      return securityHeaders(response)
    }

    // Validate and sanitize QR data
    const dataValidation = validateQRData(qrCode.type, validatedData.data)
    if (!dataValidation.valid) {
      const response = NextResponse.json(
        { error: dataValidation.error || 'Invalid QR code data' },
        { status: 400 }
      )
      return securityHeaders(response)
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

    // For dynamic QR codes, validate the URL if it's a URL type
    let dynamicUrl = qrCode.dynamicUrl
    if (qrCode.type === 'url' && dataValidation.sanitized?.url) {
      const url = sanitizeString(dataValidation.sanitized.url, 2048)
      if (!validateUrl(url)) {
        const response = NextResponse.json(
          { error: 'Invalid or unsafe URL' },
          { status: 400 }
        )
        return securityHeaders(response)
      }
      dynamicUrl = url
    }

    const updated = await prisma.qRCode.update({
      where: { id: qrId },
      data: {
        data: JSON.stringify(dataValidation.sanitized),
        customizations: sanitizedCustomizations,
        dynamicUrl,
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

    console.error('Error updating dynamic QR code:', error)
    // Don't expose internal error details
    const response = NextResponse.json(
      { error: 'Failed to update QR code' },
      { status: 500 }
    )
    return securityHeaders(response)
  }
}

