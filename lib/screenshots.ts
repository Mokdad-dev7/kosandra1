export type AppShot = {
  src: string
  alt: string
  caption?: string
  width: number
  height: number
}

const PHONE = { width: 720, height: 1560 } as const

export const shots = {
  liveCameraScan: {
    ...PHONE,
    src: '/images/screenshots/live-camera-scan.webp',
    alt: 'QR Snap live camera scan with a QR code in the viewfinder',
    caption: 'Live camera scan',
  },
  chooseScanMethod: {
    ...PHONE,
    src: '/images/screenshots/choose-scan-method.webp',
    alt: 'QR Snap Choose Scan Method with Camera and Gallery',
    caption: 'Camera or gallery',
  },
  batchScanCamera: {
    ...PHONE,
    src: '/images/screenshots/batch-scan-from-camera.webp',
    alt: 'QR Snap Camera Batch Scanner',
    caption: 'Camera batch',
  },
  batchScanGallery: {
    ...PHONE,
    src: '/images/screenshots/batch-scan-from-gallery.webp',
    alt: 'QR Snap Gallery Batch Scanner',
    caption: 'Gallery batch',
  },
  urlSafetyResult: {
    ...PHONE,
    src: '/images/screenshots/result-screen-url-safety-check.webp',
    alt: 'QR Snap scan result with URL safety check',
    caption: 'URL safety check',
  },
  generateUrl: {
    ...PHONE,
    src: '/images/screenshots/generate-url.webp',
    alt: 'QR Snap generate a URL QR code',
    caption: 'Generate a URL',
  },
  qrcodePreview: {
    ...PHONE,
    src: '/images/screenshots/qrcode-preview.webp',
    alt: 'QR Snap QR code preview with edit, icon, and export',
    caption: 'QR preview',
  },
  addCustomIcon: {
    ...PHONE,
    src: '/images/screenshots/add-custom-icon.webp',
    alt: 'QR Snap Add Icon with predefined social logos',
    caption: 'Add an icon',
  },
  exportSingleQr: {
    ...PHONE,
    src: '/images/screenshots/export-single-qr-in-preview.webp',
    alt: 'QR Snap export a single QR code from preview',
    caption: 'Export one code',
  },
  scanHistory: {
    ...PHONE,
    src: '/images/screenshots/scan-history.webp',
    alt: 'QR Snap scan history with smart filters',
    caption: 'Scan history',
  },
  createdCodes: {
    ...PHONE,
    src: '/images/screenshots/created-codes.webp',
    alt: 'QR Snap Created tab of generated codes',
    caption: 'Created codes',
  },
  backupFormats: {
    ...PHONE,
    src: '/images/screenshots/backup-formats.webp',
    alt: 'QR Snap Choose Backup Format: JSON, Complete, CSV, Mixed',
    caption: 'Backup formats',
  },
  backupStatistics: {
    ...PHONE,
    src: '/images/screenshots/backup-statistics.webp',
    alt: 'QR Snap Backup Statistics',
    caption: 'Backup stats',
  },
  exportFormatsBulk: {
    ...PHONE,
    src: '/images/screenshots/export-formats-in-bulk.webp',
    alt: 'QR Snap bulk export formats',
    caption: 'Bulk export',
  },
  settings: {
    ...PHONE,
    src: '/images/screenshots/settings.webp',
    alt: 'QR Snap Settings with Lifetime Unlock, theme, POS, and backup',
    caption: 'Settings',
  },
  posPortal: {
    ...PHONE,
    src: '/images/screenshots/point-of-sale-portal.webp',
    alt: 'QR Snap Point of Sale portal',
    caption: 'POS portal',
  },
  posNewSale: {
    ...PHONE,
    src: '/images/screenshots/pos-new-sale.webp',
    alt: 'QR Snap New Sale checkout',
    caption: 'New sale',
  },
  posNewProduct: {
    ...PHONE,
    src: '/images/screenshots/pos-new-product.webp',
    alt: 'QR Snap New Product form, add one item or import a file',
    caption: 'Add a product',
  },
  posShopSettings: {
    ...PHONE,
    src: '/images/screenshots/pos-shop-settings.webp',
    alt: 'QR Snap Shop Settings with currency, tax, and receipt footer',
    caption: 'Shop settings',
  },
  pricingPlans: {
    ...PHONE,
    src: '/images/screenshots/pricing-plans.webp',
    alt: 'QR Snap Plans with Lifetime Unlock and URL credit packs',
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
  shots.liveCameraScan,
  shots.chooseScanMethod,
  shots.urlSafetyResult,
  shots.generateUrl,
  shots.scanHistory,
  shots.batchScanGallery,
  shots.backupFormats,
  shots.posPortal,
  shots.pricingPlans,
]

export const schemaScreenshotUrls = [
  shots.liveCameraScan.src,
  shots.urlSafetyResult.src,
  shots.generateUrl.src,
  shots.scanHistory.src,
  shots.batchScanGallery.src,
  shots.backupFormats.src,
  shots.posPortal.src,
  shots.pricingPlans.src,
]
