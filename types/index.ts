export type QRCodeType = 
  | 'url' 
  | 'text' 
  | 'email' 
  | 'phone' 
  | 'sms' 
  | 'wifi' 
  | 'vcard'
  | 'event'
  | 'location'
  | 'social'
  | 'barcode'
  | 'custom'

export interface QRCodeData {
  url?: string
  text?: string
  email?: {
    to: string
    subject?: string
    body?: string
  }
  phone?: string
  sms?: {
    number: string
    message?: string
  }
  wifi?: {
    ssid: string
    password: string
    security: 'WPA' | 'WEP' | 'nopass'
    hidden?: boolean
  }
  vcard?: {
    firstName: string
    lastName: string
    organization?: string
    phone?: string
    email?: string
    url?: string
    address?: string
  }
  event?: {
    title: string
    description?: string
    location?: string
    startDate: string
    endDate?: string
    allDay?: boolean
  }
  location?: {
    latitude: number
    longitude: number
    altitude?: number
    query?: string
  }
  social?: {
    platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok' | 'custom'
    url: string
    username?: string
  }
  barcode?: {
    type: 'EAN13' | 'EAN8' | 'UPC' | 'CODE128' | 'CODE39' | 'ITF14' | 'MSI' | 'pharmacode'
    value: string
  }
  custom?: {
    data: string
    format?: string
  }
}

export interface QRCodeCustomizations {
  foregroundColor?: string
  backgroundColor?: string
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
  margin?: number
  width?: number
  logo?: {
    url: string
    width?: number
    height?: number
    margin?: number
  }
}

export interface GenerateQROptions {
  type: QRCodeType
  data: QRCodeData
  customizations?: QRCodeCustomizations
}

