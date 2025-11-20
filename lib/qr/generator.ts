import QRCode from 'qrcode'
import type { GenerateQROptions, QRCodeData, QRCodeType } from '@/types'

function formatQRData(type: QRCodeType, data: QRCodeData): string {
  switch (type) {
    case 'url':
      return data.url || ''
    
    case 'text':
      return data.text || ''
    
    case 'email':
      if (!data.email?.to) return ''
      const emailParams = new URLSearchParams()
      emailParams.set('to', data.email.to)
      if (data.email.subject) emailParams.set('subject', data.email.subject)
      if (data.email.body) emailParams.set('body', data.email.body)
      return `mailto:${data.email.to}?${emailParams.toString()}`
    
    case 'phone':
      return `tel:${data.phone || ''}`
    
    case 'sms':
      if (!data.sms?.number) return ''
      const smsParams = new URLSearchParams()
      if (data.sms.message) smsParams.set('body', data.sms.message)
      return `sms:${data.sms.number}${smsParams.toString() ? '?' + smsParams.toString() : ''}`
    
    case 'wifi':
      if (!data.wifi) return ''
      const wifiString = `WIFI:T:${data.wifi.security};S:${data.wifi.ssid};P:${data.wifi.password || ''};${data.wifi.hidden ? 'H:true;' : ''};`
      return wifiString
    
    case 'vcard':
      if (!data.vcard) return ''
      const vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${data.vcard.firstName} ${data.vcard.lastName}`,
        `N:${data.vcard.lastName};${data.vcard.firstName};;;`,
      ]
      if (data.vcard.organization) vcard.push(`ORG:${data.vcard.organization}`)
      if (data.vcard.phone) vcard.push(`TEL:${data.vcard.phone}`)
      if (data.vcard.email) vcard.push(`EMAIL:${data.vcard.email}`)
      if (data.vcard.url) vcard.push(`URL:${data.vcard.url}`)
      if (data.vcard.address) vcard.push(`ADR:;;${data.vcard.address};;;`)
      vcard.push('END:VCARD')
      return vcard.join('\n')
    
    case 'event':
      if (!data.event) return ''
      const { event } = data
      const eventLines = [
        'BEGIN:VEVENT',
        `SUMMARY:${event.title}`,
        `DTSTART:${event.startDate.replace(/[-:]/g, '').replace(' ', 'T')}`,
      ]
      if (event.endDate) {
        eventLines.push(`DTEND:${event.endDate.replace(/[-:]/g, '').replace(' ', 'T')}`)
      }
      if (event.location) {
        eventLines.push(`LOCATION:${event.location}`)
      }
      if (event.description) {
        eventLines.push(`DESCRIPTION:${event.description}`)
      }
      eventLines.push('END:VEVENT')
      return eventLines.join('\n')
    
    case 'location':
      if (!data.location) return ''
      const { location } = data
      return `geo:${location.latitude},${location.longitude}${location.altitude ? `,${location.altitude}` : ''}`
    
    case 'social':
      if (!data.social) return ''
      const { social } = data
      if (social.platform === 'custom') {
        return social.url
      }
      // Return the URL directly - most social platforms use standard URLs
      return social.url
    
    case 'barcode':
      // Barcodes are different from QR codes - for now, return the value as text
      // In a full implementation, you'd use a barcode library
      if (!data.barcode) return ''
      return data.barcode.value
    
    case 'custom':
      if (!data.custom) return ''
      return data.custom.data
    
    default:
      return ''
  }
}

export async function generateQRCode(options: GenerateQROptions): Promise<string> {
  const { type, data, customizations } = options
  
  const qrData = formatQRData(type, data)
  
  if (!qrData) {
    throw new Error('Invalid QR code data')
  }
  
  // Use higher error correction when logo is present (for better logo visibility)
  const errorCorrectionLevel = customizations?.logo 
    ? (customizations.errorCorrectionLevel || 'H') // High error correction for logos
    : (customizations?.errorCorrectionLevel || 'M')
  
  const qrOptions: QRCode.QRCodeToDataURLOptions = {
    errorCorrectionLevel,
    margin: customizations?.margin ?? 4,
    width: customizations?.width ?? 300,
    color: {
      dark: customizations?.foregroundColor || '#000000',
      light: customizations?.backgroundColor || '#FFFFFF',
    },
  }
  
  try {
    const dataUrl = await QRCode.toDataURL(qrData, qrOptions)
    // Logo embedding will be done client-side
    return dataUrl
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw new Error('Failed to generate QR code')
  }
}

export async function generateQRCodeSVG(options: GenerateQROptions): Promise<string> {
  const { type, data, customizations } = options
  
  const qrData = formatQRData(type, data)
  
  if (!qrData) {
    throw new Error('Invalid QR code data')
  }
  
  const qrOptions: QRCode.QRCodeToStringOptions = {
    errorCorrectionLevel: customizations?.errorCorrectionLevel || 'M',
    margin: customizations?.margin ?? 4,
    width: customizations?.width ?? 300,
    color: {
      dark: customizations?.foregroundColor || '#000000',
      light: customizations?.backgroundColor || '#FFFFFF',
    },
    type: 'svg',
  }
  
  try {
    const svg = await QRCode.toString(qrData, qrOptions)
    return svg as string
  } catch (error) {
    console.error('Error generating QR code SVG:', error)
    throw new Error('Failed to generate QR code SVG')
  }
}

