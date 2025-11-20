# Rate Limiting & Abuse Prevention - Complete Guide

## Overview

This implementation provides comprehensive rate limiting and abuse prevention for Cloudflare Workers with:

- ✅ Token bucket algorithm with burst capacity
- ✅ Per-IP and per-user rate limiting
- ✅ Whitelist support
- ✅ Geo-blocking and IP reputation checks
- ✅ Credential stuffing mitigation
- ✅ Bot detection heuristics
- ✅ Progressive account lockout
- ✅ Prometheus-compatible metrics
- ✅ Structured logging
- ✅ Cloudflare Firewall rules
- ✅ Incident response playbook

## Architecture

```
Request → Geo-blocking → IP Blocking → Bot Detection → Rate Limiting → Authentication → Handler
           ↓              ↓              ↓               ↓                ↓
        Metrics      Abuse Log      Abuse Log      Metrics         Auth Tracking
```

## Components

### 1. Rate Limiter (`src/rate-limiter.ts`)
- **Token Bucket Algorithm**: Allows burst capacity beyond base rate
- **Per-IP Limiting**: 100 requests/minute + 20 burst
- **Per-User Limiting**: 200 requests/minute + 50 burst (authenticated)
- **Auth Endpoint Limiting**: 5 requests/minute, no burst
- **Whitelist Support**: Bypass rate limits for trusted IPs/users

### 2. Abuse Prevention (`src/abuse-prevention.ts`)
- **Geo-blocking**: Block/allowed countries via environment variables
- **IP Blocking**: Automatic blocking on repeated auth failures
- **Progressive Lockout**: 
  - 3-4 failures: 15-minute block
  - 5-9 failures: 1-hour block
  - 10+ failures: 24-hour block
- **Bot Detection**: Heuristic-based with confidence scoring
- **Event Logging**: All abuse events logged to KV

### 3. Observability (`src/observability.ts`)
- **Structured Logging**: JSON format for easy parsing
- **Prometheus Metrics**: Counter, gauge, and histogram support
- **Request Logging**: Automatic logging with context
- **Metrics Export**: `/metrics` endpoint for Prometheus scraping

### 4. Enhanced Worker (`src/index-enhanced.ts`)
- Integrates all components
- Handles CORS, authentication, routing
- Automatic metrics collection
- Error handling with safe messages

## Setup Instructions

### 1. Create KV Namespaces

```bash
# Rate limiting
wrangler kv:namespace create "RATE_LIMIT_KV"
# Copy ID to wrangler-enhanced.toml

# Abuse logging
wrangler kv:namespace create "ABUSE_LOG_KV"
# Copy ID to wrangler-enhanced.toml

# Blocked IPs
wrangler kv:namespace create "BLOCKED_IPS_KV"
# Copy ID to wrangler-enhanced.toml

# Metrics storage
wrangler kv:namespace create "METRICS_KV"
# Copy ID to wrangler-enhanced.toml

# JWKS cache (if not already created)
wrangler kv:namespace create "JWKS_CACHE_KV"
# Copy ID to wrangler-enhanced.toml
```

### 2. Configure Environment Variables

```bash
# Required
wrangler secret put JWT_ISSUER
wrangler secret put JWT_AUDIENCE
wrangler secret put JWKS_URL
wrangler secret put ALLOWED_ORIGINS

# Optional
wrangler secret put RATE_LIMIT_WHITELIST  # Comma-separated IPs
wrangler secret put ALLOWED_COUNTRIES      # e.g., "US,CA,GB"
wrangler secret put BLOCKED_COUNTRIES      # e.g., "CN,RU"
```

### 3. Deploy Worker

```bash
npm install
npm run deploy:prod
```

### 4. Configure Cloudflare Firewall Rules

Import rules from `cloudflare-firewall-rules.json`:
1. Go to Cloudflare Dashboard → Security → WAF
2. Create custom rules based on JSON file
3. Test in "Log" mode first
4. Enable "Block" or "Challenge" after verification

### 5. Set Up Logpush (Optional)

Configure Logpush using `logpush-config.json`:
1. Go to Cloudflare Dashboard → Analytics & Logs → Logpush
2. Follow instructions in JSON file
3. Configure destination (S3, GCS, etc.)

## Rate Limit Configuration

### Default Limits

| Endpoint Type | Limit | Burst | Window |
|--------------|-------|-------|--------|
| General API (per IP) | 100/min | 20 | 60s |
| Authenticated (per user) | 200/min | 50 | 60s |
| Auth endpoints (per IP) | 5/min | 0 | 60s |

### Customizing Limits

Edit `src/rate-limiter.ts` in `createRateLimiters()`:

```typescript
const ipLimiter = new AdvancedRateLimiter(env.RATE_LIMIT_KV, {
  windowSeconds: 60,      // Time window
  maxRequests: 100,        // Base limit
  burstCapacity: 20,       // Additional burst
  whitelist: [...],        // Whitelisted IPs/users
})
```

## Abuse Prevention Configuration

### Geo-blocking

Set environment variables:
```bash
# Allow only specific countries
ALLOWED_COUNTRIES="US,CA,GB"

# Block specific countries
BLOCKED_COUNTRIES="CN,RU,KP,IR"
```

### Progressive Lockout

Configured in `src/abuse-prevention.ts`:
- 3-4 failures: 15 minutes
- 5-9 failures: 1 hour
- 10+ failures: 24 hours

### Bot Detection

Thresholds in `src/abuse-prevention.ts`:
- Confidence score ≥ 50: Considered bot
- Factors: User-Agent, headers, Cloudflare bot score

## Monitoring

### Metrics Endpoint

```bash
curl https://api.qrsnap.app/metrics
```

Returns Prometheus-format metrics:
- `http_requests_total` - Request counter
- `rate_limit_hits_total` - Rate limit violations
- `auth_failures_total` - Authentication failures
- `geo_blocked_total` - Geo-blocked requests
- `ip_blocked_total` - IP-blocked requests
- `bot_detected_total` - Bot detections
- `http_request_duration_ms_bucket` - Response time histogram

### Structured Logs

All logs are JSON-formatted:
```json
{
  "timestamp": "2024-01-01T00:00:00.000Z",
  "level": "warn",
  "service": "qrsnap-api",
  "event": "rate_limit_exceeded",
  "ip": "203.0.113.1",
  "path": "/api/qr/generate",
  "method": "POST",
  "country": "US"
}
```

### Cloudflare Analytics

Monitor via Dashboard:
- Analytics → Web Traffic
- Security → Events
- Analytics → Logpush (if configured)

## Testing

### Test Rate Limiting

```bash
# Make 101 requests rapidly
for i in {1..101}; do
  curl -X GET https://api.qrsnap.app/health
done
# Should see 429 after 100 requests
```

### Test Auth Rate Limiting

```bash
# Make 6 auth attempts
for i in {1..6}; do
  curl -X POST https://api.qrsnap.app/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"wrong"}'
done
# Should see 429 after 5 attempts
```

### Test IP Blocking

```bash
# Make 4 failed auth attempts
for i in {1..4}; do
  curl -X POST https://api.qrsnap.app/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"wrong"}'
done
# IP should be blocked for 15 minutes
```

## Incident Response

See `INCIDENT_RESPONSE_PLAYBOOK.md` for:
- Alert thresholds
- Response procedures for different attack types
- Escalation procedures
- Post-incident actions

## Files Reference

- `src/rate-limiter.ts` - Token bucket rate limiter
- `src/abuse-prevention.ts` - Abuse detection and blocking
- `src/observability.ts` - Metrics and logging
- `src/index-enhanced.ts` - Main worker with all integrations
- `cloudflare-firewall-rules.json` - WAF rule configurations
- `logpush-config.json` - Logpush setup
- `INCIDENT_RESPONSE_PLAYBOOK.md` - Incident response guide
- `wrangler-enhanced.toml` - Enhanced configuration

## Best Practices

1. **Start with Log Mode**: Test firewall rules in "Log" mode before blocking
2. **Monitor Metrics**: Set up alerts for rate limit hits and auth failures
3. **Review Logs Regularly**: Check for false positives and adjust rules
4. **Whitelist Trusted IPs**: Add office/VPN IPs to whitelist
5. **Gradual Rollout**: Deploy to dev environment first, then production
6. **Document Changes**: Keep track of rule changes and their impact

## Troubleshooting

### Rate Limits Too Strict
- Increase `maxRequests` in rate limiter config
- Add IPs to whitelist
- Check if legitimate traffic is being blocked

### Too Many False Positives
- Adjust bot detection confidence threshold
- Review and whitelist legitimate bots
- Relax geo-blocking rules

### Metrics Not Appearing
- Check KV namespace bindings
- Verify metrics endpoint is accessible
- Check worker logs for errors

### IPs Not Being Blocked
- Verify `BLOCKED_IPS_KV` namespace is bound
- Check `trackAuthFailure()` is being called
- Review abuse logs in KV

## Support

For issues or questions:
1. Review `INCIDENT_RESPONSE_PLAYBOOK.md`
2. Check Cloudflare Dashboard analytics
3. Review worker logs
4. Contact Cloudflare support if needed

