# Cloudflare Worker Testing Guide

## Prerequisites

1. Generate a test JWT (RS256) with the following claims:
   ```json
   {
     "iss": "https://qrsnap.app",
     "aud": "api.qrsnap.app",
     "sub": "test-user-123",
     "email": "test@qrsnap.app",
     "exp": 1734567890,
     "iat": 1734564290
   }
   ```

2. Set up JWKS endpoint at `https://qrsnap.app/.well-known/jwks.json`:
   ```json
   {
     "keys": [
       {
         "kty": "RSA",
         "use": "sig",
         "kid": "test-key-1",
         "alg": "RS256",
         "n": "BASE64_URL_SAFE_MODULUS",
         "e": "AQAB"
       }
     ]
   }
   ```

## Test Commands

### 1. Health Check (Public)
```bash
curl -X GET https://api.qrsnap.app/health \
  -H "Origin: https://qrsnap.app" \
  -v
```

**Expected:** 200 OK with CORS headers

### 2. CORS Preflight
```bash
curl -X OPTIONS https://api.qrsnap.app/api/qr/generate \
  -H "Origin: https://qrsnap.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type,Authorization" \
  -v
```

**Expected:** 204 No Content with CORS headers

### 3. Rate Limiting Test
```bash
# Make 101 requests rapidly
for i in {1..101}; do
  curl -X GET https://api.qrsnap.app/health \
    -H "Origin: https://qrsnap.app" \
    -w "\nStatus: %{http_code}\n"
done
```

**Expected:** First 100 return 200, 101st returns 429

### 4. Authenticated Endpoint (Valid JWT)
```bash
curl -X POST https://api.qrsnap.app/api/qr/generate \
  -H "Origin: https://qrsnap.app" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "type": "url",
    "data": {
      "url": "https://example.com"
    }
  }' \
  -v
```

**Expected:** 200 OK with response

### 5. Authenticated Endpoint (Invalid JWT)
```bash
curl -X POST https://api.qrsnap.app/api/qr/generate \
  -H "Origin: https://qrsnap.app" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer invalid.token.here" \
  -d '{"type": "url", "data": {"url": "https://example.com"}}' \
  -v
```

**Expected:** 401 Unauthorized

### 6. Authenticated Endpoint (No JWT)
```bash
curl -X POST https://api.qrsnap.app/api/qr/generate \
  -H "Origin: https://qrsnap.app" \
  -H "Content-Type: application/json" \
  -d '{"type": "url", "data": {"url": "https://example.com"}}' \
  -v
```

**Expected:** 401 Unauthorized

### 7. Input Validation Test
```bash
curl -X POST https://api.qrsnap.app/api/qr/generate \
  -H "Origin: https://qrsnap.app" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "type": "invalid_type",
    "data": {}
  }' \
  -v
```

**Expected:** 400 Bad Request with validation error

### 8. Request Size Limit Test
```bash
# Generate 2MB of data
dd if=/dev/zero bs=1M count=2 | base64 > large_payload.txt

curl -X POST https://api.qrsnap.app/api/qr/generate \
  -H "Origin: https://qrsnap.app" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d @large_payload.txt \
  -v
```

**Expected:** 413 Payload Too Large

### 9. CORS Origin Validation
```bash
curl -X GET https://api.qrsnap.app/health \
  -H "Origin: https://evil.com" \
  -v
```

**Expected:** 200 OK but NO CORS headers (origin not allowed)

### 10. Security Headers Check
```bash
curl -X GET https://api.qrsnap.app/health \
  -H "Origin: https://qrsnap.app" \
  -I
```

**Expected Headers:**
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Content-Security-Policy: ...`
- `Cache-Control: public, max-age=300, s-maxage=600`

## Sample JWT for Testing

**Header:**
```json
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "test-key-1"
}
```

**Payload:**
```json
{
  "iss": "https://qrsnap.app",
  "aud": "api.qrsnap.app",
  "sub": "user-123",
  "email": "user@qrsnap.app",
  "exp": 1734567890,
  "iat": 1734564290
}
```

**Note:** You must sign this with the private key corresponding to the public key in your JWKS endpoint.

## Generating Test JWT

Use a tool like `jose` (Node.js) or `pyjwt` (Python) to generate test tokens:

```bash
# Node.js example
npm install jose
node -e "
const { SignJWT } = require('jose');
const privateKey = 'YOUR_PRIVATE_KEY_PEM';
// ... generate token
"
```

