import { z } from 'zod'
import { URL } from 'url'

// Password validation schema
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

// Email validation schema
export const emailSchema = z.string().email('Invalid email address').toLowerCase().trim()

// URL validation with security checks
export function validateUrl(urlString: string, allowedProtocols: string[] = ['http:', 'https:']): boolean {
  try {
    const url = new URL(urlString)

    // Check protocol
    if (!allowedProtocols.includes(url.protocol)) {
      return false
    }

    // Prevent dangerous protocols (unless explicitly allowed in allowedProtocols)
    // This allows callers to explicitly permit protocols like 'data:' when needed
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:']
    if (dangerousProtocols.includes(url.protocol.toLowerCase()) && !allowedProtocols.includes(url.protocol)) {
      return false
    }

    // Prevent localhost/private IPs (unless explicitly allowed)
    const hostname = url.hostname.toLowerCase()
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('172.16.') ||
      hostname.startsWith('172.17.') ||
      hostname.startsWith('172.18.') ||
      hostname.startsWith('172.19.') ||
      hostname.startsWith('172.20.') ||
      hostname.startsWith('172.21.') ||
      hostname.startsWith('172.22.') ||
      hostname.startsWith('172.23.') ||
      hostname.startsWith('172.24.') ||
      hostname.startsWith('172.25.') ||
      hostname.startsWith('172.26.') ||
      hostname.startsWith('172.27.') ||
      hostname.startsWith('172.28.') ||
      hostname.startsWith('172.29.') ||
      hostname.startsWith('172.30.') ||
      hostname.startsWith('172.31.')
    ) {
      return false // Block private IPs for security
    }

    return true
  } catch {
    return false
  }
}

// Sanitize string input
export function sanitizeString(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') {
    return ''
  }

  // Remove null bytes
  let sanitized = input.replace(/\0/g, '')

  // Trim and limit length
  sanitized = sanitized.trim().slice(0, maxLength)

  // Remove control characters except newlines and tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')

  return sanitized
}

// Validate and sanitize QR code data
export function validateQRData(type: string, data: any): { valid: boolean; sanitized?: any; error?: string } {
  try {
    switch (type) {
      case 'url':
        if (!data.url || typeof data.url !== 'string') {
          return { valid: false, error: 'URL is required' }
        }
        const sanitizedUrl = sanitizeString(data.url, 2048)
        if (!validateUrl(sanitizedUrl)) {
          return { valid: false, error: 'Invalid or unsafe URL' }
        }
        return { valid: true, sanitized: { url: sanitizedUrl } }

      case 'text':
        if (!data.text || typeof data.text !== 'string') {
          return { valid: false, error: 'Text is required' }
        }
        return { valid: true, sanitized: { text: sanitizeString(data.text, 2000) } }

      case 'email':
        if (!data.email?.to || typeof data.email.to !== 'string') {
          return { valid: false, error: 'Email address is required' }
        }
        const emailResult = emailSchema.safeParse(data.email.to)
        if (!emailResult.success) {
          return { valid: false, error: 'Invalid email address' }
        }
        return {
          valid: true,
          sanitized: {
            email: {
              to: emailResult.data,
              subject: data.email.subject ? sanitizeString(data.email.subject, 200) : undefined,
              body: data.email.body ? sanitizeString(data.email.body, 1000) : undefined,
            },
          },
        }

      case 'phone':
        if (!data.phone || typeof data.phone !== 'string') {
          return { valid: false, error: 'Phone number is required' }
        }
        const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/
        const sanitizedPhone = sanitizeString(data.phone, 20)
        if (!phoneRegex.test(sanitizedPhone)) {
          return { valid: false, error: 'Invalid phone number format' }
        }
        return { valid: true, sanitized: { phone: sanitizedPhone } }

      case 'sms':
        if (!data.sms?.number || typeof data.sms.number !== 'string') {
          return { valid: false, error: 'SMS number is required' }
        }
        const smsPhoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/
        const sanitizedSmsNumber = sanitizeString(data.sms.number, 20)
        if (!smsPhoneRegex.test(sanitizedSmsNumber)) {
          return { valid: false, error: 'Invalid SMS number format' }
        }
        return {
          valid: true,
          sanitized: {
            sms: {
              number: sanitizedSmsNumber,
              message: data.sms.message ? sanitizeString(data.sms.message, 500) : undefined,
            },
          },
        }

      case 'wifi':
        if (!data.wifi?.ssid || typeof data.wifi.ssid !== 'string') {
          return { valid: false, error: 'WiFi SSID is required' }
        }
        const validSecurity = ['WPA', 'WEP', 'nopass'].includes(data.wifi.security)
        return {
          valid: true,
          sanitized: {
            wifi: {
              ssid: sanitizeString(data.wifi.ssid, 32),
              password: data.wifi.password ? sanitizeString(data.wifi.password, 64) : '',
              security: validSecurity ? data.wifi.security : 'WPA',
              hidden: Boolean(data.wifi.hidden),
            },
          },
        }

      case 'vcard':
        if (!data.vcard?.firstName || !data.vcard?.lastName) {
          return { valid: false, error: 'First name and last name are required' }
        }
        return {
          valid: true,
          sanitized: {
            vcard: {
              firstName: sanitizeString(data.vcard.firstName, 50),
              lastName: sanitizeString(data.vcard.lastName, 50),
              organization: data.vcard.organization ? sanitizeString(data.vcard.organization, 100) : undefined,
              phone: data.vcard.phone ? sanitizeString(data.vcard.phone, 20) : undefined,
              email: data.vcard.email ? emailSchema.parse(data.vcard.email) : undefined,
              url: data.vcard.url ? (validateUrl(data.vcard.url) ? sanitizeString(data.vcard.url, 500) : undefined) : undefined,
              address: data.vcard.address ? sanitizeString(data.vcard.address, 200) : undefined,
            },
          },
        }

      case 'event':
        if (!data.event?.title || !data.event?.startDate) {
          return { valid: false, error: 'Event title and start date are required' }
        }
        return {
          valid: true,
          sanitized: {
            event: {
              title: sanitizeString(data.event.title, 200),
              startDate: sanitizeString(data.event.startDate, 50),
              endDate: data.event.endDate ? sanitizeString(data.event.endDate, 50) : undefined,
              location: data.event.location ? sanitizeString(data.event.location, 200) : undefined,
              description: data.event.description ? sanitizeString(data.event.description, 1000) : undefined,
              allDay: Boolean(data.event.allDay),
            },
          },
        }

      case 'location':
        if (typeof data.location?.latitude !== 'number' || typeof data.location?.longitude !== 'number') {
          return { valid: false, error: 'Latitude and longitude are required' }
        }
        if (data.location.latitude < -90 || data.location.latitude > 90) {
          return { valid: false, error: 'Latitude must be between -90 and 90' }
        }
        if (data.location.longitude < -180 || data.location.longitude > 180) {
          return { valid: false, error: 'Longitude must be between -180 and 180' }
        }
        return {
          valid: true,
          sanitized: {
            location: {
              latitude: data.location.latitude,
              longitude: data.location.longitude,
              altitude: typeof data.location.altitude === 'number' ? data.location.altitude : undefined,
              query: data.location.query ? sanitizeString(data.location.query, 200) : undefined,
            },
          },
        }

      case 'social':
        if (!data.social?.url || typeof data.social.url !== 'string') {
          return { valid: false, error: 'Social media URL is required' }
        }
        const socialUrl = sanitizeString(data.social.url, 500)
        if (!validateUrl(socialUrl)) {
          return { valid: false, error: 'Invalid social media URL' }
        }
        return {
          valid: true,
          sanitized: {
            social: {
              platform: data.social.platform || 'custom',
              url: socialUrl,
              username: data.social.username ? sanitizeString(data.social.username, 100) : undefined,
            },
          },
        }

      case 'barcode':
        if (!data.barcode?.value || typeof data.barcode.value !== 'string') {
          return { valid: false, error: 'Barcode value is required' }
        }
        const barcodeValue = sanitizeString(data.barcode.value, 100)
        if (!barcodeValue) {
          return { valid: false, error: 'Barcode value cannot be empty' }
        }
        return {
          valid: true,
          sanitized: {
            barcode: {
              type: data.barcode.type || 'EAN13',
              value: barcodeValue,
            },
          },
        }

      case 'custom':
        if (!data.custom?.data || typeof data.custom.data !== 'string') {
          return { valid: false, error: 'Custom data is required' }
        }
        return {
          valid: true,
          sanitized: {
            custom: {
              data: sanitizeString(data.custom.data, 2000),
              format: data.custom.format ? sanitizeString(data.custom.format, 50) : undefined,
            },
          },
        }

      default:
        return { valid: false, error: 'Invalid QR code type' }
    }
  } catch (error) {
    return { valid: false, error: 'Validation error: ' + (error instanceof Error ? error.message : 'Unknown error') }
  }
}

// Validate customizations
export function validateCustomizations(customizations: any): { valid: boolean; sanitized?: any; error?: string } {
  if (!customizations || typeof customizations !== 'object') {
    return { valid: true, sanitized: {} }
  }

  const sanitized: any = {}

  // Validate colors (hex format)
  if (customizations.foregroundColor) {
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    if (colorRegex.test(customizations.foregroundColor)) {
      sanitized.foregroundColor = customizations.foregroundColor
    }
  }

  if (customizations.backgroundColor) {
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    if (colorRegex.test(customizations.backgroundColor)) {
      sanitized.backgroundColor = customizations.backgroundColor
    }
  }

  // Validate error correction level
  if (customizations.errorCorrectionLevel) {
    const validLevels = ['L', 'M', 'Q', 'H']
    if (validLevels.includes(customizations.errorCorrectionLevel)) {
      sanitized.errorCorrectionLevel = customizations.errorCorrectionLevel
    }
  }

  // Validate width (100-1000)
  if (customizations.width) {
    const width = parseInt(customizations.width)
    if (!isNaN(width) && width >= 100 && width <= 1000) {
      sanitized.width = width
    }
  }

  // Validate margin (0-10)
  if (customizations.margin !== undefined) {
    const margin = parseInt(customizations.margin)
    if (!isNaN(margin) && margin >= 0 && margin <= 10) {
      sanitized.margin = margin
    }
  }

  return { valid: true, sanitized }
}

