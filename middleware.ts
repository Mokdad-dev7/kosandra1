import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { securityHeaders } from '@/lib/security/headers'
import { apiRateLimit, authRateLimit, qrGenerationRateLimit, dynamicQRRateLimit } from '@/lib/security/rate-limit'

// Public API routes that don't require authentication
const publicApiRoutes = [
  '/api/qr/generate',
  '/api/qr/generate-svg',
  '/api/qr/dynamic',
  '/api/auth',
]

function isPublicApiRoute(pathname: string): boolean {
  return publicApiRoutes.some(route => pathname.startsWith(route))
}

// In preview mode (no database), allow access to dashboard without auth
const middleware = !process.env.DATABASE_URL
  ? async function middleware(req: NextRequest) {
      const response = NextResponse.next()
      securityHeaders(response)
      
      // Rate limiting for public API routes
      if (req.nextUrl.pathname.startsWith('/api/qr/generate')) {
        const rateLimitResponse = await qrGenerationRateLimit(req)
        if (rateLimitResponse) {
          return securityHeaders(rateLimitResponse)
        }
      }
      
      return response
    }
  : async function middleware(req: NextRequest) {
      const response = NextResponse.next()
      
      // Apply security headers
      securityHeaders(response)
      
      // Public API routes - no auth required, but apply rate limiting
      if (isPublicApiRoute(req.nextUrl.pathname)) {
        if (req.nextUrl.pathname.startsWith('/api/qr/generate')) {
          const rateLimitResponse = await qrGenerationRateLimit(req)
          if (rateLimitResponse) {
            return securityHeaders(rateLimitResponse)
          }
        }
        
        if (req.nextUrl.pathname.startsWith('/api/qr/dynamic')) {
          const rateLimitResponse = await dynamicQRRateLimit(req)
          if (rateLimitResponse) {
            return securityHeaders(rateLimitResponse)
          }
        }
        
        if (req.nextUrl.pathname.startsWith('/api/auth')) {
          const rateLimitResponse = await authRateLimit(req)
          if (rateLimitResponse) {
            return securityHeaders(rateLimitResponse)
          }
        }
        
        return response
      }
      
      // Protected routes - require authentication
      return withAuth(
        async function protectedMiddleware(req: NextRequest) {
          const protectedResponse = NextResponse.next()
          securityHeaders(protectedResponse)
          
          // Rate limiting for protected API endpoints
          if (req.nextUrl.pathname.startsWith('/api/')) {
            const rateLimitResponse = await apiRateLimit(req)
            if (rateLimitResponse) {
              return securityHeaders(rateLimitResponse)
            }
          }
          
          return protectedResponse
        },
        {
          callbacks: {
            authorized: ({ token }) => !!token,
          },
        }
      )(req)
    }

export default middleware

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
  ],
}


