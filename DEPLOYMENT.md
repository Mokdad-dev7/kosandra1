# GitHub Pages Deployment Guide with Custom Domain (qrsnap.app)

## Prerequisites
- GitHub account
- Repository created on GitHub
- Custom domain `qrsnap.app` managed in Cloudflare
- Node.js and npm installed locally (for testing)

## Deployment Steps

### Step 1: Push Code to GitHub

```bash
git init  # if not already initialized
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy on every push to `main` branch

### Step 3: Configure Custom Domain in GitHub

1. After first deployment, go to **Settings** → **Pages**
2. Under **Custom domain**, enter: `qrsnap.app`
3. Check **Enforce HTTPS** (recommended)
4. Click **Save**

### Step 4: Configure Cloudflare DNS

1. Log in to your Cloudflare dashboard
2. Select the domain `qrsnap.app`
3. Go to **DNS** → **Records**
4. Add/Update DNS records:

   **For root domain (qrsnap.app):**
   - Type: `CNAME`
   - Name: `@` (or `qrsnap.app`)
   - Target: `YOUR_USERNAME.github.io` (replace with your GitHub username)
   - Proxy status: **DNS only** (gray cloud) - Important for GitHub Pages
   - TTL: Auto

   **For www subdomain (optional):**
   - Type: `CNAME`
   - Name: `www`
   - Target: `YOUR_USERNAME.github.io`
   - Proxy status: **DNS only** (gray cloud)
   - TTL: Auto

5. **Important:** Make sure the proxy is **OFF** (gray cloud, not orange). GitHub Pages requires direct DNS, not proxied.

### Step 5: SSL/TLS Settings in Cloudflare

1. Go to **SSL/TLS** in Cloudflare
2. Set encryption mode to **Full (strict)** or **Full**
3. This ensures HTTPS works correctly with GitHub Pages

### Step 6: Wait for DNS Propagation

- DNS changes can take a few minutes to 24 hours
- Check DNS propagation: `dig qrsnap.app` or use online tools
- GitHub will verify the domain and enable HTTPS automatically

### Step 7: Verify Deployment

1. Go to **Actions** tab in your repository
2. Wait for the workflow to complete (usually 2-3 minutes)
3. Your site will be available at: `https://qrsnap.app`

## Important Notes

- The `CNAME` file is already created in the `public` folder with `qrsnap.app`
- This file will be copied to the `out` folder during build
- GitHub Pages will automatically detect and use this domain
- The site is configured for static export (no server-side features)
- Images are unoptimized for GitHub Pages compatibility
- All routes work as static HTML files

## Cloudflare-Specific Settings

### Recommended Cloudflare Settings:
- **SSL/TLS:** Full (strict)
- **Always Use HTTPS:** ON
- **Automatic HTTPS Rewrites:** ON
- **Minimum TLS Version:** 1.2
- **Opportunistic Encryption:** ON

### Page Rules (Optional):
Create a page rule to redirect www to non-www:
- URL: `www.qrsnap.app/*`
- Setting: Forwarding URL (301) to `https://qrsnap.app/$1`

## Troubleshooting

- **404 errors:** Make sure `trailingSlash: true` is set in `next.config.ts` if needed
- **Images not loading:** Check that image paths start with `/` (absolute paths)
- **Build fails:** Ensure all dependencies are installed (`npm ci`)
- **Domain not working:** 
  - Verify DNS records point to `YOUR_USERNAME.github.io`
  - Ensure Cloudflare proxy is OFF (gray cloud)
  - Wait for DNS propagation (can take up to 24 hours)
  - Check GitHub Pages settings show the custom domain
- **HTTPS not working:** 
  - Wait for GitHub to provision SSL certificate (can take up to 24 hours)
  - Ensure Cloudflare SSL mode is set to Full or Full (strict)
  - Check GitHub Pages settings show "Enforce HTTPS" is enabled

## Testing Locally

```bash
npm install
npm run build
npm run start  # Test the built site locally
```

## Repository Structure After Build

```
out/
├── CNAME          # Custom domain file
├── index.html
├── _next/
├── images/
└── [other static files]
```

The `out` folder is what gets deployed to GitHub Pages.

## Your App Links (After Deployment)

Once deployed, use these URLs in your Flutter app:
```
https://qrsnap.app/help
https://qrsnap.app/faq
https://qrsnap.app/feedback
https://qrsnap.app/privacy
```
