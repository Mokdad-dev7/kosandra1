'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { QRPreview } from '@/components/qr/QRPreview'
import { QRCustomizer } from '@/components/qr/QRCustomizer'
import { ArrowLeft, Save } from 'lucide-react'
import type { QRCodeType, QRCodeData, QRCodeCustomizations } from '@/types'

interface QRCode {
  id: string
  type: QRCodeType
  data: string
  customizations: any
  isDynamic: boolean
  dynamicUrl: string | null
}

export default function EditQRCodePage() {
  const params = useParams()
  const router = useRouter()
  const [qrCode, setQrCode] = useState<QRCode | null>(null)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<QRCodeData>({ url: '' })
  const [customizations, setCustomizations] = useState<QRCodeCustomizations>({})
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchQRCode()
  }, [params.id])

  const fetchQRCode = async () => {
    try {
      const response = await fetch(`/api/qr/${params.id}`)
      if (response.ok) {
        const result = await response.json()
        const qr = result.qrCode
        setQrCode(qr)
        setData(JSON.parse(qr.data))
        setCustomizations(qr.customizations || {})
        
        // Generate preview
        await generatePreview(qr.type, JSON.parse(qr.data), qr.customizations)
      } else {
        alert('QR code not found')
        router.push('/dashboard/qr-codes')
      }
    } catch (error) {
      console.error('Error fetching QR code:', error)
    } finally {
      setLoading(false)
    }
  }

  const generatePreview = async (
    type: QRCodeType,
    qrData: QRCodeData,
    customizations?: QRCodeCustomizations
  ) => {
    try {
      const response = await fetch('/api/qr/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data: qrData, customizations }),
      })

      if (response.ok) {
        const result = await response.json()
        setQrDataUrl(result.dataUrl)
      }
    } catch (error) {
      console.error('Error generating preview:', error)
    }
  }

  const handleSave = async () => {
    if (!qrCode) return

    setSaving(true)
    try {
      const endpoint = qrCode.isDynamic
        ? `/api/qr/dynamic/${qrCode.id}`
        : `/api/qr/${qrCode.id}/update`

      const response = await fetch(endpoint, {
        method: qrCode.isDynamic ? 'PUT' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data,
          customizations,
          dynamicUrl: qrCode.isDynamic && qrCode.type === 'url' ? data.url : undefined,
        }),
      })

      if (response.ok) {
        // Regenerate preview
        await generatePreview(qrCode.type, data, customizations)
        alert('QR code updated successfully!')
      } else {
        alert('Failed to update QR code')
      }
    } catch (error) {
      console.error('Error updating QR code:', error)
      alert('Failed to update QR code')
    } finally {
      setSaving(false)
    }
  }

  const handleDataChange = async (newData: QRCodeData) => {
    setData(newData)
    if (qrCode) {
      await generatePreview(qrCode.type, newData, customizations)
    }
  }

  const handleCustomizationsChange = async (newCustomizations: QRCodeCustomizations) => {
    setCustomizations(newCustomizations)
    if (qrCode) {
      await generatePreview(qrCode.type, data, newCustomizations)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!qrCode) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" onClick={() => router.push('/dashboard/qr-codes')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to QR Codes
        </Button>
      </div>

      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">Edit QR Code</h1>
        <p className="text-muted-foreground">
          {qrCode.isDynamic ? (
            <span className="text-primary">Dynamic QR Code - Changes won't require regenerating</span>
          ) : (
            'Update your QR code'
          )}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Data</CardTitle>
            <CardDescription>Update the QR code content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {qrCode.type === 'url' && (
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={data.url || ''}
                  onChange={(e) => handleDataChange({ url: e.target.value })}
                />
              </div>
            )}
            {qrCode.type === 'text' && (
              <div className="space-y-2">
                <Label htmlFor="text">Text</Label>
                <textarea
                  id="text"
                  className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                  value={data.text || ''}
                  onChange={(e) => handleDataChange({ text: e.target.value })}
                />
              </div>
            )}
            {/* Add more types as needed */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Your updated QR code</CardDescription>
          </CardHeader>
          <CardContent>
            <QRPreview dataUrl={qrDataUrl} type={qrCode.type} data={data} />
          </CardContent>
        </Card>
      </div>

      <QRCustomizer customizations={customizations} onChange={handleCustomizationsChange} />

      <div className="mt-6">
        <Button onClick={handleSave} disabled={saving} size="lg">
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
}

