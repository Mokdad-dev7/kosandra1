import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/get-session'
import { prisma } from '@/lib/db/client'
import { apiRateLimit } from '@/lib/security/rate-limit'
import { securityHeaders } from '@/lib/security/headers'

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = await apiRateLimit(request)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    // Preview mode - return empty list
    if (!process.env.DATABASE_URL) {
      const response = NextResponse.json({
        qrCodes: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
      })
      return securityHeaders(response)
    }

    const session = await getSession()

    if (!session?.user) {
      const response = NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      return securityHeaders(response)
    }

    if (!prisma) {
      const response = NextResponse.json({
        qrCodes: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
      })
      return securityHeaders(response)
    }

    const searchParams = request.nextUrl.searchParams
    // Validate and sanitize pagination parameters
    const page = Math.max(1, Math.min(100, parseInt(searchParams.get('page') || '1') || 1))
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '10') || 10))
    const skip = (page - 1) * limit

    const [qrCodes, total] = await Promise.all([
      prisma.qRCode.findMany({
        where: { userId: session.user.id },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { analytics: true },
          },
        },
      }),
      prisma.qRCode.count({
        where: { userId: session.user.id },
      }),
    ])

    const response = NextResponse.json({
      qrCodes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
    return securityHeaders(response)
  } catch (error) {
    console.error('Error fetching QR codes:', error)
    // Don't expose internal error details
    const response = NextResponse.json(
      { error: 'Failed to fetch QR codes' },
      { status: 500 }
    )
    return securityHeaders(response)
  }
}

