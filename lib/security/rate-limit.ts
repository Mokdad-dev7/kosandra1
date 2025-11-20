import { NextRequest, NextResponse } from 'next/server'

interface RateLimitOptions {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
  message?: string
  skipSuccessfulRequests?: boolean
}

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

// In-memory store (for production, use Redis or similar)
const store: RateLimitStore = {}

export function rateLimit(options: RateLimitOptions) {
  const {
    windowMs,
    maxRequests,
    message = 'Too many requests, please try again later.',
    skipSuccessfulRequests = false,
  } = options

  return async (request: NextRequest): Promise<NextResponse | null> => {
    const identifier = getIdentifier(request)
    const now = Date.now()
    const windowStart = now - windowMs

    // Clean up old entries
    Object.keys(store).forEach((key) => {
      if (store[key].resetTime < now) {
        delete store[key]
      }
    })

    // Get or create rate limit entry
    if (!store[identifier] || store[identifier].resetTime < now) {
      store[identifier] = {
        count: 0,
        resetTime: now + windowMs,
      }
    }

    const entry = store[identifier]

    // Check if limit exceeded
    if (entry.count >= maxRequests) {
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000)
      return NextResponse.json(
        {
          error: message,
          retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(entry.resetTime).toISOString(),
          },
        }
      )
    }

    // Increment counter
    entry.count++

    return null // Continue with request
  }
}

function getIdentifier(request: NextRequest): string {
  // Use IP address as identifier
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIp || 'unknown'

  // Include user agent for additional fingerprinting
  const userAgent = request.headers.get('user-agent') || 'unknown'

  return `${ip}:${userAgent.slice(0, 50)}`
}

// Pre-configured rate limiters
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 login attempts per 15 minutes
  message: 'Too many login attempts. Please try again later.',
})

export const apiRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60, // 60 requests per minute
  message: 'API rate limit exceeded. Please slow down.',
})

export const qrGenerationRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 30, // 30 QR codes per minute
  message: 'QR generation rate limit exceeded.',
})

export const dynamicQRRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100, // 100 scans per minute per IP
  message: 'Scan rate limit exceeded.',
})

