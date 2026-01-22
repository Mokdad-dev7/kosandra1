# QRSnap Website - Cloudflare Pages Deployment Guide

This guide explains how to deploy the QRSnap website (including all documentation pages) to Cloudflare Pages.

## Overview

The QRSnap website is built with Next.js and includes the following pages:
- **Help Center** → `/help`
- **FAQ** → `/faq`
- **Community** → `/community`
- **Feedback** → `/feedback`
- **Status** → `/status` (redirects to https://status.qrsnap.app)

## Prerequisites

- A Cloudflare account
- A GitHub repository (or GitLab/Bitbucket)
- Node.js 18+ installed locally (for testing)

## Deployment Steps

### Option 1: Deploy via Cloudflare Dashboard (Recommended)

1. **Connect Your Repository**
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Pages** → **Create a project**
   - Connect your Git provider (GitHub, GitLab, or Bitbucket)
   - Select your repository

2. **Configure Build Settings**
   - **Framework preset**: `Next.js`
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (or leave empty if repo root)

3. **Environment Variables** (if needed)
   - Add any required environment variables in the Cloudflare Pages dashboard
   - Common variables:
     - `NEXT_PUBLIC_APP_URL` - Your app's public URL
     - Database connection strings (if using)
     - API keys (if using)

4. **Deploy**
   - Click **Save and Deploy**
   - Cloudflare will automatically build and deploy your site
   - You'll get a preview URL immediately

5. **Custom Domain** (Optional)
   - Go to **Custom domains** in your project settings
   - Add your domain (e.g., `qrsnap.app`)
   - Cloudflare will automatically configure DNS

### Option 2: Deploy via Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Create a Pages Project**
   ```bash
   wrangler pages project create qrsnap-website
   ```

4. **Deploy**
   ```bash
   npm run build
   wrangler pages deploy .next --project-name=qrsnap-website
   ```

## Build Configuration

The project uses Next.js with the following key configurations:

- **Framework**: Next.js 14+ (App Router)
- **Build Command**: `npm run build`
- **Node Version**: 18.x or higher
- **Output**: Static and server-rendered pages

### Next.js Configuration

The `next.config.ts` file is already configured for production builds. Cloudflare Pages will automatically:
- Detect Next.js framework
- Run the build command
- Serve static assets
- Handle server-side rendering (if using Cloudflare Workers)

## Editing Content

### Help Center (`/help`)

Edit: `app/help/page.tsx`

The Help Center includes tutorials for:
- Scanning QR codes
- Generating QR codes
- Exporting as PNG
- Sharing QR codes
- Privacy & Security
- App Permissions

### FAQ (`/faq`)

Edit: `components/marketing/FAQ.tsx`

The FAQ component contains all questions and answers. Add new FAQs by adding objects to the `faqs` array.

### Community (`/community`)

Edit: `app/community/page.tsx`

Update GitHub links, add forum links when available, and modify community information.

### Feedback (`/feedback`)

Edit: `app/feedback/page.tsx`

The feedback form sends emails to `info@qrsnap.app`. Update the email address in the `mailto` links if needed.

### Status (`/status`)

Edit: `app/status/page.tsx`

Update the redirect URL if your status page URL changes.

## Adding New Pages

To add a new documentation page:

1. Create a new file in `app/[page-name]/page.tsx`
2. Use the same structure as existing pages:
   ```tsx
   'use client'
   
   import { Header } from '@/components/marketing/Header'
   import { Footer } from '@/components/marketing/Footer'
   import { PageWrapper } from '@/components/ui/page-wrapper'
   // ... other imports
   
   export default function NewPage() {
     return (
       <div className="min-h-screen flex flex-col">
         <Header />
         <PageWrapper>
           {/* Your content */}
           <Footer />
         </PageWrapper>
       </div>
     )
   }
   ```
3. Add a link to the new page in `components/marketing/Footer.tsx`

## Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **View Site**
   - Open http://localhost:3000
   - Navigate to `/help`, `/faq`, `/community`, `/feedback`, or `/status`

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Troubleshooting

### Build Failures

- Ensure Node.js version is 18+ (check with `node --version`)
- Clear `.next` folder and `node_modules`, then reinstall:
  ```bash
  rm -rf .next node_modules
  npm install
  npm run build
  ```

### Page Not Found

- Ensure the page file is in the correct location: `app/[page-name]/page.tsx`
- Check that the route is properly exported as default
- Verify the page is included in the build output

### Styling Issues

- Ensure Tailwind CSS is properly configured
- Check that all component imports are correct
- Verify `globals.css` is imported in `app/layout.tsx`

## Continuous Deployment

Cloudflare Pages automatically deploys on every push to your main branch. You can configure:
- **Production branch**: Usually `main` or `master`
- **Preview deployments**: Automatic for pull requests
- **Build hooks**: For manual deployments

## Performance Optimization

The site is already optimized with:
- Next.js automatic code splitting
- Image optimization
- Static page generation where possible
- Efficient CSS with Tailwind

## Support

For issues or questions:
- Check the Help Center: `/help`
- View FAQ: `/faq`
- Submit feedback: `/feedback`
- Visit Community: `/community`

## License

Copyright © 2024 QRSnap. All rights reserved.

