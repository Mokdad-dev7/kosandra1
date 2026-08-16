export type AppShot = {
  src: string
  alt: string
  caption?: string
  width: number
  height: number
}

const PHONE = { width: 720, height: 1560 } as const

export const shots = {
  scanMethod: {
    ...PHONE,
    src: '/images/screenshots/scan-method.webp',
    alt: 'QR Snap Choose Scan Method screen with Camera and Gallery options',
    caption: 'Camera or gallery',
  },
  scanCamera: {
    ...PHONE,
    src: '/images/screenshots/scan-camera.webp',
    alt: 'QR Snap live camera scan with a QR code in the viewfinder',
    caption: 'Live camera scan',
  },
  qrPreview: {
    ...PHONE,
    src: '/images/screenshots/qr-preview.webp',
    alt: 'QR Snap QR Preview with Edit, Change Icon, and Export',
    caption: 'Preview and export',
  },
  addIcon: {
    ...PHONE,
    src: '/images/screenshots/add-icon.webp',
    alt: 'QR Snap Add Icon dialog with predefined social media logos',
    caption: 'Center icons',
  },
  exportQr: {
    ...PHONE,
    src: '/images/screenshots/export-qr.webp',
    alt: 'QR Snap Export QR Code dialog: PNG, text, and JSON',
    caption: 'PNG, text, JSON',
  },
  qrPreviewDark: {
    ...PHONE,
    src: '/images/screenshots/qr-preview-dark.webp',
    alt: 'QR Snap generated QR code in dark mode',
    caption: 'Dark mode',
  },
  generated: {
    ...PHONE,
    src: '/images/screenshots/generated.webp',
    alt: 'QR Snap Generated list of created QR codes including Wi-Fi and URLs',
    caption: 'Generated codes',
  },
  history: {
    ...PHONE,
    src: '/images/screenshots/history.webp',
    alt: 'QR Snap History of scanned QR codes with filters and search',
    caption: 'Scan history',
  },
  created: {
    ...PHONE,
    src: '/images/screenshots/created.webp',
    alt: 'QR Snap Created tab with export, clear, and swipe actions',
    caption: 'Created codes',
  },
  posNewProduct: {
    ...PHONE,
    src: '/images/screenshots/pos-new-product.webp',
    alt: 'QR Snap New Product form for POS inventory',
    caption: 'Add a product',
  },
  settings: {
    ...PHONE,
    src: '/images/screenshots/settings.webp',
    alt: 'QR Snap Settings with Lifetime Unlock, theme, POS, and backup',
    caption: 'Settings',
  },
  posNewSale: {
    ...PHONE,
    src: '/images/screenshots/pos-new-sale.webp',
    alt: 'QR Snap New Sale checkout with scan, discount, and payment method',
    caption: 'Checkout',
  },
  backupStats: {
    ...PHONE,
    src: '/images/screenshots/backup-stats.webp',
    alt: 'QR Snap Backup Statistics showing scanned and generated counts',
    caption: 'Backup stats',
  },
  backupFormat: {
    ...PHONE,
    src: '/images/screenshots/backup-format.webp',
    alt: 'QR Snap Choose Backup Format: JSON, Complete, CSV, Mixed',
    caption: 'JSON, CSV, Mixed',
  },
  posShopSettings: {
    ...PHONE,
    src: '/images/screenshots/pos-shop-settings.webp',
    alt: 'QR Snap Shop Settings with currency, tax, and receipt footer',
    caption: 'Shop settings',
  },
  batchCamera: {
    ...PHONE,
    src: '/images/screenshots/batch-camera.webp',
    alt: 'QR Snap Camera Batch Scanner start screen',
    caption: 'Camera batch',
  },
  batchGallery: {
    ...PHONE,
    src: '/images/screenshots/batch-gallery.webp',
    alt: 'QR Snap Gallery Batch Scanner for scanning multiple photos',
    caption: 'Gallery batch',
  },
  plans: {
    ...PHONE,
    src: '/images/screenshots/plans.webp',
    alt: 'QR Snap Plans screen with Lifetime Unlock and URL credit packs',
    caption: 'Plans in the app',
  },
  generatedQr: {
    src: '/images/screenshots/generated-qr.webp',
    alt: 'Generated QR Snap website QR code with a link icon in the center',
    caption: 'Branded QR',
    width: 720,
    height: 852,
  },
} as const satisfies Record<string, AppShot>

export const heroShots: AppShot[] = [
  shots.scanCamera,
  shots.scanMethod,
  shots.qrPreview,
  shots.history,
  shots.created,
  shots.batchGallery,
  shots.backupFormat,
  shots.posNewSale,
  shots.plans,
]

export const schemaScreenshotUrls = [
  shots.scanCamera.src,
  shots.qrPreview.src,
  shots.history.src,
  shots.batchGallery.src,
  shots.backupFormat.src,
  shots.posNewSale.src,
  shots.plans.src,
]
