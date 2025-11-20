/**
 * Hardened Cloudflare Worker for QR Snap API
 * Security: CORS, JWT Auth, Rate Limiting, Input Validation, Error Handling
 */

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Env {
  // KV Namespaces
  RATE_LIMIT_KV: KVNamespace
  JWKS_CACHE_KV: KVNamespace
  
  // Environment Variables
  JWT_ISSUER: string // e.g., "https://qrsnap.app"
  JWT_AUDIENCE: string // e.g., "api.qrsnap.app"
  JWKS_URL: string // e.g., "https://qrsnap.app/.well-known/jwks.json"
  ALLOWED_ORIGINS: string // Comma-separated: "https://qrsnap.app,https://app.qrsnap.app"
  DEV_ORIGINS: string // Comma-separated: "http://localhost:3000,http://127.0.0.1:3000"
  
  // Optional: Database/External Services
  DATABASE_URL?: string
  API_SECRET?: string
}

interface JWK {
  kty: string
  use?: string
  kid: string
  alg: string
  n: string
  e: string
}

interface JWKS {
  keys: JWK[]
}

interface RateLimitEntry {
  count: number
  resetTime: number
}

interface RequestContext {
  userId?: string
  email?: string
  [key: string]: any
}

// ============================================================================
// CONSTANTS
// ============================================================================

const MAX_REQUEST_SIZE = 1024 * 1024 // 1MB
const REQUEST_TIMEOUT_MS = 30000 // 30 seconds
const JWKS_CACHE_TTL = 3600 // 1 hour
const RATE_LIMIT_WINDOW = 60 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100

const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
const ALLOWED_HEADERS = ['Content-Type', 'Authorization', 'X-Requested-With']

// ============================================================================
// CORS HANDLING
// ============================================================================

function getAllowedOrigins(env: Env): string[] {
  const origins: string[] = []
  
  if (env.ALLOWED_ORIGINS) {
    origins.push(...env.ALLOWED_ORIGINS.split(',').map(o => o.trim()))
  }
  
  // Add dev origins in non-production
  if (env.DEV_ORIGINS) {
    const isDev = new URL(env.JWT_ISSUER || 'https://qrsnap.app').hostname.includes('localhost') || 
                  env.JWT_ISSUER?.includes('localhost')
    if (isDev) {
      origins.push(...env.DEV_ORIGINS.split(',').map(o => o.trim()))
    }
  }
  
  return origins
}

function isOriginAllowed(origin: string | null, env: Env): boolean {
  if (!origin) return false
  
  const allowed = getAllowedOrigins(env)
  return allowed.includes(origin)
}

function handleCORS(request: Request, env: Env): Response | null {
  const origin = request.headers.get('Origin')
  
  if (request.method === 'OPTIONS') {
    const headers = new Headers()
    
    if (origin && isOriginAllowed(origin, env)) {
      headers.set('Access-Control-Allow-Origin', origin)
      headers.set('Access-Control-Allow-Methods', ALLOWED_METHODS.join(', '))
      headers.set('Access-Control-Allow-Headers', ALLOWED_HEADERS.join(', '))
      headers.set('Access-Control-Allow-Credentials', 'true')
      headers.set('Access-Control-Max-Age', '86400')
    }
    
    addSecurityHeaders(headers)
    return new Response(null, { status: 204, headers })
  }
  
  return null
}

// ============================================================================
// SECURITY HEADERS
// ============================================================================

function addSecurityHeaders(headers: Headers, isPublic: boolean = false): void {
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('X-Frame-Options', 'DENY')
  headers.set('X-XSS-Protection', '1; mode=block')
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  headers.set('X-Permitted-Cross-Domain-Policies', 'none')
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // CSP
  const csp = [
    "default-src 'self'",
    "script-src 'none'",
    "style-src 'none'",
    "img-src 'none'",
    "font-src 'none'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'none'",
    "object-src 'none'",
  ].join('; ')
  headers.set('Content-Security-Policy', csp)
  
  // Cache headers
  if (isPublic) {
    headers.set('Cache-Control', 'public, max-age=300, s-maxage=600')
  } else {
    headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    headers.set('Pragma', 'no-cache')
    headers.set('Expires', '0')
  }
}

// ============================================================================
// JWT VALIDATION (RS256 with JWKS)
// ============================================================================

async function getJWKS(env: Env): Promise<JWKS> {
  // Check cache first
  const cacheKey = 'jwks_cache'
  const cached = await env.JWKS_CACHE_KV.get(cacheKey, { type: 'json' })
  
  if (cached) {
    return cached as JWKS
  }
  
  // Fetch from JWKS URL
  const response = await fetch(env.JWKS_URL, {
    headers: { 'User-Agent': 'QR-Snap-Worker/1.0' },
  })
  
  if (!response.ok) {
    throw new Error(`Failed to fetch JWKS: ${response.status}`)
  }
  
  const jwks = await response.json<JWKS>()
  
  // Cache for 1 hour
  await env.JWKS_CACHE_KV.put(cacheKey, JSON.stringify(jwks), {
    expirationTtl: JWKS_CACHE_TTL,
  })
  
  return jwks
}

async function getPublicKey(jwks: JWKS, kid: string): Promise<CryptoKey | null> {
  const key = jwks.keys.find(k => k.kid === kid && k.alg === 'RS256')
  
  if (!key || key.kty !== 'RSA') {
    return null
  }
  
  // Convert JWK to CryptoKey
  const jwk = {
    kty: key.kty,
    n: key.n,
    e: key.e,
    alg: key.alg,
    use: key.use || 'sig',
  }
  
  return await crypto.subtle.importKey(
    'jwk',
    jwk,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['verify']
  )
}

// Base64URL decode helper
function base64UrlDecode(str: string): string {
  // Add padding if needed
  str = str.replace(/-/g, '+').replace(/_/g, '/')
  while (str.length % 4) {
    str += '='
  }
  try {
    return atob(str)
  } catch {
    throw new Error('Invalid base64url encoding')
  }
}

async function verifyJWT(token: string, env: Env): Promise<RequestContext | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }
    
    // Decode header to get kid
    const headerJson = base64UrlDecode(parts[0])
    const header = JSON.parse(headerJson) as { kid: string; alg: string }
    
    if (header.alg !== 'RS256') {
      return null
    }
    
    // Get JWKS and find key
    const jwks = await getJWKS(env)
    const publicKey = await getPublicKey(jwks, header.kid)
    
    if (!publicKey) {
      return null
    }
    
    // Verify signature
    const data = new TextEncoder().encode(`${parts[0]}.${parts[1]}`)
    const signatureStr = base64UrlDecode(parts[2])
    const signature = Uint8Array.from(signatureStr, c => c.charCodeAt(0))
    
    const isValid = await crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5',
      publicKey,
      signature,
      data
    )
    
    if (!isValid) {
      return null
    }
    
    // Decode and validate payload
    const payloadJson = base64UrlDecode(parts[1])
    const payload = JSON.parse(payloadJson) as {
      iss?: string
      aud?: string | string[]
      exp?: number
      iat?: number
      sub?: string
      email?: string
      [key: string]: any
    }
    
    // Validate issuer
    if (payload.iss !== env.JWT_ISSUER) {
      return null
    }
    
    // Validate audience
    const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud]
    if (!aud.includes(env.JWT_AUDIENCE)) {
      return null
    }
    
    // Validate expiration
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return null
    }
    
    // Return context
    return {
      userId: payload.sub,
      email: payload.email,
      ...payload,
    }
  } catch (error) {
    console.error('JWT verification error:', error)
    return null
  }
}

async function authenticateRequest(request: Request, env: Env): Promise<RequestContext | null> {
  const authHeader = request.headers.get('Authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  const token = authHeader.substring(7)
  return await verifyJWT(token, env)
}

// ============================================================================
// RATE LIMITING (KV-based)
// ============================================================================

function getRateLimitKey(request: Request, ctx?: RequestContext): string {
  if (ctx?.userId) {
    return `rate_limit:user:${ctx.userId}`
  }
  
  const ip = request.headers.get('CF-Connecting-IP') || 
             request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() || 
             'unknown'
  
  return `rate_limit:ip:${ip}`
}

async function checkRateLimit(
  request: Request,
  env: Env,
  ctx?: RequestContext
): Promise<Response | null> {
  const key = getRateLimitKey(request, ctx)
  const now = Math.floor(Date.now() / 1000)
  const windowStart = now - RATE_LIMIT_WINDOW
  
  // Get current entry
  const entryStr = await env.RATE_LIMIT_KV.get(key)
  let entry: RateLimitEntry | null = null
  
  if (entryStr) {
    entry = JSON.parse(entryStr) as RateLimitEntry
    
    // Reset if window expired
    if (entry.resetTime < now) {
      entry = null
    }
  }
  
  if (!entry) {
    entry = {
      count: 0,
      resetTime: now + RATE_LIMIT_WINDOW,
    }
  }
  
  // Check limit
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = entry.resetTime - now
    const headers = new Headers()
    headers.set('Retry-After', retryAfter.toString())
    headers.set('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS.toString())
    headers.set('X-RateLimit-Remaining', '0')
    headers.set('X-RateLimit-Reset', entry.resetTime.toString())
    addSecurityHeaders(headers)
    
    return new Response(
      JSON.stringify({ error: 'Rate limit exceeded', retryAfter }),
      {
        status: 429,
        headers,
      }
    )
  }
  
  // Increment and save
  entry.count++
  await env.RATE_LIMIT_KV.put(key, JSON.stringify(entry), {
    expirationTtl: RATE_LIMIT_WINDOW + 10, // Add buffer
  })
  
  return null
}

// ============================================================================
// INPUT VALIDATION
// ============================================================================

function validateJSONSchema(data: any, schema: {
  type: string
  properties?: Record<string, any>
  required?: string[]
  maxLength?: number
  minLength?: number
  pattern?: string
  enum?: any[]
}): { valid: boolean; error?: string } {
  if (schema.type === 'object') {
    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
      return { valid: false, error: 'Expected object' }
    }
    
    // Check required fields
    if (schema.required) {
      for (const field of schema.required) {
        if (!(field in data)) {
          return { valid: false, error: `Missing required field: ${field}` }
        }
      }
    }
    
    // Validate properties
    if (schema.properties) {
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        if (key in data) {
          const result = validateJSONSchema(data[key], propSchema)
          if (!result.valid) {
            return { valid: false, error: `${key}: ${result.error}` }
          }
        }
      }
    }
  } else if (schema.type === 'string') {
    if (typeof data !== 'string') {
      return { valid: false, error: 'Expected string' }
    }
    
    if (schema.maxLength && data.length > schema.maxLength) {
      return { valid: false, error: `String too long (max ${schema.maxLength})` }
    }
    
    if (schema.minLength && data.length < schema.minLength) {
      return { valid: false, error: `String too short (min ${schema.minLength})` }
    }
    
    if (schema.pattern) {
      const regex = new RegExp(schema.pattern)
      if (!regex.test(data)) {
        return { valid: false, error: 'String does not match required pattern' }
      }
    }
    
    if (schema.enum && !schema.enum.includes(data)) {
      return { valid: false, error: `Value must be one of: ${schema.enum.join(', ')}` }
    }
  } else if (schema.type === 'number') {
    if (typeof data !== 'number' || isNaN(data)) {
      return { valid: false, error: 'Expected number' }
    }
  } else if (schema.type === 'boolean') {
    if (typeof data !== 'boolean') {
      return { valid: false, error: 'Expected boolean' }
    }
  } else if (schema.type === 'array') {
    if (!Array.isArray(data)) {
      return { valid: false, error: 'Expected array' }
    }
  }
  
  return { valid: true }
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

class AppError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message)
    this.name = 'AppError'
  }
}

function createErrorResponse(error: unknown, origin: string | null, env: Env): Response {
  const headers = new Headers()
  
  if (origin && isOriginAllowed(origin, env)) {
    headers.set('Access-Control-Allow-Origin', origin)
    headers.set('Access-Control-Allow-Credentials', 'true')
  }
  
  addSecurityHeaders(headers)
  headers.set('Content-Type', 'application/json')
  
  let status = 500
  let body: any = { error: 'Internal server error' }
  
  if (error instanceof AppError) {
    status = error.status
    body = {
      error: error.message,
      code: error.code,
    }
    if (error.details && env.API_SECRET) {
      // Only include details in dev or with API_SECRET
      body.details = error.details
    }
  } else if (error instanceof Error) {
    // Log full error server-side, but don't expose to client
    console.error('Unhandled error:', error)
    body = { error: 'An error occurred' }
  }
  
  return new Response(JSON.stringify(body), {
    status,
    headers,
  })
}

// ============================================================================
// REQUEST HANDLING
// ============================================================================

async function safeReadBody(request: Request): Promise<{ data: any; error: null } | { data: null; error: Response }> {
  const contentType = request.headers.get('Content-Type')
  
  if (!contentType?.includes('application/json')) {
    return {
      data: null,
      error: new Response(
        JSON.stringify({ error: 'Content-Type must be application/json' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ),
    }
  }
  
  // Check content length
  const contentLength = request.headers.get('Content-Length')
  if (contentLength) {
    const size = parseInt(contentLength, 10)
    if (size > MAX_REQUEST_SIZE) {
      return {
        data: null,
        error: new Response(
          JSON.stringify({ error: 'Request body too large', maxSize: MAX_REQUEST_SIZE }),
          { status: 413, headers: { 'Content-Type': 'application/json' } }
        ),
      }
    }
  }
  
  try {
    // Use AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
    
    const text = await request.text()
    clearTimeout(timeoutId)
    
    if (text.length > MAX_REQUEST_SIZE) {
      return {
        data: null,
        error: new Response(
          JSON.stringify({ error: 'Request body too large' }),
          { status: 413, headers: { 'Content-Type': 'application/json' } }
        ),
      }
    }
    
    const data = JSON.parse(text)
    return { data, error: null }
  } catch (error) {
    if (error instanceof SyntaxError) {
      return {
        data: null,
        error: new Response(
          JSON.stringify({ error: 'Invalid JSON' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        ),
      }
    }
    
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        data: null,
        error: new Response(
          JSON.stringify({ error: 'Request timeout' }),
          { status: 408, headers: { 'Content-Type': 'application/json' } }
        ),
      }
    }
    
    throw error
  }
}

// ============================================================================
// ROUTE HANDLERS
// ============================================================================

async function handleHealthCheck(request: Request, env: Env): Promise<Response> {
  const headers = new Headers()
  const origin = request.headers.get('Origin')
  
  if (origin && isOriginAllowed(origin, env)) {
    headers.set('Access-Control-Allow-Origin', origin)
  }
  
  addSecurityHeaders(headers, true)
  headers.set('Content-Type', 'application/json')
  
  return new Response(
    JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'qrsnap-api',
    }),
    { headers }
  )
}

async function handleQRGenerate(request: Request, env: Env, ctx: RequestContext): Promise<Response> {
  const bodyResult = await safeReadBody(request)
  if (bodyResult.error) {
    return bodyResult.error
  }
  
  const schema = {
    type: 'object',
    required: ['type', 'data'],
    properties: {
      type: {
        type: 'string',
        enum: ['url', 'text', 'email', 'phone', 'sms', 'wifi', 'vcard', 'event', 'location', 'social', 'barcode', 'custom'],
      },
      data: { type: 'object' },
      customizations: {
        type: 'object',
        properties: {
          foregroundColor: { type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' },
          backgroundColor: { type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' },
          width: { type: 'number' },
          margin: { type: 'number' },
        },
      },
    },
  }
  
  const validation = validateJSONSchema(bodyResult.data, schema)
  if (!validation.valid) {
    throw new AppError(400, 'VALIDATION_ERROR', validation.error || 'Invalid request data')
  }
  
  // TODO: Implement actual QR code generation
  // This is a placeholder - integrate with your QR generation logic
  
  const headers = new Headers()
  const origin = request.headers.get('Origin')
  if (origin && isOriginAllowed(origin, env)) {
    headers.set('Access-Control-Allow-Origin', origin)
  }
  
  addSecurityHeaders(headers)
  headers.set('Content-Type', 'application/json')
  
  return new Response(
    JSON.stringify({
      success: true,
      message: 'QR code generation endpoint',
      // Add your QR code generation result here
    }),
    { headers }
  )
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)
    const origin = request.headers.get('Origin')
    
    try {
      // Handle CORS preflight
      const corsResponse = handleCORS(request, env)
      if (corsResponse) {
        return corsResponse
      }
      
      // Add CORS headers to all responses
      const addCORS = (response: Response): Response => {
        const newHeaders = new Headers(response.headers)
        if (origin && isOriginAllowed(origin, env)) {
          newHeaders.set('Access-Control-Allow-Origin', origin)
          newHeaders.set('Access-Control-Allow-Credentials', 'true')
        }
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders,
        })
      }
      
      // Route handling
      if (url.pathname === '/health' || url.pathname === '/') {
        return handleHealthCheck(request, env)
      }
      
      // Rate limiting (before auth for public endpoints)
      const rateLimitResponse = await checkRateLimit(request, env)
      if (rateLimitResponse) {
        return addCORS(rateLimitResponse)
      }
      
      // Authentication (for protected routes)
      let authContext: RequestContext | null = null
      const protectedRoutes = ['/api/qr/create', '/api/qr/list', '/api/qr/update', '/api/qr/delete']
      const isProtected = protectedRoutes.some(route => url.pathname.startsWith(route))
      
      if (isProtected) {
        authContext = await authenticateRequest(request, env)
        if (!authContext) {
          const headers = new Headers()
          if (origin && isOriginAllowed(origin, env)) {
            headers.set('Access-Control-Allow-Origin', origin)
          }
          addSecurityHeaders(headers)
          return new Response(
            JSON.stringify({ error: 'Unauthorized', code: 'AUTH_REQUIRED' }),
            { status: 401, headers }
          )
        }
        
        // Re-check rate limit with user context (higher limits for authenticated users)
        const userRateLimit = await checkRateLimit(request, env, authContext)
        if (userRateLimit) {
          return addCORS(userRateLimit)
        }
      }
      
      // Route to handlers
      if (url.pathname === '/api/qr/generate' && request.method === 'POST') {
        const response = await handleQRGenerate(request, env, authContext || {})
        return addCORS(response)
      }
      
      // 404 for unknown routes
      const headers = new Headers()
      if (origin && isOriginAllowed(origin, env)) {
        headers.set('Access-Control-Allow-Origin', origin)
      }
      addSecurityHeaders(headers)
      headers.set('Content-Type', 'application/json')
      
      return new Response(
        JSON.stringify({ error: 'Not found', code: 'NOT_FOUND' }),
        { status: 404, headers }
      )
    } catch (error) {
      return addCORS(createErrorResponse(error, origin, env))
    }
  },
}

