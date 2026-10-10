export const SITE_URL = 'https://qrsnap.app'
export const SITE_NAME = 'QR Snap'
export const PUBLISHER = 'Ars Technology'
export const CONTACT_EMAIL = 'ars.tech.app@gmail.com'
export const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.ars.qr_snap'
export const PACKAGE_ID = 'com.ars.qr_snap'

export const DEFAULT_TITLE = 'QR Snap | QR Code Scanner with Scam Check'
export const DEFAULT_DESCRIPTION =
  'QR code scanner that shows where a link really goes and checks it for scams before you open it: fake parking meter codes, fake delivery notices, phishing. Also creates 13 code types, home screen widgets and Point of Sale. Free on Android.'

export function pageTitle(title: string) {
  return `${title} | QR Snap`
}

export function canonical(path: string) {
  if (path === '/') return SITE_URL
  return `${SITE_URL}${path}`
}
