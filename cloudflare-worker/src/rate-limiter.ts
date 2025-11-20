/**
 * Advanced Rate Limiter with Token Bucket Algorithm
 * Supports per-IP, per-user, burst capacity, and whitelisting
 */

interface RateLimitConfig {
  windowSeconds: number
  maxRequests: number
  burstCapacity: number // Additional requests allowed in burst
  whitelist?: string[] // IPs or user IDs to whitelist
}

interface TokenBucket {
  tokens: number
  lastRefill: number
  capacity: number
  refillRate: number // tokens per second
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: number
  retryAfter?: number
  limit: number
}

export class AdvancedRateLimiter {
  private kv: KVNamespace
  private config: RateLimitConfig

  constructor(kv: KVNamespace, config: RateLimitConfig) {
    this.kv = kv
    this.config = config
  }

  private getKey(identifier: string, type: 'ip' | 'user'): string {
    return `rate_limit:${type}:${identifier}`
  }

  private getBucketKey(identifier: string, type: 'ip' | 'user'): string {
    return `token_bucket:${type}:${identifier}`
  }

  private isWhitelisted(identifier: string): boolean {
    return this.config.whitelist?.includes(identifier) ?? false
  }

  /**
   * Token Bucket Algorithm Implementation
   */
  private async getTokenBucket(
    identifier: string,
    type: 'ip' | 'user'
  ): Promise<TokenBucket> {
    const key = this.getBucketKey(identifier, type)
    const stored = await this.kv.get(key, { type: 'json' })

    if (stored) {
      return stored as TokenBucket
    }

    // Initialize bucket
    const capacity = this.config.maxRequests + this.config.burstCapacity
    return {
      tokens: capacity,
      lastRefill: Date.now(),
      capacity,
      refillRate: this.config.maxRequests / this.config.windowSeconds,
    }
  }

  private async updateTokenBucket(
    identifier: string,
    type: 'ip' | 'user',
    bucket: TokenBucket
  ): Promise<void> {
    const now = Date.now()
    const elapsed = (now - bucket.lastRefill) / 1000 // seconds

    // Refill tokens
    const tokensToAdd = elapsed * bucket.refillRate
    bucket.tokens = Math.min(bucket.capacity, bucket.tokens + tokensToAdd)
    bucket.lastRefill = now

    // Consume one token
    bucket.tokens = Math.max(0, bucket.tokens - 1)

    const key = this.getBucketKey(identifier, type)
    await this.kv.put(key, JSON.stringify(bucket), {
      expirationTtl: this.config.windowSeconds * 2, // Keep for 2x window
    })
  }

  /**
   * Check rate limit with token bucket
   */
  async checkLimit(
    identifier: string,
    type: 'ip' | 'user'
  ): Promise<RateLimitResult> {
    // Whitelist bypass
    if (this.isWhitelisted(identifier)) {
      return {
        allowed: true,
        remaining: Infinity,
        resetTime: Date.now() + this.config.windowSeconds * 1000,
        limit: Infinity,
      }
    }

    const bucket = await this.getTokenBucket(identifier, type)
    const now = Date.now()
    const resetTime = bucket.lastRefill + this.config.windowSeconds * 1000

    // Check if request is allowed
    const allowed = bucket.tokens > 0

    if (allowed) {
      await this.updateTokenBucket(identifier, type, bucket)
    }

    const remaining = Math.floor(bucket.tokens)
    const retryAfter = allowed
      ? undefined
      : Math.ceil((resetTime - now) / 1000)

    return {
      allowed,
      remaining: Math.max(0, remaining),
      resetTime,
      retryAfter,
      limit: this.config.maxRequests,
    }
  }

  /**
   * Get current rate limit status without consuming a token
   */
  async getStatus(
    identifier: string,
    type: 'ip' | 'user'
  ): Promise<RateLimitResult> {
    if (this.isWhitelisted(identifier)) {
      return {
        allowed: true,
        remaining: Infinity,
        resetTime: Date.now() + this.config.windowSeconds * 1000,
        limit: Infinity,
      }
    }

    const bucket = await this.getTokenBucket(identifier, type)
    const now = Date.now()
    const resetTime = bucket.lastRefill + this.config.windowSeconds * 1000

    return {
      allowed: bucket.tokens > 0,
      remaining: Math.max(0, Math.floor(bucket.tokens)),
      resetTime,
      retryAfter: bucket.tokens <= 0 ? Math.ceil((resetTime - now) / 1000) : undefined,
      limit: this.config.maxRequests,
    }
  }
}

/**
 * Pre-configured rate limiters
 */
export function createRateLimiters(env: {
  RATE_LIMIT_KV: KVNamespace
  RATE_LIMIT_WHITELIST?: string
}): {
  ipLimiter: AdvancedRateLimiter
  userLimiter: AdvancedRateLimiter
  authLimiter: AdvancedRateLimiter
} {
  const whitelist = env.RATE_LIMIT_WHITELIST?.split(',').map(s => s.trim()) || []

  // General API rate limiter (per IP)
  const ipLimiter = new AdvancedRateLimiter(env.RATE_LIMIT_KV, {
    windowSeconds: 60,
    maxRequests: 100,
    burstCapacity: 20, // Allow 20 extra requests in burst
    whitelist,
  })

  // Authenticated user rate limiter (per user ID)
  const userLimiter = new AdvancedRateLimiter(env.RATE_LIMIT_KV, {
    windowSeconds: 60,
    maxRequests: 200, // Higher limit for authenticated users
    burstCapacity: 50,
    whitelist,
  })

  // Authentication endpoint rate limiter (stricter)
  const authLimiter = new AdvancedRateLimiter(env.RATE_LIMIT_KV, {
    windowSeconds: 60,
    maxRequests: 5, // Only 5 login attempts per minute
    burstCapacity: 0, // No burst for auth endpoints
    whitelist,
  })

  return { ipLimiter, userLimiter, authLimiter }
}

