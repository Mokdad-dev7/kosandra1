import { faqs } from '@/lib/faqs'
import {
  CONTACT_EMAIL,
  PLAY_URL,
  PUBLISHER,
  SITE_NAME,
  SITE_URL,
} from '@/lib/site'
import { schemaScreenshotUrls } from '@/lib/screenshots'

const orgId = `${SITE_URL}/#organization`
const appId = `${SITE_URL}/#app`
const websiteId = `${SITE_URL}/#website`

const featureList = [
  'Live camera QR and barcode scan',
  'Scan from gallery images',
  'Camera batch scan (free) and gallery batch scan (Lifetime Unlock)',
  'QR and barcode generation (13 types)',
  'Share to QR Snap: turn shared links, text, contacts and events into QR codes',
  'Home screen widgets: Quick actions and Pinned QR',
  'Link safety checks for phishing and known-bad URLs (Google Web Risk and pattern checks)',
  'Unlimited email domain (MX) validation',
  'History, favorites, folders, and smart filters',
  'Export CSV, JSON, image ZIP, and parsed text',
  'Local backup and restore',
  'Share to other apps',
  'Point of Sale: inventory, scan-to-cart, sales history, receipts',
  'Flexible pricing: Free, Lifetime Unlock, URL credit packs',
]

const offers = [
  {
    '@type': 'Offer',
    name: 'Free',
    price: '0',
    priceCurrency: 'USD',
    description:
      'Scan, generate, history, 1 URL safety check per day (+2 per rewarded ad), unlimited email checks, one Pinned QR widget. Ads on Free.',
  },
  {
    '@type': 'Offer',
    name: 'Lifetime Unlock',
    price: '9.99',
    priceCurrency: 'USD',
    description:
      'One-time purchase: no ads, 2 URL safety checks per day (+2 per rewarded ad), gallery batch scan, backup, restore, export, share, Point of Sale, unlimited Pinned QR widgets',
  },
  {
    '@type': 'Offer',
    name: 'Starter Pack',
    price: '0.99',
    priceCurrency: 'USD',
    description: '+50 URL safety checks, never expire on that install',
  },
  {
    '@type': 'Offer',
    name: 'Standard Pack',
    price: '2.99',
    priceCurrency: 'USD',
    description: '+150 URL safety checks, never expire on that install',
  },
  {
    '@type': 'Offer',
    name: 'Value Pack',
    price: '4.99',
    priceCurrency: 'USD',
    description: '+400 URL safety checks, never expire on that install',
  },
]

export const organizationSchema = {
  '@type': 'Organization',
  '@id': orgId,
  name: PUBLISHER,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/logo.png`,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: CONTACT_EMAIL,
  },
}

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': websiteId,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { '@id': orgId },
}

export const softwareApplicationSchema = {
  '@type': 'SoftwareApplication',
  '@id': appId,
  name: SITE_NAME,
  operatingSystem: 'Android',
  applicationCategory: 'UtilitiesApplication',
  offers,
  screenshot: schemaScreenshotUrls.map((path) => `${SITE_URL}${path}`),
  description:
    'QR and barcode scanner for Android. Scan from camera or gallery, create 13 code types, check links before you open them, share to QR Snap from any app, pin codes to your home screen, export and backup, and run Point of Sale. Free plus Lifetime Unlock and URL packs.',
  downloadUrl: PLAY_URL,
  installUrl: PLAY_URL,
  featureList,
  publisher: { '@id': orgId },
  author: { '@id': orgId },
}

export const homepageGraph = {
  '@context': 'https://schema.org',
  '@graph': [organizationSchema, websiteSchema, softwareApplicationSchema],
}

export const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export const pricingPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'QR Snap Pricing',
  url: `${SITE_URL}/pricing`,
  description:
    'QR Snap pricing: Free for scan and generate, Lifetime Unlock for gallery batch, backup, export, share, and Point of Sale, plus URL credit packs.',
  mainEntity: {
    '@type': 'SoftwareApplication',
    '@id': appId,
    name: SITE_NAME,
    offers,
  },
}

export const howToScanSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to scan a QR code with QR Snap',
  description:
    'Scan a QR code or barcode with the camera or from a gallery image, then use the result, including a URL safety check when the code is a link.',
  totalTime: 'PT1M',
  tool: {
    '@type': 'HowToTool',
    name: 'QR Snap app',
  },
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Open QR Snap',
      text: 'Launch QR Snap on Android and open Scan.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Point the camera or pick a gallery image',
      text: 'Point the camera at the code, or choose an image from the gallery. Camera batch is free. Gallery batch needs Lifetime Unlock.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Read the result',
      text: 'QR Snap shows the type and content: URL, contact, Wi-Fi, product barcode, or other data. Use call, SMS, email, save contact, add event, maps, copy, or share as available.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Check a URL before you open it',
      text: 'For links, wait for the URL safety check (Google Web Risk plus pattern checks). Open only when you accept the safe, risk, or unavailable status.',
    },
  ],
}

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.path === '/' ? SITE_URL : `${SITE_URL}${item.path}`,
  })),
})
