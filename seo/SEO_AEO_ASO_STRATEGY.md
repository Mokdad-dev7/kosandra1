# QR Snap — SEO, AEO & ASO Optimization Strategy

Pre-launch optimization guide for maximizing discoverability across traditional search, AI assistants, and app stores.

---

## Quick Wins Checklist

### Before Launch
- [ ] Deploy `robots.txt` with AI bot allowances → `seo/robots.txt`
- [ ] Deploy `llms.txt` for AI context → `seo/llms.txt`
- [ ] Deploy `pricing.md` for AI agent pricing discovery → `seo/pricing.md`
- [ ] Add JSON-LD schema markup to website pages
- [ ] Create XML sitemap with all pages
- [ ] Optimize Play Store listing with keywords
- [ ] Set up Google Search Console (after site is live)
- [ ] Set up Google Play Console pre-launch report

### Post-Launch (First 30 Days)
- [ ] Submit sitemap to Search Console
- [ ] Monitor Play Console organic acquisition
- [ ] Check AI visibility for key queries
- [ ] Respond to first reviews promptly
- [ ] Request ratings via in-app prompt (SKStoreReviewController equivalent)

---

## 1. Website SEO (qrsnap.app)

### Target Keywords

**Primary (highest intent):**
- "qr code scanner safe" / "safe qr scanner"
- "qr code phishing check"
- "qr code link safety"
- "secure qr scanner app"

**Secondary (volume):**
- "qr code scanner app"
- "barcode scanner android"
- "qr code generator free"
- "scan qr code from image"

**Long-tail (conversion):**
- "how to check if qr code is safe"
- "qr code scam protection"
- "qr code scanner with security check"
- "best qr scanner for phishing protection"

### Page Structure (Recommended)

```
qrsnap.app/
├── index.html          (Homepage - hero + features + CTA)
├── features/           (Detailed feature breakdown)
├── pricing/            (Plans + FAQ)
├── privacy/            (Privacy policy)
├── terms/              (Terms of service)
├── about/              (About Ars Technology)
├── support/            (Help + contact)
├── blog/               (Optional - SEO content)
│   ├── qr-code-safety-guide/
│   ├── how-to-spot-phishing-qr-codes/
│   └── ...
├── robots.txt
├── sitemap.xml
├── llms.txt
└── pricing.md
```

### On-Page SEO Checklist

**Homepage (index.html)**
- Title: `QR Snap — QR Scanner with Link Safety Checks | Scan & Create Safely`
- Meta description: `Scan and create QR codes with confidence. QR Snap checks links for phishing and threats before you open them. Privacy-first, offline-first. Free for Android.`
- H1: `Scan QR codes — and know if the link is safe before you open it`
- First 100 words: Include "QR code scanner," "link safety," "phishing protection"

**Features Page**
- Title: `QR Snap Features — Scanning, Generation & Link Safety`
- Structured with H2 for each feature category
- Include comparison table vs. competitors (implicit)

**Pricing Page**
- Title: `QR Snap Pricing — Free Forever + Lifetime Unlock`
- Use FAQ schema for common questions
- Clear pricing table (same as in `WEBSITE_CONTENT_UPDATE.md`)

### Technical SEO

**Required Meta Tags (all pages):**
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://qrsnap.app/[page]">

<!-- Open Graph -->
<meta property="og:title" content="[Page Title]">
<meta property="og:description" content="[Description]">
<meta property="og:image" content="https://qrsnap.app/og-image.png">
<meta property="og:url" content="https://qrsnap.app/[page]">
<meta property="og:type" content="website">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Page Title]">
<meta name="twitter:description" content="[Description]">
<meta name="twitter:image" content="https://qrsnap.app/og-image.png">
```

**Performance Targets (Core Web Vitals):**
- LCP (Largest Contentful Paint): < 2.5s
- INP (Interaction to Next Paint): < 200ms
- CLS (Cumulative Layout Shift): < 0.1

---

## 2. AEO — Answer Engine Optimization

### Why This Matters for QR Snap

When users ask AI assistants "is it safe to scan QR codes?" or "best QR scanner with security," you want QR Snap cited as the answer. AI systems cite:
- Well-structured, extractable content
- Content with statistics and sources
- Fresh, dated content
- Pages with schema markup

### Extractable Answer Blocks

**Add these to your website content (40-60 words each, standalone):**

**Definition block (for "What is QR Snap?"):**
> QR Snap is a privacy-first QR code and barcode scanner for Android that includes built-in link safety checks. Unlike basic QR apps that only decode, QR Snap uses Google Web Risk to analyze URLs for phishing and malware before you open them, showing a clear safe/risk status in plain language.

**How-to block (for "How to check if a QR code is safe"):**
> To check if a QR code is safe: 1) Scan the code with QR Snap. 2) View the parsed result showing the URL or content. 3) For URLs, QR Snap automatically runs a safety check using Google Web Risk. 4) Wait for the safe/risk/unknown status before tapping to open. Never open a link marked as risky.

**Comparison block (for "QR scanner vs QR Snap"):**
> Most QR scanner apps decode the code and immediately open the link. QR Snap adds a critical step: server-backed URL safety checks that detect phishing, malware, and suspicious patterns before you tap. Email addresses are validated via MX lookup. Both features are free for all users.

### Files for AI Systems

Already created in `seo/` folder:
- `robots.txt` — Allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended
- `llms.txt` — Product context for AI systems
- `pricing.md` — Machine-readable pricing for AI agents

**Deploy to:**
- `https://qrsnap.app/robots.txt`
- `https://qrsnap.app/llms.txt`
- `https://qrsnap.app/pricing.md`

### Schema Markup (JSON-LD)

**Homepage — Organization + SoftwareApplication:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://qrsnap.app/#organization",
      "name": "Ars Technology",
      "url": "https://qrsnap.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://qrsnap.app/logo.png"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://qrsnap.app/#app",
      "name": "QR Snap",
      "operatingSystem": "Android",
      "applicationCategory": "UtilitiesApplication",
      "offers": [
        {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "name": "Free"
        },
        {
          "@type": "Offer",
          "price": "9.99",
          "priceCurrency": "USD",
          "name": "Lifetime Unlock"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "ratingCount": "0",
        "bestRating": "5",
        "worstRating": "1"
      },
      "description": "QR & barcode scanner with built-in link safety checks. Privacy-first, offline-first.",
      "downloadUrl": "https://play.google.com/store/apps/details?id=com.ars.qr_snap",
      "publisher": {
        "@id": "https://qrsnap.app/#organization"
      }
    }
  ]
}
```

**FAQ Page — FAQPage schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is QR Snap free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, QR Snap is free forever for scanning and generating QR codes. You get 5 free URL safety checks per day and unlimited email domain checks. Optional Lifetime Unlock ($9.99) removes ads and adds backup/export features."
      }
    },
    {
      "@type": "Question",
      "name": "How does QR Snap check if a link is safe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "QR Snap uses Google Web Risk to check URLs against known phishing, malware, and social engineering threats. The check happens on our secure backend before you open the link. Results show as safe, risky, or unknown in plain language."
      }
    },
    {
      "@type": "Question",
      "name": "Does QR Snap store my scanned codes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your scan history and created codes are stored locally on your device only. QR Snap does not require an account and does not sync your codes to any cloud. For security checks, only the URL or email domain is sent to our backend."
      }
    },
    {
      "@type": "Question",
      "name": "What happens to my purchased URL credits if I uninstall?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Purchased URL credit packs are tied to your device installation and cannot be restored after uninstall or app data clear. Lifetime Unlock can be restored via your Google Play account. This is disclosed before purchase."
      }
    }
  ]
}
```

**HowTo schema (for guide content):**
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Check if a QR Code is Safe Before Opening",
  "description": "Step-by-step guide to safely scan QR codes and verify links before opening them.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Scan the QR code",
      "text": "Open QR Snap and point your camera at the QR code. The app will automatically detect and decode it."
    },
    {
      "@type": "HowToStep",
      "name": "View the parsed result",
      "text": "QR Snap shows what the code contains: URL, contact, Wi-Fi credentials, or other data types."
    },
    {
      "@type": "HowToStep",
      "name": "Wait for the safety check",
      "text": "For URLs, QR Snap automatically runs a link safety check using Google Web Risk. Wait for the result."
    },
    {
      "@type": "HowToStep",
      "name": "Check the safety status",
      "text": "Look for the safety indicator: green checkmark means safe, red warning means risky, gray means unknown."
    },
    {
      "@type": "HowToStep",
      "name": "Decide whether to open",
      "text": "Only tap to open links marked as safe. If marked risky or unknown, proceed with caution or avoid."
    }
  ]
}
```

### AI Visibility Monitoring

**Queries to test monthly (post-launch):**

| Query | Platform | Goal |
|-------|----------|------|
| "is it safe to scan qr codes" | ChatGPT, Perplexity, Google | Get cited as safety expert |
| "best qr scanner with security" | ChatGPT, Perplexity | Be recommended |
| "qr code phishing protection app" | All | Be mentioned |
| "how to check qr code for malware" | All | Answer with how-to |
| "qr snap app" | All | Brand recognition |

---

## 3. ASO — App Store Optimization

### Google Play Listing (Primary)

**App Name (30 chars max):**
```
QR Snap: Safe QR Scanner
```
Alternative: `QR Snap - Scan & Check Links`

**Short Description (80 chars max):**
```
Scan & create QR codes with link safety checks. Privacy-first.
```
(Already in PLAY_STORE_LISTING.md — good)

**Full Description keywords to include (2-3% density):**
- qr code scanner (5-6 times)
- barcode scanner (2-3 times)
- qr code reader (2-3 times)
- link safety / safe link (3-4 times)
- phishing protection (1-2 times)
- qr code generator (2-3 times)
- scan qr code (3-4 times)
- privacy (2-3 times)

**Category:** Tools (current) — correct choice
**Secondary tags:** Productivity, Utilities

### Screenshot Strategy

**8 screenshots recommended (Google Play max):**

1. **Hero shot** — App scanning a QR code with safety checkmark visible
2. **Safety check** — URL result showing "Safe to open" status
3. **Warning state** — Result showing risk detected (proves the feature works)
4. **Generate** — Creating a QR code with preview
5. **History** — Organized scans with folders
6. **Batch scan** — Multiple codes at once (Lifetime feature)
7. **Pricing** — Plans screen showing Free + Lifetime + packs
8. **POS** — Point of Sale checkout (Lifetime feature)

**Caption strategy:**
- First 3 screenshots: Focus on differentiator (safety checks)
- Next 3: Core features (generate, history, batch)
- Last 2: Premium features (entice upgrade)

### Feature Graphic (1024x500)

```
Main text: "Scan. Create. Check the link."
Subtext: "Link safety checks before you open"
Visual: App icon + safety checkmark + phone with scan interface
```

### What's New Template

```
• Link safety checks powered by Google Web Risk
• Clearer safe/risk status messages
• Faster QR code recognition
• Bug fixes and stability improvements
```

### ASO Monitoring (Google Play Console)

**Track these metrics:**
- Store listing visitors → Installers (conversion rate)
- Search impressions by keyword
- Browse vs. Search acquisition split
- Uninstall rate (target < 5% day-1)

---

## 4. Content Strategy (Post-Launch)

### Blog Topics for SEO + AEO

**High-value articles to create:**

1. **"How to Check if a QR Code is Safe Before Scanning"**
   - Target: "qr code safety," "is qr code safe"
   - Include: Step-by-step with screenshots, mention QR Snap naturally

2. **"QR Code Scams: How to Protect Yourself"**
   - Target: "qr code scam," "qr phishing"
   - Include: Real examples, warning signs, how QR Snap helps

3. **"Best QR Code Scanner Apps for Android (2026)"**
   - Target: Comparison queries
   - Include: Fair comparison, QR Snap's safety differentiator

4. **"Are Restaurant QR Code Menus Safe?"**
   - Target: Specific use-case concerns
   - Include: Practical advice + app recommendation

5. **"Wi-Fi QR Code Generator: Create & Share Safely"**
   - Target: Feature-specific searches
   - Include: Tutorial using QR Snap

### Authority Building

**Third-party presence (important for AEO):**
- [ ] Submit to Product Hunt (launch day)
- [ ] Post in r/Android, r/privacy (authentically)
- [ ] Create YouTube tutorial (gets cited by Google AI Overviews)
- [ ] Answer relevant Quora questions
- [ ] Get listed on AlternativeTo.net

---

## 5. Technical Implementation

### Files to Deploy

| File | Location | Purpose |
|------|----------|---------|
| `robots.txt` | `https://qrsnap.app/robots.txt` | Allow AI + search bots |
| `llms.txt` | `https://qrsnap.app/llms.txt` | AI context file |
| `pricing.md` | `https://qrsnap.app/pricing.md` | AI agent pricing |
| `sitemap.xml` | `https://qrsnap.app/sitemap.xml` | Search indexing |
| Schema JSON-LD | In `<head>` of each page | Rich results |

### Sitemap Template

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://qrsnap.app/</loc>
    <lastmod>2026-08-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://qrsnap.app/features/</loc>
    <lastmod>2026-08-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://qrsnap.app/pricing/</loc>
    <lastmod>2026-08-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://qrsnap.app/privacy/</loc>
    <lastmod>2026-08-15</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://qrsnap.app/terms/</loc>
    <lastmod>2026-08-15</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

---

## 6. Measurement & Iteration

### Tools to Set Up

| Tool | Purpose | When |
|------|---------|------|
| Google Search Console | Website SEO tracking | Immediately after site is live |
| Google Play Console | ASO + acquisition data | Already have (pre-launch) |
| Google Analytics 4 | Website traffic | Before launch |
| Peec AI or Otterly | AI visibility tracking | Post-launch (optional) |

### Monthly Review Checklist

- [ ] Search Console: Impressions, clicks, CTR for target keywords
- [ ] Play Console: Search terms, conversion rate, uninstalls
- [ ] Manual AI check: Test 5-10 queries in ChatGPT/Perplexity
- [ ] Review responses: Reply to new reviews, especially negative
- [ ] Content freshness: Update "last modified" dates if content changed

---

## Summary: Priority Actions

### Pre-Launch (Do Now)
1. Deploy `robots.txt`, `llms.txt`, `pricing.md` to website
2. Add schema markup to website pages
3. Create and submit sitemap.xml
4. Finalize Play Store listing with keyword-rich description
5. Prepare 8 screenshots with safety-focused messaging

### Launch Week
1. Submit sitemap to Search Console
2. Post on Product Hunt
3. Enable Play Console pre-launch report monitoring
4. Start requesting ratings after successful scans (in-app)

### First 30 Days
1. Test AI visibility for key queries
2. Respond to all reviews (build early rapport)
3. Publish first 2-3 blog articles
4. Monitor keyword rankings and adjust

---

*This strategy aligns with the product positioning in `PRODUCT.md` — security-first scanning for non-experts, with honest pricing and privacy-first principles.*
