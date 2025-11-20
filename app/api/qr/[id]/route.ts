import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/get-session'
import { prisma } from '@/lib/db/client'
import { sanitizeString } from '@/lib/security/validation'
import { apiRateLimit } from '@/lib/security/rate-limit'
import { securityHeaders } from '@/lib/security/headers'

export async function GET(
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

    const qrCode = await prisma.qRCode.findFirst({
      where: {
        id: qrId,
        userId: session.user.id,
      },
      include: {
        _count: {
          select: { analytics: true },
        },
      },
    })

    if (!qrCode) {
      const response = NextResponse.json({ error: 'QR code not found' }, { status: 404 })
      return securityHeaders(response)
    }

    const response = NextResponse.json({ qrCode })
    return securityHeaders(response)
  } catch (error) {
    console.error('Error fetching QR code:', error)
    return NextResponse.json(
      { error: 'Failed to fetch QR code' },
      { status: 500 }
    )
  }
}

export async function DELETE(
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

    await prisma.qRCode.delete({
      where: { id: qrId },
    })

    const response = NextResponse.json({ message: 'QR code deleted successfully' })
    return securityHeaders(response)
  } catch (error) {
    console.error('Error deleting QR code:', error)
    // Don't expose internal error details
    const response = NextResponse.json(
      { error: 'Failed to delete QR code' },
      { status: 500 }
    )
    return securityHeaders(response)
  }
}

