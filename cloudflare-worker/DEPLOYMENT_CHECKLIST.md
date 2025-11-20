# Cloudflare Worker Deployment Checklist

## Pre-Deployment Setup

### 1. Create KV Namespaces

```bash
# Rate limiting KV
wrangler kv:namespace create "RATE_LIMIT_KV"
# Copy the ID to wrangler.toml

# JWKS cache KV
wrangler kv:namespace create "JWKS_CACHE_KV"
# Copy the ID to wrangler.toml

# Preview namespaces (for dev)
wrangler kv:namespace create "RATE_LIMIT_KV" --preview
wrangler kv:namespace create "JWKS_CACHE_KV" --preview
# Copy preview IDs to wrangler.toml
```

### 2. Set Environment Variables

```bash
# Required
wrangler secret put JWT_ISSUER
# Enter: https://qrsnap.app

wrangler secret put JWT_AUDIENCE
# Enter: api.qrsnap.app

wrangler secret put JWKS_URL
# Enter: https://qrsnap.app/.well-known/jwks.json

wrangler secret put ALLOWED_ORIGINS
# Enter: https://qrsnap.app,https://app.qrsnap.app

# Optional (for dev)
wrangler secret put DEV_ORIGINS
# Enter: http://localhost:3000,http://127.0.0.1:3000

# Optional (for detailed error messages)
wrangler secret put API_SECRET
# Enter: your-secret-key-here
```

### 3. Update wrangler.toml

- Replace `your-rate-limit-kv-namespace-id` with actual KV namespace ID
- Replace `your-jwks-cache-kv-namespace-id` with actual KV namespace ID
- Update route patterns if needed
- Verify zone_name matches your Cloudflare zone

## DNS Configuration

### 4. Add DNS Record

1. Go to Cloudflare Dashboard → DNS → Records
2. Add A record:
   - **Type:** A (or CNAME)
   - **Name:** api (or api.qrsnap.app)
   - **IPv4 address:** (Cloudflare will proxy)
   - **Proxy status:** ✅ Proxied (orange cloud)
   - **TTL:** Auto

### 5. Custom Domain Setup

1. Go to Workers & Pages → Your Worker → Settings → Triggers
2. Add Custom Domain:
   - **Domain:** api.qrsnap.app
   - **Zone:** qrsnap.app
   - **Subdomain:** api

### 6. TLS/SSL Settings

1. Go to SSL/TLS → Overview
2. Ensure mode is **Full (strict)**
3. Go to SSL/TLS → Edge Certificates
4. Enable:
   - ✅ Always Use HTTPS
   - ✅ Minimum TLS Version: 1.2
   - ✅ Opportunistic Encryption
   - ✅ TLS 1.3

### 7. Disable Proxy for Mail Records (if applicable)

If you have mail-related DNS records (MX, TXT for SPF/DKIM/DMARC):

1. Go to DNS → Records
2. Find mail-related records
3. Click each record → Edit
4. Set **Proxy status:** DNS only (gray cloud)
5. Save

**Why:** Mail records must not be proxied through Cloudflare

## Worker Configuration

### 8. Worker Limits

1. Go to Workers & Pages → Your Worker → Settings → Limits
2. Configure:
   - **CPU Time:** 50ms (default, adjust if needed)
   - **Memory:** 128MB (default)
   - **Subrequests:** 50 (default)

### 9. Bindings Verification

Verify in Workers & Pages → Your Worker → Settings → Variables:

- ✅ RATE_LIMIT_KV (KV Namespace)
- ✅ JWKS_CACHE_KV (KV Namespace)
- ✅ JWT_ISSUER (Secret)
- ✅ JWT_AUDIENCE (Secret)
- ✅ JWKS_URL (Secret)
- ✅ ALLOWED_ORIGINS (Secret)
- ✅ DEV_ORIGINS (Secret, optional)

## Deployment

### 10. Deploy to Development

```bash
npm install
npm run deploy:dev
```

### 11. Test Development Deployment

```bash
curl https://api-dev.qrsnap.app/health
```

### 12. Deploy to Production

```bash
npm run deploy:prod
```

### 13. Verify Production Deployment

```bash
curl https://api.qrsnap.app/health
```

## Post-Deployment Verification

### 14. Security Headers Check

```bash
curl -I https://api.qrsnap.app/health
```

Verify presence of:
- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Content-Security-Policy`

### 15. CORS Verification

```bash
curl -X OPTIONS https://api.qrsnap.app/api/qr/generate \
  -H "Origin: https://qrsnap.app" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

Verify:
- `Access-Control-Allow-Origin: https://qrsnap.app`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With`

### 16. Rate Limiting Test

```bash
# Should return 429 after 100 requests
for i in {1..105}; do
  curl -s -o /dev/null -w "%{http_code}\n" https://api.qrsnap.app/health
done
```

### 17. JWT Authentication Test

```bash
# Should return 401 without token
curl https://api.qrsnap.app/api/qr/create

# Should return 200/400 with valid token
curl -H "Authorization: Bearer VALID_JWT" \
  https://api.qrsnap.app/api/qr/create
```

## Monitoring Setup

### 18. Enable Analytics

1. Go to Workers & Pages → Your Worker → Analytics
2. Enable:
   - ✅ Request analytics
   - ✅ Error tracking
   - ✅ CPU time tracking

### 19. Set Up Alerts

1. Go to Notifications → Add Notification
2. Create alerts for:
   - Worker errors > threshold
   - CPU time > threshold
   - Request rate anomalies

## Security Hardening

### 20. WAF Rules (Optional but Recommended)

1. Go to Security → WAF → Custom Rules
2. Create rules:
   - Block requests with suspicious User-Agent patterns
   - Rate limit by country (if needed)
   - Block known bad IPs

### 21. Firewall Rules

1. Go to Security → WAF → Firewall Rules
2. Add rules:
   - Challenge requests from high-risk countries
   - Block requests without proper Origin header (for API)

### 22. Rate Limiting (Cloudflare Level)

1. Go to Security → Rate Limiting
2. Create rule:
   - **Rule name:** API Rate Limit
   - **Match:** URI path starts with `/api/`
   - **Threshold:** 100 requests per minute
   - **Action:** Block

## Final Checklist

- [ ] KV namespaces created and bound
- [ ] All environment variables set
- [ ] DNS record added (api.qrsnap.app)
- [ ] Custom domain configured
- [ ] TLS/SSL set to Full (strict)
- [ ] Mail records set to DNS only
- [ ] Worker deployed to dev
- [ ] Worker deployed to prod
- [ ] Security headers verified
- [ ] CORS working correctly
- [ ] Rate limiting functional
- [ ] JWT authentication working
- [ ] Analytics enabled
- [ ] Alerts configured
- [ ] WAF rules added (optional)

## Rollback Procedure

If deployment fails:

```bash
# List deployments
wrangler deployments list

# Rollback to previous version
wrangler rollback
```

## Troubleshooting

### Issue: CORS not working
- Check `ALLOWED_ORIGINS` environment variable
- Verify Origin header in request
- Check browser console for CORS errors

### Issue: JWT validation failing
- Verify JWKS endpoint is accessible
- Check JWT_ISSUER and JWT_AUDIENCE match token claims
- Verify JWKS contains key with matching `kid`

### Issue: Rate limiting not working
- Check KV namespace binding
- Verify RATE_LIMIT_KV is accessible
- Check KV namespace IDs in wrangler.toml

### Issue: Worker timeout
- Increase CPU time limit in Worker settings
- Optimize code to reduce execution time
- Check for infinite loops or blocking operations

