import { NextRequest, NextResponse } from 'next/server'
import { securityHeaders } from './headers'

/**
 * CORS configuration for API routes
 */
export interface CorsOptions {
  origin?: string | string[] | ((origin: string | null) => boolean)
  methods?: string[]
  allowedHeaders?: string[]
  exposedHeaders?: string[]
  credentials?: boolean
  maxAge?: number
}

const defaultOptions: Required<CorsOptions> = {
  origin: (origin) => {
    // In production, only allow same-origin or configured origins
    if (process.env.NODE_ENV === 'production') {
      const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || []
      if (!origin) return false
      return allowedOrigins.includes(origin) || origin.startsWith('https://')
    }
    // In development, allow localhost
    if (!origin) return true
    return origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: [],
  credentials: true,
  maxAge: 86400, // 24 hours
}

/**
 * Apply CORS headers to response
 */
export function applyCorsHeaders(
  response: NextResponse,
  request: NextRequest,
  options: CorsOptions = {}
): NextResponse {
  const opts = { ...defaultOptions, ...options }
  const origin = request.headers.get('origin')

  // Check if origin is allowed
  let allowOrigin: string | null = null
  if (typeof opts.origin === 'function') {
    if (opts.origin(origin)) {
      allowOrigin = origin
    }
  } else if (Array.isArray(opts.origin)) {
    if (origin && opts.origin.includes(origin)) {
      allowOrigin = origin
    }
  } else if (typeof opts.origin === 'string') {
    if (origin === opts.origin) {
      allowOrigin = origin
    }
  }

  if (allowOrigin) {
    response.headers.set('Access-Control-Allow-Origin', allowOrigin)
    response.headers.set('Access-Control-Allow-Methods', opts.methods.join(', '))
    response.headers.set('Access-Control-Allow-Headers', opts.allowedHeaders.join(', '))
    response.headers.set('Access-Control-Max-Age', opts.maxAge.toString())
    
    if (opts.credentials) {
      response.headers.set('Access-Control-Allow-Credentials', 'true')
    }

    if (opts.exposedHeaders.length > 0) {
      response.headers.set('Access-Control-Expose-Headers', opts.exposedHeaders.join(', '))
    }
  }

  return response
}

/**
 * Handle CORS preflight requests
 */
export function handleCorsPreflight(
  request: NextRequest,
  options: CorsOptions = {}
): NextResponse | null {
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 })
    const corsResponse = applyCorsHeaders(response, request, options)
    return securityHeaders(corsResponse)
  }
  return null
}

