# QR Snap Website - Complete Documentation

## Overview

QR Snap is a static Next.js website for a QR code generation and scanning mobile application. The website showcases the app's features, provides information about the company, and includes a client-side QR code generator. The website is developed by **Ars Technology** and is designed to be deployed as a static site (e.g., GitHub Pages).

**Contact Email:** ars.tech.app@gmail.com  
**Developer:** Ars Technology  
**Technology Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion

---

## Website Structure

### Pages

The website consists of the following pages:

1. **Home Page** (`/`) - Main landing page with comprehensive app showcase
2. **Features Page** (`/features`) - Detailed feature list
3. **About Page** (`/about`) - Company and app information
4. **Contact Page** (`/contact`) - Contact information and form
5. **FAQ Page** (`/faq`) - Frequently asked questions
6. **Privacy Policy** (`/privacy`) - Privacy policy and data handling
7. **Terms of Service** (`/terms`) - Terms and conditions
8. **Blog Page** (`/blog`) - Blog listing (placeholder)
9. **Help Page** (`/help`) - Help center
10. **Community Page** (`/community`) - Community information
11. **Feedback Page** (`/feedback`) - Feedback form
12. **Status Page** (`/status`) - Service status

---

## Home Page (`/`) - Detailed Breakdown

The home page is the main landing page featuring 12 distinct sections:

### 1. Header Component
- **Location:** Fixed at top of all pages
- **Features:**
  - Animated QR Snap logo with text
  - Navigation menu: Home, Features, About, Contact, FAQ, Blog
  - Theme toggle (Light/Dark mode)
  - Mobile-responsive hamburger menu
  - Smooth scroll animations

### 2. Hero Section
- **Component:** `HeroSection`
- **Content:**
  - Main headline: "Create, Customize & Track QR Codes Instantly"
  - Subheading describing the app
  - Call-to-action buttons
  - Phone mockup carousel showing 28 app screenshots
  - Parallax scrolling effects
  - Gradient background decorations

### 3. App Download Bar
- **Component:** `DownloadBar`
- **Content:**
  - Google Play Store download link
  - App Store download link (coming soon)
  - App icons and badges

### 4. Core Scanning Features
- **Component:** `ScanningFeatures`
- **Features Highlighted:**
  - Fast QR code scanning
  - Barcode support
  - Batch scanning
  - History tracking
  - Flashlight support
  - Auto-focus

### 5. QR + Barcode Generation Types
- **Component:** `QRTypesGrid`
- **QR Code Types Supported:**
  - URL
  - Text
  - Email
  - Phone
  - SMS
  - WiFi credentials
  - Contact cards (vCard)
  - Calendar events
  - Location (GPS)
  - Social media links
  - Barcodes
  - Custom data

### 6. Security & Safety Section
- **Component:** `SecuritySection`
- **Content:**
  - Security features explanation
  - Privacy protection highlights
  - Safe scanning practices
  - Data encryption information

### 7. History & Organization Section
- **Component:** `HistorySection`
- **Content:**
  - Scan history features
  - Organization capabilities
  - Search and filter options
  - Categorization features

### 8. Export & Backup Section
- **Component:** `ExportSection`
- **Content:**
  - Export options (PNG, SVG)
  - Backup functionality
  - Import/restore features
  - Cloud sync information

### 9. Premium Tiers
- **Component:** `PremiumTiers`
- **Subscription Plans:**
  - **Basic** - Remove ads
  - **Premium** - Additional security and validation features
  - **Pro** - Advanced scanning and backup features
- **Features:**
  - Pricing information
  - Feature comparison
  - Call-to-action buttons

### 10. UI/UX Design System
- **Component:** `DesignSystem`
- **Content:**
  - Design philosophy
  - User interface highlights
  - User experience features
  - Accessibility information

### 11. Technical Specs
- **Component:** `TechSpecs`
- **Content:**
  - Technical capabilities
  - Supported formats
  - Performance metrics
  - Platform compatibility

### 12. Coming Soon Section
- **Component:** `ComingSoon`
- **Content:**
  - Upcoming features
  - Roadmap information
  - Feature requests

### 13. FAQ Preview
- **Component:** `FAQ`
- **Content:**
  - Frequently asked questions
  - Quick answers
  - Link to full FAQ page

### 14. Final Call-to-Action
- **Component:** `FinalCTA`
- **Content:**
  - Final conversion message
  - Download buttons
  - Social proof

### 15. Footer
- **Component:** `Footer`
- **Sections:**
  - Product links
  - Support links
  - Company links
  - Copyright: "© 2026 QR Snap by Ars Technology. All rights reserved."
  - "Created by Ars Technology" with email link
  - "Made with ♥ by Ars Technology"

---

## Features Page (`/features`)

### Content Structure:
- **Header:** Same as home page
- **Main Content:**
  - Page title: "Features"
  - Subtitle: "Everything you need to create and manage professional QR codes"
  - **6 Feature Cards:**
    1. **Multiple QR Types** - Generate QR codes for URLs, text, email, phone, SMS, WiFi, contacts
    2. **Full Customization** - Customize colors, add logos, adjust error correction
    3. **Analytics Dashboard** - Track scans, view geographic data, device types
    4. **Dynamic QR Codes** - Editable QR codes without regeneration
    5. **Secure & Private** - Encrypted data, no third-party sharing
    6. **Multiple Formats** - Download as PNG or SVG
  - "Get Started" button linking to home page
- **Footer:** Same as home page

---

## About Page (`/about`)

### Content Structure:
- **Header:** Same as home page
- **Main Content:**
  - Animated QR Snap logo
  - Page title: "About QR Snap"
  - Subtitle: "Developed by Ars Technology - Building the most advanced QR code platform"
  - **Company Story:**
    - Mission statement
    - Development by Ars Technology
    - Commitment to user experience
    - Contact information: ars.tech.app@gmail.com
  - **Three Value Cards:**
    1. **Our Mission** - Make QR code generation accessible, powerful, and beautiful
    2. **Our Team** - Passionate developers and designers
    3. **Our Values** - Privacy, security, and user experience focus
- **Footer:** Same as home page

---

## Contact Page (`/contact`)

### Content Structure:
- **Header:** Same as home page
- **Main Content:**
  - Page title: "Get In Touch"
  - Subtitle: "Have questions? We'd love to hear from you."
  - **Contact Information Cards:**
    1. **Email** - ars.tech.app@gmail.com (clickable mailto link)
    2. **Support** - Available 24/7
    3. **Location** - Worldwide
  - **Contact Form:**
    - Name field
    - Email field
    - Message textarea
    - Submit button (currently non-functional - static site)
- **Footer:** Same as home page

---

## FAQ Page (`/faq`)

### Content Structure:
- **Header:** Same as home page
- **Main Content:**
  - Page title: "Frequently Asked Questions"
  - Subtitle: "Everything you need to know about QR Snap"
  - **FAQ Component** with questions and answers covering:
    - App functionality
    - QR code generation
    - Scanning features
    - Premium features
    - Data privacy
    - Troubleshooting
- **Footer:** Same as home page

---

## Privacy Policy Page (`/privacy`)

### Content Structure:
- **Header:** Same as home page
- **Main Content:**
  - Page title: "Privacy Policy"
  - Last updated date (auto-generated)
  - **9 Main Sections:**
    1. **Information We Collect**
       - Information you provide (none required)
       - Automatically collected information (device info, anonymous identifiers, ad data, crash logs)
    2. **Advertising**
       - Google AdMob integration
       - Link to Google's Privacy Policy
       - Rewarded ads information
    3. **Subscriptions & Purchases**
       - Basic, Premium, Pro tiers
       - Payment processing via app stores
       - No payment data stored
    4. **Data Storage**
       - Local device storage only
       - Backup/restore functionality
       - No cloud storage (unless added in future)
    5. **Analytics & Diagnostics**
       - Crash logs
       - Error reports
       - Feature usage statistics
       - All anonymized
    6. **Data Security**
       - Encrypted local storage
       - Secure API communication
       - No unnecessary data collection
    7. **Children's Privacy**
       - No data collection from children under 13
    8. **Changes to This Policy**
       - Policy update information
    9. **Contact**
       - Email: ars.tech.app@gmail.com
       - Developer: Ars Technology
- **Footer:** Same as home page

---

## Terms of Service Page (`/terms`)

### Content Structure:
- **Header:** Same as home page
- **Main Content:**
  - Page title: "Terms of Service"
  - Last updated date (auto-generated)
  - **9 Main Sections:**
    1. **Use of the App**
       - Personal and commercial use allowed
       - Prohibited activities
    2. **Features & Availability**
       - Feature variations based on usage tier
       - Right to modify features
    3. **Purchases & Subscriptions**
       - App store handling
       - Price changes
       - Auto-renewal
       - Purchase restoration
    4. **Ads & Rewarded Access**
       - Free user ads
       - Optional rewarded ads
       - Temporary premium access
       - Abuse prevention
    5. **Disclaimer**
       - "As is" service
       - No warranties
    6. **Limitation of Liability**
       - Data loss disclaimers
       - Third-party services
    7. **Termination**
       - Right to restrict access
    8. **Changes to Terms**
       - Periodic updates
       - Continued use acceptance
    9. **Contact**
       - Email: ars.tech.app@gmail.com
       - Developer: Ars Technology
- **Footer:** Same as home page

---

## QR Code Generator Feature

### Location: Home page (embedded)

### Component: `QRGenerator`

### Features:
- **12 QR Code Types:**
  1. URL
  2. Text
  3. Email (with subject and body)
  4. Phone
  5. SMS (with message)
  6. WiFi (SSID, password, security type)
  7. Contact Card (vCard - name, organization, phone, email, URL, address)
  8. Event (Calendar - title, dates, location, description)
  9. Location (GPS coordinates with altitude)
  10. Social Media (Facebook, Twitter, Instagram, LinkedIn, YouTube, TikTok, Custom)
  11. Barcode (EAN13, EAN8, UPC, CODE128, CODE39, ITF14, MSI, Pharmacode)
  12. Custom Data

### Customization Options:
- **Colors:**
  - Foreground color
  - Background color
- **Error Correction Level:** L, M, Q, H
- **Margin:** Adjustable
- **Width:** Customizable size
- **Logo:** Upload and embed logo in QR code center

### Map Picker:
- Interactive map for location selection
- Supports both location and event QR codes
- Uses Leaflet/React Leaflet

### Preview & Download:
- Real-time QR code preview
- Download as PNG
- Download as SVG
- Logo embedding (client-side)

### Technical Implementation:
- **Client-side generation** using `qrcode` library
- No backend required
- All processing happens in the browser
- Logo embedding using Canvas API

---

## Phone Mockup Carousel

### Component: `PhoneMockup`

### Features:
- **28 App Screenshots** displayed in carousel
- **Auto-play:** Changes every 3 seconds
- **Navigation:**
  - Left/Right arrow buttons
  - Dot indicators at bottom
  - Click dots to jump to specific screenshot
- **File Support:** Both .jpg and .png formats
- **Location:** `/public/images/screenshots/`
- **Naming:** `screenshot-01.jpg` through `screenshot-28.png`
- **Design:**
  - Realistic phone frame
  - Status bar with time (9:41)
  - Notch design
  - Smooth transitions

---

## Components Architecture

### Marketing Components (`/components/marketing/`)
- `Header.tsx` - Navigation header
- `Footer.tsx` - Site footer
- `Hero.tsx` - Hero section variant
- `HeroNew.tsx` - Alternative hero section
- `PhoneMockup.tsx` - App screenshot carousel
- `FAQ.tsx` - FAQ component
- `Features.tsx` - Features display
- `FeaturesNew.tsx` - Alternative features display
- `FinalCTA.tsx` - Final call-to-action
- `DownloadSection.tsx` - Download section
- `PricingPreview.tsx` - Pricing preview
- `LiveDemo.tsx` - Live demo section
- `HowItWorks.tsx` - How it works section
- `Roadmap.tsx` - Roadmap component

### Section Components (`/components/sections/`)
- `HeroSection.tsx` - Main hero with phone mockup
- `DownloadBar.tsx` - App download bar
- `ScanningFeatures.tsx` - Scanning features showcase
- `QRTypesGrid.tsx` - QR code types grid
- `SecuritySection.tsx` - Security features
- `HistorySection.tsx` - History features
- `ExportSection.tsx` - Export/backup features
- `PremiumTiers.tsx` - Subscription tiers
- `DesignSystem.tsx` - Design system showcase
- `TechSpecs.tsx` - Technical specifications
- `ComingSoon.tsx` - Coming soon features

### QR Components (`/components/qr/`)
- `QRGenerator.tsx` - Main QR code generator
- `QRPreview.tsx` - QR code preview and download
- `QRCustomizer.tsx` - Customization controls
- `MapPicker.tsx` - Interactive map for location selection

### UI Components (`/components/ui/`)
- `AnimatedLogo.tsx` - Animated QR Snap logo
- `button.tsx` - Button component
- `card.tsx` - Card component
- `input.tsx` - Input field
- `textarea.tsx` - Textarea component
- `select.tsx` - Select dropdown
- `checkbox.tsx` - Checkbox component
- `label.tsx` - Label component
- `dialog.tsx` - Dialog/modal component
- `badge.tsx` - Badge component
- `theme-toggle.tsx` - Dark/light mode toggle
- `fade-in.tsx` - Fade-in animation wrapper
- `slide-in.tsx` - Slide-in animation wrapper
- `page-wrapper.tsx` - Page transition wrapper
- `page-transition.tsx` - Page transition component

---

## Design System

### Theme Support:
- **Light Mode** - Default theme
- **Dark Mode** - Full dark theme support
- **System Preference** - Auto-detects user preference
- **Theme Toggle** - Available in header

### Color Scheme:
- Primary colors
- Info colors
- Muted colors
- Background/foreground colors
- Gradient support

### Typography:
- **Font:** Geist Sans (primary)
- **Mono Font:** Geist Mono
- Responsive font sizes
- Proper heading hierarchy

### Animations:
- **Framer Motion** for all animations
- Smooth transitions
- Parallax scrolling effects
- Hover effects
- Scroll-triggered animations
- Page transitions

### Responsive Design:
- **Mobile-first** approach
- Breakpoints: sm, md, lg, xl
- Mobile hamburger menu
- Responsive grid layouts
- Touch-friendly interactions

---

## Static Assets

### Images:
- **Logo:** `/public/images/logo.png`
- **Screenshots:** `/public/images/screenshots/` (28 files)
  - `screenshot-01.jpg` through `screenshot-28.png`
- **Icons:** `/public/icons/` (directory)
- **SVG Files:** Various SVG icons and graphics

---

## Technical Details

### Framework & Libraries:
- **Next.js 16.0.3** - React framework
- **React 19.2.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **Framer Motion 12.23.24** - Animations
- **QRCode 1.5.4** - QR code generation
- **Leaflet 1.9.4** - Map functionality
- **React Leaflet 5.0.0** - React map components
- **Lucide React** - Icon library
- **Radix UI** - Accessible UI primitives
- **Next Themes** - Theme management

### Build Configuration:
- **Output:** Static export ready
- **No Backend:** Fully client-side
- **No Database:** No data persistence
- **No API Routes:** All removed for static hosting

### Browser Support:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers supported
- Responsive design for all screen sizes

---

## Deployment

### Static Site Ready:
- No server required
- Can be deployed to:
  - GitHub Pages
  - Netlify
  - Vercel (static)
  - Any static hosting service

### Build Command:
```bash
npm run build
```

### Development Server:
```bash
npm run dev
```

---

## Company Information

### Developer:
**Ars Technology**

### Contact:
**Email:** ars.tech.app@gmail.com

### Attribution:
- All pages include "Created by Ars Technology"
- Footer includes company name and email
- About page features company information
- Privacy and Terms pages include developer attribution

---

## Content Summary

### Total Pages: 12
### Total Sections on Homepage: 14
### QR Code Types Supported: 12
### App Screenshots: 28
### Premium Tiers: 3 (Basic, Premium, Pro)
### FAQ Items: Multiple questions and answers
### Features Highlighted: 6 main features

---

## Key Features

1. **Fully Static** - No backend required
2. **Client-Side QR Generation** - Works entirely in browser
3. **Responsive Design** - Mobile, tablet, desktop
4. **Dark Mode Support** - Full theme switching
5. **Smooth Animations** - Framer Motion throughout
6. **Accessible** - ARIA labels and semantic HTML
7. **SEO Friendly** - Proper meta tags and structure
8. **Fast Loading** - Optimized static assets
9. **Modern UI** - Clean, professional design
10. **Interactive Elements** - Maps, forms, carousels

---

## Future Enhancements (Potential)

- Blog functionality
- Contact form backend integration
- Analytics integration
- More interactive demos
- Video content
- Testimonials section
- Case studies
- Integration with app store APIs

---

## File Structure

```
qrsnap_website/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── features/          # Features page
│   ├── faq/               # FAQ page
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   └── [other pages]      # Additional pages
├── components/            # React components
│   ├── marketing/         # Marketing components
│   ├── sections/          # Section components
│   ├── qr/                # QR code components
│   └── ui/                # UI primitives
├── lib/                   # Utility libraries
│   ├── qr/                # QR code generation
│   └── utils.ts           # Helper functions
├── public/                # Static assets
│   └── images/            # Images and screenshots
├── types/                 # TypeScript types
└── package.json           # Dependencies
```

---

## Notes

- All backend code has been removed for static hosting
- QR code generation is 100% client-side
- No user authentication required
- No data storage or persistence
- All content is static and pre-rendered
- Contact form is display-only (no backend)
- Privacy policy and Terms are comprehensive and Google-compliant

---

**Last Updated:** January 2026  
**Version:** 0.1.0  
**Status:** Production Ready for Static Hosting
