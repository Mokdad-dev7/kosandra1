export const SITE_URL = 'https://qrsnap.app'
export const SITE_NAME = 'QR Snap'
export const PUBLISHER = 'Ars Technology'
export const CONTACT_EMAIL = 'ars.tech.app@gmail.com'
export const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.ars.qr_snap'
export const PACKAGE_ID = 'com.ars.qr_snap'

export const DEFAULT_TITLE = 'QR Snap | Scan, Create, Check Links, Widgets & POS'
export const DEFAULT_DESCRIPTION =
  'QR and barcode scanner for Android. Scan from camera or gallery, create 13 code types, check links before you open them, share to QR Snap from any app, pin codes to your home screen, and run Point of Sale. Free plus Lifetime Unlock and URL packs.'

export function pageTitle(title: string) {
  return `${title} | QR Snap`
}

export function canonical(path: string) {
  if (path === '/') return SITE_URL
  return `${SITE_URL}${path}`
}
