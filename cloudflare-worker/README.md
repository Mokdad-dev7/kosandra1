# QR Snap API - Hardened Cloudflare Worker

Production-ready Cloudflare Worker with comprehensive security hardening.

## Features

- ✅ **Strict CORS** - Only allows `https://qrsnap.app` and configured dev origins
- ✅ **JWT Authentication** - RS256 with JWKS caching (1-hour TTL)
- ✅ **Rate Limiting** - KV-based, 100 requests/minute per IP/user
- ✅ **Input Validation** - JSON Schema validation for all requests
- ✅ **Error Handling** - Centralized, no stack traces exposed
- ✅ **Security Headers** - CSP, HSTS, X-Frame-Options, etc.
- ✅ **Request Limits** - 1MB body size, 30s timeout
- ✅ **Abort Controller** - Graceful timeout handling

## Quick Start

```bash
# Install dependencies
npm install

# Create KV namespaces
wrangler kv:namespace create "RATE_LIMIT_KV"
wrangler kv:namespace create "JWKS_CACHE_KV"

# Set secrets
wrangler secret put JWT_ISSUER
wrangler secret put JWT_AUDIENCE
wrangler secret put JWKS_URL
wrangler secret put ALLOWED_ORIGINS

# Deploy
npm run deploy:prod
```

## Files

- `src/index.ts` - Main Worker code (ready to paste into Cloudflare dashboard)
- `wrangler.toml` - Configuration file
- `TESTING.md` - Test commands and sample JWT
- `DEPLOYMENT_CHECKLIST.md` - Complete deployment guide

## Environment Variables

Required:
- `JWT_ISSUER` - JWT issuer (e.g., `https://qrsnap.app`)
- `JWT_AUDIENCE` - JWT audience (e.g., `api.qrsnap.app`)
- `JWKS_URL` - JWKS endpoint URL
- `ALLOWED_ORIGINS` - Comma-separated allowed origins

Optional:
- `DEV_ORIGINS` - Comma-separated dev origins
- `API_SECRET` - For detailed error messages in dev

## KV Namespaces

- `RATE_LIMIT_KV` - Stores rate limit counters
- `JWKS_CACHE_KV` - Caches JWKS responses (1-hour TTL)

## Security

All security best practices implemented:
- No secrets in code
- Input validation on all endpoints
- Rate limiting per IP and user
- JWT signature verification with JWKS
- CORS restricted to allowed origins only
- Security headers on all responses
- Request size and timeout limits

See `DEPLOYMENT_CHECKLIST.md` for complete setup instructions.

