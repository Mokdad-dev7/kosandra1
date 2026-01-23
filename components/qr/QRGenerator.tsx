'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { QRPreview } from './QRPreview'
import { QRCustomizer } from './QRCustomizer'
import { MapPicker } from './MapPicker'
import { embedLogoInQR } from '@/lib/qr/logo-embedder'
import { generateQRCode } from '@/lib/qr/generator'
import type { QRCodeType, QRCodeData, QRCodeCustomizations } from '@/types'
import { MapPin } from 'lucide-react'

export function QRGenerator() {
  const [type, setType] = useState<QRCodeType>('url')
  const [data, setData] = useState<QRCodeData>({ url: '' })
  const [customizations, setCustomizations] = useState<QRCodeCustomizations>({})
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const [qrOptions, setQrOptions] = useState<{ type: QRCodeType; data: QRCodeData } | null>(null)
  const [mapPickerOpen, setMapPickerOpen] = useState(false)

  // Reset data when type changes
  useEffect(() => {
    switch (type) {
      case 'url':
        setData({ url: '' })
        break
      case 'text':
        setData({ text: '' })
        break
      case 'email':
        setData({ email: { to: '' } })
        break
      case 'phone':
        setData({ phone: '' })
        break
      case 'sms':
        setData({ sms: { number: '' } })
        break
      case 'wifi':
        setData({ wifi: { ssid: '', password: '', security: 'WPA' } })
        break
      case 'vcard':
        setData({ vcard: { firstName: '', lastName: '' } })
        break
      case 'event':
        setData({ event: { title: '', startDate: '' } })
        break
      case 'location':
        setData({ location: { latitude: 0, longitude: 0 } })
        break
      case 'social':
        setData({ social: { platform: 'facebook', url: '' } })
        break
      case 'barcode':
        setData({ barcode: { type: 'EAN13', value: '' } })
        break
      case 'custom':
        setData({ custom: { data: '' } })
        break
    }
    setQrDataUrl('')
    setQrOptions(null)
  }, [type])

  // Regenerate QR code when customizations change (if QR code already exists)
  useEffect(() => {
    if (qrDataUrl && qrOptions && Object.keys(customizations).length > 0) {
      // Debounce to avoid too many regenerations
      const timeoutId = setTimeout(async () => {
        try {
          const dataUrl = await generateQRCode({
            type: qrOptions.type,
            data: qrOptions.data,
            customizations
          })
          
          // Embed logo if provided (client-side)
          let finalDataUrl = dataUrl
          if (customizations?.logo?.url) {
            try {
              finalDataUrl = await embedLogoInQR(
                dataUrl,
                customizations.logo.url,
                customizations.logo.width,
                customizations.logo.margin
              )
            } catch (logoError) {
              // Continue with QR code without logo
            }
          }
          setQrDataUrl(finalDataUrl)
        } catch (error) {
          // Silently fail for auto-regeneration
        }
      }, 500)
      return () => clearTimeout(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customizations, qrDataUrl, qrOptions])

  const handleGenerate = async () => {
    try {
      // Validate that we have the required data for the selected type
      if (!data || Object.keys(data).length === 0) {
        alert('Please fill in the required fields')
        return
      }

      // Generate QR code client-side
      const dataUrl = await generateQRCode({
        type,
        data,
        customizations
      })

      // Embed logo if provided (client-side)
      let finalDataUrl = dataUrl
      if (customizations?.logo?.url) {
        try {
          finalDataUrl = await embedLogoInQR(
            dataUrl,
            customizations.logo.url,
            customizations.logo.width,
            customizations.logo.margin
          )
        } catch (logoError) {
          console.warn('Failed to embed logo:', logoError)
          // Continue with QR code without logo
        }
      }

      setQrDataUrl(finalDataUrl)
      setQrOptions({ type, data })
    } catch (error) {
      console.error('Error generating QR code:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate QR code. Please try again.'
      alert(errorMessage)
    }
  }


  const handleMapSelect = (location: { latitude: number; longitude: number; address?: string }) => {
    if (type === 'location') {
      setData({
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          query: location.address,
        },
      })
    } else if (type === 'event') {
      setData({
        event: {
          title: data.event?.title || '',
          startDate: data.event?.startDate || '',
          ...data.event,
          location: location.address || `${location.latitude}, ${location.longitude}`,
        },
      })
    }
  }

  const renderInputFields = () => {
    switch (type) {
      case 'url':
        return (
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={data.url || ''}
              onChange={(e) => setData({ url: e.target.value })}
            />
          </div>
        )

      case 'text':
        return (
          <div className="space-y-2">
            <Label htmlFor="text">Text</Label>
            <Textarea
              id="text"
              placeholder="Enter your text here..."
              value={data.text || ''}
              onChange={(e) => setData({ text: e.target.value })}
              rows={4}
            />
          </div>
        )

      case 'email':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-to">Email Address</Label>
              <Input
                id="email-to"
                type="email"
                placeholder="recipient@example.com"
                value={data.email?.to || ''}
                onChange={(e) => setData({ email: { to: e.target.value, subject: data.email?.subject, body: data.email?.body } })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-subject">Subject (Optional)</Label>
              <Input
                id="email-subject"
                type="text"
                placeholder="Email subject"
                value={data.email?.subject || ''}
                onChange={(e) => setData({ email: { to: data.email?.to || '', subject: e.target.value, body: data.email?.body } })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-body">Body (Optional)</Label>
              <Textarea
                id="email-body"
                placeholder="Email body"
                value={data.email?.body || ''}
                onChange={(e) => setData({ email: { to: data.email?.to || '', subject: data.email?.subject, body: e.target.value } })}
                rows={3}
              />
            </div>
          </div>
        )

      case 'phone':
        return (
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1234567890"
              value={data.phone || ''}
              onChange={(e) => setData({ phone: e.target.value })}
            />
          </div>
        )

      case 'sms':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sms-number">Phone Number</Label>
              <Input
                id="sms-number"
                type="tel"
                placeholder="+1234567890"
                value={data.sms?.number || ''}
                onChange={(e) => setData({ sms: { number: e.target.value, message: data.sms?.message } })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sms-message">Message (Optional)</Label>
              <Textarea
                id="sms-message"
                placeholder="Your message"
                value={data.sms?.message || ''}
                onChange={(e) => setData({ sms: { number: data.sms?.number || '', message: e.target.value } })}
                rows={3}
              />
            </div>
          </div>
        )

      case 'wifi':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wifi-ssid">Network Name (SSID)</Label>
              <Input
                id="wifi-ssid"
                type="text"
                placeholder="MyWiFiNetwork"
                value={data.wifi?.ssid || ''}
                onChange={(e) => setData({ wifi: { ssid: e.target.value, password: data.wifi?.password || '', security: data.wifi?.security || 'WPA', hidden: data.wifi?.hidden } })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wifi-password">Password</Label>
              <Input
                id="wifi-password"
                type="password"
                placeholder="Password"
                value={data.wifi?.password || ''}
                onChange={(e) => setData({ wifi: { ssid: data.wifi?.ssid || '', password: e.target.value, security: data.wifi?.security || 'WPA', hidden: data.wifi?.hidden } })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wifi-security">Security Type</Label>
              <Select
                value={data.wifi?.security || 'WPA'}
                onValueChange={(value: 'WPA' | 'WEP' | 'nopass') =>
                  setData({ wifi: { ssid: data.wifi?.ssid || '', password: data.wifi?.password || '', security: value, hidden: data.wifi?.hidden } })
                }
              >
                <SelectTrigger id="wifi-security">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">No Password</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 'vcard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vcard-firstname">First Name</Label>
                <Input
                  id="vcard-firstname"
                  type="text"
                  placeholder="John"
                  value={data.vcard?.firstName || ''}
                  onChange={(e) => setData({ vcard: { firstName: e.target.value, lastName: data.vcard?.lastName || '', organization: data.vcard?.organization, phone: data.vcard?.phone, email: data.vcard?.email, url: data.vcard?.url, address: data.vcard?.address } })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vcard-lastname">Last Name</Label>
                <Input
                  id="vcard-lastname"
                  type="text"
                  placeholder="Doe"
                  value={data.vcard?.lastName || ''}
                  onChange={(e) => setData({ vcard: { firstName: data.vcard?.firstName || '', lastName: e.target.value, organization: data.vcard?.organization, phone: data.vcard?.phone, email: data.vcard?.email, url: data.vcard?.url, address: data.vcard?.address } })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vcard-org">Organization (Optional)</Label>
              <Input
                id="vcard-org"
                type="text"
                placeholder="Company Name"
                value={data.vcard?.organization || ''}
                onChange={(e) => setData({ vcard: { firstName: data.vcard?.firstName || '', lastName: data.vcard?.lastName || '', organization: e.target.value, phone: data.vcard?.phone, email: data.vcard?.email, url: data.vcard?.url, address: data.vcard?.address } })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vcard-phone">Phone (Optional)</Label>
              <Input
                id="vcard-phone"
                type="tel"
                placeholder="+1234567890"
                value={data.vcard?.phone || ''}
                onChange={(e) => setData({ vcard: { firstName: data.vcard?.firstName || '', lastName: data.vcard?.lastName || '', organization: data.vcard?.organization, phone: e.target.value, email: data.vcard?.email, url: data.vcard?.url, address: data.vcard?.address } })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vcard-email">Email (Optional)</Label>
              <Input
                id="vcard-email"
                type="email"
                placeholder="john@example.com"
                value={data.vcard?.email || ''}
                onChange={(e) => setData({ vcard: { firstName: data.vcard?.firstName || '', lastName: data.vcard?.lastName || '', organization: data.vcard?.organization, phone: data.vcard?.phone, email: e.target.value, url: data.vcard?.url, address: data.vcard?.address } })}
              />
            </div>
          </div>
        )

      case 'event':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="event-title">Event Title *</Label>
              <Input
                id="event-title"
                type="text"
                placeholder="Meeting with team"
                value={data.event?.title || ''}
                onChange={(e) => setData({ event: { title: e.target.value, startDate: data.event?.startDate || '', description: data.event?.description, location: data.event?.location, endDate: data.event?.endDate, allDay: data.event?.allDay } })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-start">Start Date & Time *</Label>
              <Input
                id="event-start"
                type="datetime-local"
                value={data.event?.startDate || ''}
                onChange={(e) => setData({ event: { title: data.event?.title || '', startDate: e.target.value, description: data.event?.description, location: data.event?.location, endDate: data.event?.endDate, allDay: data.event?.allDay } })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-end">End Date & Time (Optional)</Label>
              <Input
                id="event-end"
                type="datetime-local"
                value={data.event?.endDate || ''}
                onChange={(e) => setData({ event: { title: data.event?.title || '', startDate: data.event?.startDate || '', description: data.event?.description, location: data.event?.location, endDate: e.target.value, allDay: data.event?.allDay } })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-location">Location (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="event-location"
                  type="text"
                  placeholder="Conference Room A or select from map"
                  value={data.event?.location || ''}
                  onChange={(e) => setData({ event: { title: data.event?.title || '', startDate: data.event?.startDate || '', description: data.event?.description, location: e.target.value, endDate: data.event?.endDate, allDay: data.event?.allDay } })}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setMapPickerOpen(true)}
                  title="Pick location from map"
                >
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-description">Description (Optional)</Label>
              <Textarea
                id="event-description"
                placeholder="Event description"
                value={data.event?.description || ''}
                onChange={(e) => setData({ event: { title: data.event?.title || '', startDate: data.event?.startDate || '', description: e.target.value, location: data.event?.location, endDate: data.event?.endDate, allDay: data.event?.allDay } })}
                rows={3}
              />
            </div>
          </div>
        )

      case 'location':
        return (
          <div className="space-y-4">
            <div className="flex items-end gap-2">
              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="space-y-2">
                  <Label htmlFor="location-lat">Latitude *</Label>
                  <Input
                    id="location-lat"
                    type="number"
                    step="any"
                    placeholder="40.7128"
                    value={data.location?.latitude || ''}
                    onChange={(e) => setData({ location: { latitude: parseFloat(e.target.value) || 0, longitude: data.location?.longitude || 0, altitude: data.location?.altitude, query: data.location?.query } })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location-lng">Longitude *</Label>
                  <Input
                    id="location-lng"
                    type="number"
                    step="any"
                    placeholder="-74.0060"
                    value={data.location?.longitude || ''}
                    onChange={(e) => setData({ location: { latitude: data.location?.latitude || 0, longitude: parseFloat(e.target.value) || 0, altitude: data.location?.altitude, query: data.location?.query } })}
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setMapPickerOpen(true)}
                title="Pick location from map"
                className="mb-0"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Map
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location-altitude">Altitude (Optional)</Label>
              <Input
                id="location-altitude"
                type="number"
                step="any"
                placeholder="0"
                value={data.location?.altitude || ''}
                onChange={(e) => {
                  const alt = parseFloat(e.target.value);
                  setData({ location: { latitude: data.location?.latitude || 0, longitude: data.location?.longitude || 0, altitude: isNaN(alt) ? undefined : alt, query: data.location?.query } });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location-query">Search Query (Optional)</Label>
              <Input
                id="location-query"
                type="text"
                placeholder="New York, NY"
                value={data.location?.query || ''}
                onChange={(e) => setData({ location: { latitude: data.location?.latitude || 0, longitude: data.location?.longitude || 0, altitude: data.location?.altitude, query: e.target.value } })}
              />
            </div>
          </div>
        )

      case 'social':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="social-platform">Platform</Label>
              <Select
                value={data.social?.platform || 'facebook'}
                onValueChange={(value: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok' | 'custom') =>
                  setData({ social: { platform: value, url: data.social?.url || '', username: data.social?.username } })
                }
              >
                <SelectTrigger id="social-platform">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="twitter">Twitter/X</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="custom">Custom URL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="social-url">URL *</Label>
              <Input
                id="social-url"
                type="url"
                placeholder="https://..."
                value={data.social?.url || ''}
                onChange={(e) => setData({ social: { platform: data.social?.platform || 'facebook', url: e.target.value, username: data.social?.username } })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="social-username">Username (Optional)</Label>
              <Input
                id="social-username"
                type="text"
                placeholder="@username"
                value={data.social?.username || ''}
                onChange={(e) => setData({ social: { platform: data.social?.platform || 'facebook', url: data.social?.url || '', username: e.target.value } })}
              />
            </div>
          </div>
        )

      case 'barcode':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="barcode-type">Barcode Type</Label>
              <Select
                value={data.barcode?.type || 'EAN13'}
                onValueChange={(value: 'EAN13' | 'EAN8' | 'UPC' | 'CODE128' | 'CODE39' | 'ITF14' | 'MSI' | 'pharmacode') =>
                  setData({ barcode: { type: value, value: data.barcode?.value || '' } })
                }
              >
                <SelectTrigger id="barcode-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EAN13">EAN-13</SelectItem>
                  <SelectItem value="EAN8">EAN-8</SelectItem>
                  <SelectItem value="UPC">UPC</SelectItem>
                  <SelectItem value="CODE128">CODE 128</SelectItem>
                  <SelectItem value="CODE39">CODE 39</SelectItem>
                  <SelectItem value="ITF14">ITF-14</SelectItem>
                  <SelectItem value="MSI">MSI</SelectItem>
                  <SelectItem value="pharmacode">Pharmacode</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="barcode-value">Barcode Value *</Label>
              <Input
                id="barcode-value"
                type="text"
                placeholder="1234567890123"
                value={data.barcode?.value || ''}
                onChange={(e) => setData({ barcode: { type: data.barcode?.type || 'EAN13', value: e.target.value } })}
              />
            </div>
          </div>
        )

      case 'custom':
        return (
          <div className="space-y-2">
            <Label htmlFor="custom-data">Custom Data *</Label>
            <Textarea
              id="custom-data"
              placeholder="Enter any custom data..."
              value={data.custom?.data || ''}
              onChange={(e) => setData({ custom: { data: e.target.value } })}
              rows={6}
            />
            <p className="text-xs text-muted-foreground">Enter any text or data you want to encode</p>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create QR Code</CardTitle>
            <CardDescription>Choose a type and enter your data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="qr-type">QR Code Type</Label>
              <Select
                value={type}
                onValueChange={(value: QRCodeType) => {
                  setType(value)
                }}
              >
                <SelectTrigger id="qr-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="url">URL</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="wifi">WiFi</SelectItem>
                  <SelectItem value="vcard">Contact (vCard)</SelectItem>
                  <SelectItem value="event">Event (Calendar)</SelectItem>
                  <SelectItem value="location">Location (GPS)</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="barcode">Barcode</SelectItem>
                  <SelectItem value="custom">Custom Data</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {renderInputFields()}

            <Button onClick={handleGenerate} className="w-full">
              Generate QR Code
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Your QR code will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            <QRPreview dataUrl={qrDataUrl} type={qrOptions?.type} data={qrOptions?.data} />
          </CardContent>
        </Card>
      </div>

      <QRCustomizer customizations={customizations} onChange={setCustomizations} />

      <MapPicker
        open={mapPickerOpen}
        onOpenChange={setMapPickerOpen}
        onSelect={handleMapSelect}
        initialLatitude={type === 'location' ? data.location?.latitude : undefined}
        initialLongitude={type === 'location' ? data.location?.longitude : undefined}
      />
    </div>
  )
}

