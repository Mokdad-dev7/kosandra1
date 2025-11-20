/**
 * Abuse Prevention System
 * - Geo/IP blocking
 * - Blacklisting on repeated failures
 * - Bot detection
 * - Credential stuffing mitigation
 */

interface Env {
  RATE_LIMIT_KV: KVNamespace
  ABUSE_LOG_KV: KVNamespace
  BLOCKED_IPS_KV: KVNamespace
  ALLOWED_COUNTRIES?: string // Comma-separated country codes
  BLOCKED_COUNTRIES?: string // Comma-separated country codes
}

interface AbuseEvent {
  type: 'auth_failure' | 'rate_limit' | 'suspicious_ua' | 'bot_detected'
  identifier: string
  identifierType: 'ip' | 'user'
  timestamp: number
  details?: Record<string, any>
}

interface BlockedIP {
  ip: string
  reason: string
  blockedUntil: number
  attempts: number
}

interface AuthFailureLog {
  ip: string
  failures: number
  firstFailure: number
  lastFailure: number
  lockoutUntil?: number
}

/**
 * Geo-blocking using Cloudflare request properties
 */
export function checkGeoBlocking(
  request: Request,
  env: Env
): { blocked: boolean; reason?: string } {
  // Get country from Cloudflare headers
  const country = request.cf?.country as string | undefined
  const asn = request.cf?.asn as number | undefined

  // Block specific countries
  if (env.BLOCKED_COUNTRIES && country) {
    const blocked = env.BLOCKED_COUNTRIES.split(',').map(c => c.trim().toUpperCase())
    if (blocked.includes(country.toUpperCase())) {
      return { blocked: true, reason: `Country ${country} is blocked` }
    }
  }

  // Allow only specific countries (if configured)
  if (env.ALLOWED_COUNTRIES && country) {
    const allowed = env.ALLOWED_COUNTRIES.split(',').map(c => c.trim().toUpperCase())
    if (!allowed.includes(country.toUpperCase())) {
      return { blocked: true, reason: `Country ${country} not in allowed list` }
    }
  }

  // Block known bad ASNs (example: add your list)
  const blockedASNs: number[] = [] // Add ASN numbers to block
  if (asn && blockedASNs.includes(asn)) {
    return { blocked: true, reason: `ASN ${asn} is blocked` }
  }

  return { blocked: false }
}

/**
 * Get client IP address
 */
export function getClientIP(request: Request): string {
  return (
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    request.headers.get('X-Real-IP') ||
    'unknown'
  )
}

/**
 * Check if IP is blocked
 */
export async function isIPBlocked(
  ip: string,
  env: Env
): Promise<{ blocked: boolean; blockInfo?: BlockedIP }> {
  if (ip === 'unknown') {
    return { blocked: false }
  }

  const blockKey = `blocked_ip:${ip}`
  const blockInfo = await env.BLOCKED_IPS_KV.get(blockKey, { type: 'json' })

  if (!blockInfo) {
    return { blocked: false }
  }

  const block = blockInfo as BlockedIP

  // Check if block has expired
  if (block.blockedUntil < Date.now()) {
    await env.BLOCKED_IPS_KV.delete(blockKey)
    return { blocked: false }
  }

  return { blocked: true, blockInfo: block }
}

/**
 * Block IP address
 */
export async function blockIP(
  ip: string,
  reason: string,
  durationMinutes: number,
  env: Env
): Promise<void> {
  const blockKey = `blocked_ip:${ip}`
  const existing = await env.BLOCKED_IPS_KV.get(blockKey, { type: 'json' })

  let attempts = 1
  if (existing) {
    const block = existing as BlockedIP
    attempts = block.attempts + 1
  }

  const block: BlockedIP = {
    ip,
    reason,
    blockedUntil: Date.now() + durationMinutes * 60 * 1000,
    attempts,
  }

  await env.BLOCKED_IPS_KV.put(blockKey, JSON.stringify(block), {
    expirationTtl: durationMinutes * 60 + 60, // Add buffer
  })

  // Log abuse event
  await logAbuseEvent(
    {
      type: 'auth_failure',
      identifier: ip,
      identifierType: 'ip',
      timestamp: Date.now(),
      details: { reason, durationMinutes, attempts },
    },
    env
  )
}

/**
 * Track authentication failures and implement progressive lockout
 */
export async function trackAuthFailure(
  ip: string,
  email: string | null,
  env: Env
): Promise<{ shouldBlock: boolean; lockoutMinutes?: number }> {
  const logKey = `auth_failure:${ip}`
  const existing = await env.ABUSE_LOG_KV.get(logKey, { type: 'json' })

  let log: AuthFailureLog
  if (existing) {
    log = existing as AuthFailureLog
    log.failures++
    log.lastFailure = Date.now()
  } else {
    log = {
      ip,
      failures: 1,
      firstFailure: Date.now(),
      lastFailure: Date.now(),
    }
  }

  // Progressive lockout policy
  let lockoutMinutes = 0
  let shouldBlock = false

  if (log.failures >= 10) {
    // 10+ failures: Block for 24 hours
    lockoutMinutes = 24 * 60
    shouldBlock = true
  } else if (log.failures >= 5) {
    // 5-9 failures: Block for 1 hour
    lockoutMinutes = 60
    shouldBlock = true
  } else if (log.failures >= 3) {
    // 3-4 failures: Block for 15 minutes
    lockoutMinutes = 15
    shouldBlock = true
  }

  if (shouldBlock) {
    log.lockoutUntil = Date.now() + lockoutMinutes * 60 * 1000
    await blockIP(ip, `Repeated auth failures (${log.failures})`, lockoutMinutes, env)
  }

  // Save log (keep for 7 days)
  await env.ABUSE_LOG_KV.put(logKey, JSON.stringify(log), {
    expirationTtl: 7 * 24 * 60 * 60,
  })

  return { shouldBlock, lockoutMinutes }
}

/**
 * Reset auth failure count on successful login
 */
export async function resetAuthFailures(ip: string, env: Env): Promise<void> {
  const logKey = `auth_failure:${ip}`
  await env.ABUSE_LOG_KV.delete(logKey)
}

/**
 * Bot detection heuristics
 */
export function detectBot(request: Request): {
  isBot: boolean
  confidence: number
  reasons: string[]
} {
  const reasons: string[] = []
  let confidence = 0

  const userAgent = request.headers.get('User-Agent') || ''
  const accept = request.headers.get('Accept') || ''
  const acceptLanguage = request.headers.get('Accept-Language') || ''
  const acceptEncoding = request.headers.get('Accept-Encoding') || ''

  // Missing User-Agent
  if (!userAgent) {
    reasons.push('missing_user_agent')
    confidence += 30
  }

  // Suspicious User-Agent patterns
  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python/i,
    /java/i,
    /go-http/i,
  ]

  const isKnownBot = botPatterns.some(pattern => pattern.test(userAgent))
  if (isKnownBot && !userAgent.includes('Googlebot') && !userAgent.includes('Bingbot')) {
    reasons.push('suspicious_user_agent')
    confidence += 40
  }

  // Missing or unusual Accept header
  if (!accept || !accept.includes('text/html') && !accept.includes('application/json')) {
    reasons.push('unusual_accept_header')
    confidence += 20
  }

  // Missing Accept-Language
  if (!acceptLanguage) {
    reasons.push('missing_accept_language')
    confidence += 10
  }

  // Missing Accept-Encoding
  if (!acceptEncoding) {
    reasons.push('missing_accept_encoding')
    confidence += 10
  }

  // Check Cloudflare bot score (if available)
  const botScore = request.cf?.botManagement?.score as number | undefined
  if (botScore !== undefined && botScore < 30) {
    reasons.push('low_bot_score')
    confidence += 50
  }

  // Check for automation frameworks
  const automationHeaders = [
    'X-Requested-With',
    'X-Selenium',
    'X-WebDriver',
  ]

  for (const header of automationHeaders) {
    if (request.headers.get(header)) {
      reasons.push(`automation_header_${header}`)
      confidence += 30
    }
  }

  const isBot = confidence >= 50

  return { isBot, confidence, reasons }
}

/**
 * Log abuse event for monitoring
 */
export async function logAbuseEvent(event: AbuseEvent, env: Env): Promise<void> {
  const logKey = `abuse_log:${Date.now()}:${Math.random().toString(36).substring(7)}`
  
  // Store with 30-day retention
  await env.ABUSE_LOG_KV.put(logKey, JSON.stringify(event), {
    expirationTtl: 30 * 24 * 60 * 60,
  })
}

/**
 * Get abuse statistics for an IP
 */
export async function getAbuseStats(
  ip: string,
  env: Env
): Promise<{
  authFailures: number
  rateLimitHits: number
  isBlocked: boolean
  blockInfo?: BlockedIP
}> {
  const [authLog, blockInfo] = await Promise.all([
    env.ABUSE_LOG_KV.get(`auth_failure:${ip}`, { type: 'json' }),
    env.BLOCKED_IPS_KV.get(`blocked_ip:${ip}`, { type: 'json' }),
  ])

  const auth = authLog as AuthFailureLog | null
  const block = blockInfo as BlockedIP | null

  return {
    authFailures: auth?.failures || 0,
    rateLimitHits: 0, // Would need separate tracking
    isBlocked: block !== null && (block?.blockedUntil || 0) > Date.now(),
    blockInfo: block || undefined,
  }
}

