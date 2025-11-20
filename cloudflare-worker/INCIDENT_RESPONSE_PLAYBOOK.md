# Incident Response Playbook - Rate Limiting & Abuse Prevention

## Alert Thresholds

### Critical Alerts (Immediate Action Required)
- **Rate limit hits > 1000/minute** - Potential DDoS or bot attack
- **Auth failures > 500/minute** - Credential stuffing attack
- **Blocked IPs > 100 in 5 minutes** - Coordinated attack
- **Error rate > 10%** - Service degradation or attack

### Warning Alerts (Investigate Within 15 Minutes)
- **Rate limit hits > 500/minute** - Elevated traffic
- **Auth failures > 100/minute** - Possible credential stuffing
- **Bot detection > 50% of traffic** - Bot attack
- **Geo-blocked requests > 200/minute** - Regional attack

## Incident Response Procedures

### 1. DDoS / High Volume Attack

**Symptoms:**
- Sudden spike in requests (>10x normal)
- High rate limit hits
- Service degradation
- High error rates

**Immediate Actions:**
```bash
# 1. Check current metrics
curl https://api.qrsnap.app/metrics | grep rate_limit_hits

# 2. Review Cloudflare Analytics
# Dashboard → Analytics → Web Traffic
# Look for unusual patterns

# 3. Enable Cloudflare DDoS Protection
# Dashboard → Security → DDoS Protection
# Set to "I'm Under Attack" mode if needed

# 4. Review blocked IPs
# Dashboard → Security → Firewall Events
# Check recent blocks
```

**Mitigation Steps:**
1. **Enable "I'm Under Attack" mode** (Cloudflare Dashboard → Security)
2. **Increase rate limits temporarily** (if legitimate traffic)
3. **Add attacking IPs to IP Access Rules** (block list)
4. **Review and tighten firewall rules**
5. **Contact Cloudflare support** if attack persists

**Recovery:**
- Monitor metrics for 1 hour after attack
- Gradually reduce protection level
- Document attack patterns for future prevention

---

### 2. Credential Stuffing Attack

**Symptoms:**
- High 401/403 responses
- Multiple failed login attempts from same IP
- Auth rate limit hits
- IPs being automatically blocked

**Immediate Actions:**
```bash
# 1. Check auth failure metrics
curl https://api.qrsnap.app/metrics | grep auth_failures

# 2. Review abuse logs in KV
# Check ABUSE_LOG_KV for recent auth_failure events

# 3. List currently blocked IPs
# Dashboard → Security → Firewall → Tools → IP Access Rules
```

**Mitigation Steps:**
1. **Verify progressive lockout is working**
   - Check `trackAuthFailure()` function
   - Ensure IPs are being blocked after 3+ failures

2. **Manually block attacking IP ranges**
   ```bash
   # Add to Cloudflare IP Access Rules
   # Dashboard → Security → WAF → Tools → IP Access Rules
   # Add IP or CIDR range, set to "Block"
   ```

3. **Enable CAPTCHA for auth endpoints**
   - Cloudflare Dashboard → Security → Bot Fight Mode
   - Or use Turnstile for specific endpoints

4. **Review and tighten auth rate limits**
   - Current: 5 requests/minute per IP
   - Consider reducing to 3/minute during attack

5. **Enable account lockout notifications**
   - Alert users when their account is locked
   - Send email notifications

**Recovery:**
- Monitor auth endpoints for 24 hours
- Review blocked IPs and whitelist false positives
- Update firewall rules based on attack patterns

---

### 3. Bot Attack / Scraping

**Symptoms:**
- High bot detection rate
- Suspicious User-Agent patterns
- Requests from automation frameworks
- Low bot scores

**Immediate Actions:**
```bash
# 1. Check bot detection metrics
curl https://api.qrsnap.app/metrics | grep bot_detected

# 2. Review bot detection logs
# Check ABUSE_LOG_KV for bot_detected events

# 3. Analyze User-Agent patterns
# Cloudflare Dashboard → Analytics → Web Traffic
# Filter by User-Agent
```

**Mitigation Steps:**
1. **Enable Bot Fight Mode**
   - Cloudflare Dashboard → Security → Bot Fight Mode
   - Automatically challenges suspicious bots

2. **Tighten bot detection thresholds**
   - Lower confidence threshold (currently 50)
   - Add more detection heuristics

3. **Block known bot User-Agents**
   - Add to firewall rules (see `cloudflare-firewall-rules.json`)
   - Use IP Access Rules for persistent offenders

4. **Enable JavaScript Challenge**
   - Cloudflare Dashboard → Security → Settings
   - Set Security Level to "High"

5. **Review and block automation frameworks**
   - Check for Selenium, Puppeteer, Playwright headers
   - Block IPs using automation tools

**Recovery:**
- Monitor bot detection rate
- Whitelist legitimate bots (Googlebot, etc.)
- Adjust detection thresholds based on false positives

---

### 4. Geo-based Attack

**Symptoms:**
- High requests from specific countries
- Geo-blocking triggers
- Unusual traffic patterns from regions

**Immediate Actions:**
```bash
# 1. Check geo-blocking metrics
curl https://api.qrsnap.app/metrics | grep geo_blocked

# 2. Review traffic by country
# Cloudflare Dashboard → Analytics → Web Traffic
# Filter by Country
```

**Mitigation Steps:**
1. **Temporarily block attacking countries**
   - Update `BLOCKED_COUNTRIES` environment variable
   - Or use Cloudflare Firewall Rules

2. **Enable Challenge for specific regions**
   - Cloudflare Dashboard → Security → WAF
   - Create rule: Challenge requests from specific countries

3. **Review legitimate traffic from region**
   - Check if blocking affects real users
   - Consider IP whitelist for trusted users

4. **Coordinate with Cloudflare support**
   - Report regional attacks
   - Request additional protection

**Recovery:**
- Gradually remove country blocks
- Monitor traffic patterns
- Document attack for future reference

---

### 5. IP Reputation Attack

**Symptoms:**
- High threat scores
- Requests from known bad IPs
- Multiple IPs from same ASN

**Immediate Actions:**
```bash
# 1. Check threat score distribution
# Cloudflare Dashboard → Security → Events
# Filter by Threat Score

# 2. Review ASN patterns
# Check if attacks come from specific ASNs
```

**Mitigation Steps:**
1. **Block high threat score IPs**
   - Firewall rule: Block if `cf.threat_score > 50`
   - Already configured in `cloudflare-firewall-rules.json`

2. **Block known bad ASNs**
   - Add ASN numbers to firewall rules
   - Update `abuse-prevention.ts` blockedASNs array

3. **Enable IP Reputation Lists**
   - Cloudflare Dashboard → Security → WAF
   - Enable managed IP lists

4. **Coordinate with threat intelligence**
   - Subscribe to threat feeds
   - Integrate with abuse.ch, Spamhaus, etc.

**Recovery:**
- Monitor threat scores
- Review false positives
- Update ASN block lists

---

## Escalation Procedures

### Level 1: Automated Response (0-5 minutes)
- Rate limiting kicks in automatically
- IPs blocked after repeated failures
- Geo-blocking activates

### Level 2: Manual Intervention (5-15 minutes)
- Review metrics and logs
- Adjust rate limits if needed
- Manually block IP ranges
- Enable additional Cloudflare protections

### Level 3: Emergency Response (15+ minutes)
- Contact Cloudflare support
- Enable "I'm Under Attack" mode
- Consider temporarily disabling affected endpoints
- Coordinate with security team

## Post-Incident Actions

### 1. Documentation
- Document attack patterns
- Record mitigation steps taken
- Note any false positives
- Update playbook with lessons learned

### 2. Analysis
- Review logs and metrics
- Identify attack vectors
- Analyze attacker behavior
- Determine attack source/origin

### 3. Prevention
- Update firewall rules
- Adjust rate limits
- Enhance detection heuristics
- Improve monitoring/alerts

### 4. Communication
- Notify stakeholders if service was affected
- Update status page
- Communicate with users if needed
- Report to security team

## Monitoring Queries

### Check Current Rate Limit Status
```bash
curl -H "Authorization: Bearer YOUR_JWT" \
  https://api.qrsnap.app/api/status
# Returns rate limit headers
```

### Export Metrics (Prometheus)
```bash
curl https://api.qrsnap.app/metrics
```

### Check Abuse Stats for IP
```bash
# Via Cloudflare Dashboard → Analytics → Web Traffic
# Filter by Client IP
```

### Review Blocked IPs
```bash
# Cloudflare Dashboard → Security → Firewall Events
# Filter by Action: Block
```

## Contact Information

- **Cloudflare Support:** support@cloudflare.com
- **Emergency:** Cloudflare Dashboard → Help → Contact Support
- **Security Team:** [Your security team contact]

## Regular Maintenance

### Daily
- Review rate limit metrics
- Check for unusual patterns
- Review blocked IPs

### Weekly
- Analyze attack trends
- Update firewall rules
- Review and adjust rate limits

### Monthly
- Review and update playbook
- Analyze false positive rates
- Update threat intelligence feeds
- Review and optimize costs

