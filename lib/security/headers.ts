import { NextResponse } from 'next/server'

export function securityHeaders(response: NextResponse): NextResponse {
  // Content Security Policy
  // Note: 'unsafe-eval' is required for Next.js in development, but can be removed in production
  // 'unsafe-inline' for styles is required for Tailwind CSS
  const isProduction = process.env.NODE_ENV === 'production'
  const csp = [
    "default-src 'self'",
    isProduction 
      ? "script-src 'self' 'unsafe-inline'" // Remove unsafe-eval in production if possible
      : "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Required for Next.js dev mode
    "style-src 'self' 'unsafe-inline'", // Required for Tailwind CSS
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://nominatim.openstreetmap.org", // Allow OpenStreetMap for map picker
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-src 'none'",
    "object-src 'none'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "upgrade-insecure-requests",
  ].join('; ')

  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none')
  // Note: COEP/COOP/CORP are very strict and may break some functionality
  // Only enable if you're certain your app doesn't need cross-origin resources
  // response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp')
  // response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
  // response.headers.set('Cross-Origin-Resource-Policy', 'same-origin')
  response.headers.set('Content-Security-Policy', csp)

  return response
}

