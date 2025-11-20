/**
 * Enhanced Worker with Rate Limiting and Abuse Prevention
 * Integrates all security components
 */

import { createRateLimiters } from './rate-limiter'
import {
  checkGeoBlocking,
  getClientIP,
  isIPBlocked,
  trackAuthFailure,
  resetAuthFailures,
  detectBot,
  logAbuseEvent,
} from './abuse-prevention'
import {
  MetricsCollector,
  StructuredLogger,
  logRequest,
  handleMetricsExport,
} from './observability'

interface Env {
  RATE_LIMIT_KV: KVNamespace
  ABUSE_LOG_KV: KVNamespace
  BLOCKED_IPS_KV: KVNamespace
  METRICS_KV: KVNamespace
  JWKS_CACHE_KV: KVNamespace
  
  JWT_ISSUER: string
  JWT_AUDIENCE: string
  JWKS_URL: string
  ALLOWED_ORIGINS: string
  DEV_ORIGINS?: string
  RATE_LIMIT_WHITELIST?: string
  ALLOWED_COUNTRIES?: string
  BLOCKED_COUNTRIES?: string
  API_SECRET?: string
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const startTime = Date.now()
    const url = new URL(request.url)
    const origin = request.headers.get('Origin')
    const ip = getClientIP(request)
    const country = request.cf?.country as string | undefined

    // Initialize services
    const metrics = new MetricsCollector(env.METRICS_KV)
    const logger = new StructuredLogger('qrsnap-api')
    const { ipLimiter, userLimiter, authLimiter } = createRateLimiters(env)

    try {
      // Metrics endpoint (no rate limiting)
      if (url.pathname === '/metrics') {
        return handleMetricsExport(metrics)
      }

      // Health check (no rate limiting)
      if (url.pathname === '/health' || url.pathname === '/') {
        const response = new Response(
          JSON.stringify({
            status: 'ok',
            timestamp: new Date().toISOString(),
            service: 'qrsnap-api',
          }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        await logRequest(request, response, Date.now() - startTime, metrics, logger, {
          ip,
          country,
        })
        return response
      }

      // CORS preflight
      if (request.method === 'OPTIONS') {
        const headers = new Headers()
        if (origin && isOriginAllowed(origin, env)) {
          headers.set('Access-Control-Allow-Origin', origin)
          headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
          headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
          headers.set('Access-Control-Allow-Credentials', 'true')
          headers.set('Access-Control-Max-Age', '86400')
        }
        addSecurityHeaders(headers)
        return new Response(null, { status: 204, headers })
      }

      // Geo-blocking check
      const geoCheck = checkGeoBlocking(request, env)
      if (geoCheck.blocked) {
        metrics.incrementCounter('geo_blocked', { country: country || 'unknown' })
        logger.warn('geo_blocked', { ip, country, reason: geoCheck.reason })
        
        const response = new Response(
          JSON.stringify({ error: 'Access denied', code: 'GEO_BLOCKED' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        )
        await logRequest(request, response, Date.now() - startTime, metrics, logger, {
          ip,
          country,
        })
        return response
      }

      // IP blocking check
      const ipBlockCheck = await isIPBlocked(ip, env)
      if (ipBlockCheck.blocked) {
        metrics.incrementCounter('ip_blocked', { ip })
        logger.warn('ip_blocked', {
          ip,
          reason: ipBlockCheck.blockInfo?.reason,
          blockedUntil: ipBlockCheck.blockInfo?.blockedUntil,
        })

        const response = new Response(
          JSON.stringify({
            error: 'Access denied',
            code: 'IP_BLOCKED',
            retryAfter: Math.ceil(
              ((ipBlockCheck.blockInfo?.blockedUntil || 0) - Date.now()) / 1000
            ),
          }),
          {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': Math.ceil(
                ((ipBlockCheck.blockInfo?.blockedUntil || 0) - Date.now()) / 1000
              ).toString(),
            },
          }
        )
        await logRequest(request, response, Date.now() - startTime, metrics, logger, {
          ip,
          country,
        })
        return response
      }

      // Bot detection
      const botDetection = detectBot(request)
      if (botDetection.isBot && url.pathname.startsWith('/api/')) {
        metrics.incrementCounter('bot_detected', {
          confidence: botDetection.confidence.toString(),
          reasons: botDetection.reasons.join(','),
        })
        logger.warn('bot_detected', {
          ip,
          userAgent: request.headers.get('User-Agent'),
          confidence: botDetection.confidence,
          reasons: botDetection.reasons,
        })

        // Log but don't block (can be adjusted)
        await logAbuseEvent(
          {
            type: 'bot_detected',
            identifier: ip,
            identifierType: 'ip',
            timestamp: Date.now(),
            details: {
              confidence: botDetection.confidence,
              reasons: botDetection.reasons,
            },
          },
          env
        )
      }

      // Rate limiting (per IP)
      const ipLimitResult = await ipLimiter.checkLimit(ip, 'ip')
      if (!ipLimitResult.allowed) {
        const headers = new Headers()
        if (origin && isOriginAllowed(origin, env)) {
          headers.set('Access-Control-Allow-Origin', origin)
        }
        headers.set('Content-Type', 'application/json')
        headers.set('Retry-After', (ipLimitResult.retryAfter || 60).toString())
        headers.set('X-RateLimit-Limit', ipLimitResult.limit.toString())
        headers.set('X-RateLimit-Remaining', '0')
        headers.set('X-RateLimit-Reset', new Date(ipLimitResult.resetTime).toISOString())
        addSecurityHeaders(headers)

        const response = new Response(
          JSON.stringify({
            error: 'Rate limit exceeded',
            code: 'RATE_LIMIT',
            retryAfter: ipLimitResult.retryAfter,
          }),
          { status: 429, headers }
        )
        await logRequest(request, response, Date.now() - startTime, metrics, logger, {
          ip,
          country,
        })
        return response
      }

      // Authentication (for protected routes)
      let authContext: { userId?: string; email?: string } | null = null
      const protectedRoutes = ['/api/qr/create', '/api/qr/list', '/api/qr/update']
      const isProtected = protectedRoutes.some(route => url.pathname.startsWith(route))
      const isAuthRoute = url.pathname.startsWith('/api/auth/login') || 
                          url.pathname.startsWith('/api/auth/register')

      if (isProtected || isAuthRoute) {
        // Stricter rate limiting for auth endpoints
        if (isAuthRoute) {
          const authLimitResult = await authLimiter.checkLimit(ip, 'ip')
          if (!authLimitResult.allowed) {
            const response = new Response(
              JSON.stringify({
                error: 'Too many authentication attempts',
                code: 'AUTH_RATE_LIMIT',
                retryAfter: authLimitResult.retryAfter,
              }),
              {
                status: 429,
                headers: {
                  'Content-Type': 'application/json',
                  'Retry-After': (authLimitResult.retryAfter || 60).toString(),
                },
              }
            )
            await logRequest(request, response, Date.now() - startTime, metrics, logger, {
              ip,
              country,
            })
            return response
          }
        }

        // JWT authentication (for protected routes)
        if (isProtected) {
          authContext = await authenticateRequest(request, env)
          if (!authContext) {
            // Track auth failure
            await trackAuthFailure(ip, null, env)

            const response = new Response(
              JSON.stringify({ error: 'Unauthorized', code: 'AUTH_REQUIRED' }),
              { status: 401, headers: { 'Content-Type': 'application/json' } }
            )
            await logRequest(request, response, Date.now() - startTime, metrics, logger, {
              ip,
              country,
            })
            return response
          }

          // User-based rate limiting (higher limits)
          const userLimitResult = await userLimiter.checkLimit(
            authContext.userId || ip,
            'user'
          )
          if (!userLimitResult.allowed) {
            const response = new Response(
              JSON.stringify({
                error: 'Rate limit exceeded',
                code: 'RATE_LIMIT',
                retryAfter: userLimitResult.retryAfter,
              }),
              {
                status: 429,
                headers: {
                  'Content-Type': 'application/json',
                  'Retry-After': (userLimitResult.retryAfter || 60).toString(),
                },
              }
            )
            await logRequest(request, response, Date.now() - startTime, metrics, logger, {
              ip,
              country,
              userId: authContext.userId,
            })
            return response
          }
        }
      }

      // Route handling (simplified - add your actual handlers)
      let response: Response
      if (url.pathname.startsWith('/api/qr/generate')) {
        response = await handleQRGenerate(request, env, authContext || {})
      } else {
        response = new Response(
          JSON.stringify({ error: 'Not found', code: 'NOT_FOUND' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        )
      }

      // Add CORS headers
      const finalHeaders = new Headers(response.headers)
      if (origin && isOriginAllowed(origin, env)) {
        finalHeaders.set('Access-Control-Allow-Origin', origin)
        finalHeaders.set('Access-Control-Allow-Credentials', 'true')
      }
      addSecurityHeaders(finalHeaders)

      // Add rate limit headers
      const limitStatus = authContext
        ? await userLimiter.getStatus(authContext.userId || ip, 'user')
        : await ipLimiter.getStatus(ip, 'ip')
      
      finalHeaders.set('X-RateLimit-Limit', limitStatus.limit.toString())
      finalHeaders.set('X-RateLimit-Remaining', limitStatus.remaining.toString())
      finalHeaders.set('X-RateLimit-Reset', new Date(limitStatus.resetTime).toISOString())

      const finalResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: finalHeaders,
      })

      // Log request
      await logRequest(request, finalResponse, Date.now() - startTime, metrics, logger, {
        ip,
        country,
        userId: authContext?.userId,
      })

      // Flush metrics (async, don't wait)
      ctx.waitUntil(metrics.flush(env))

      return finalResponse
    } catch (error) {
      logger.error('unhandled_error', error, { ip, path: url.pathname })
      metrics.incrementCounter('unhandled_errors', { path: url.pathname })

      const response = new Response(
        JSON.stringify({ error: 'Internal server error', code: 'INTERNAL_ERROR' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
      await logRequest(request, response, Date.now() - startTime, metrics, logger, {
        ip,
        country,
      })
      return response
    }
  },
}

// Helper functions (from previous implementation)
function isOriginAllowed(origin: string | null, env: Env): boolean {
  if (!origin) return false
  const allowed = env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  if (env.DEV_ORIGINS) {
    allowed.push(...env.DEV_ORIGINS.split(',').map(o => o.trim()))
  }
  return allowed.includes(origin)
}

function addSecurityHeaders(headers: Headers): void {
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('X-Frame-Options', 'DENY')
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
}

async function authenticateRequest(request: Request, env: Env): Promise<{ userId?: string; email?: string } | null> {
  // Implement JWT verification (from previous code)
  const authHeader = request.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }
  // ... JWT verification logic ...
  return null
}

async function handleQRGenerate(request: Request, env: Env, context: any): Promise<Response> {
  // Your QR generation logic
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
}

