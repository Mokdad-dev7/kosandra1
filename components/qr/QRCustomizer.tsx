'use client'

import { useState, useRef, useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'
import type { QRCodeCustomizations } from '@/types'

interface QRCustomizerProps {
  customizations: QRCodeCustomizations
  onChange: (customizations: QRCodeCustomizations) => void
}

export function QRCustomizer({ customizations, onChange }: QRCustomizerProps) {
  const [localCustomizations, setLocalCustomizations] = useState<QRCodeCustomizations>(
    customizations || {}
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sync with parent when customizations change externally
  useEffect(() => {
    setLocalCustomizations(customizations || {})
  }, [customizations])

  const updateCustomization = (key: keyof QRCodeCustomizations, value: any) => {
    const updated = { ...localCustomizations, [key]: value }
    setLocalCustomizations(updated)
    onChange(updated)
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size must be less than 2MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      const img = new Image()
      img.onload = () => {
        // Calculate logo size (15% of QR code width, max 60px)
        const qrWidth = localCustomizations.width || 300
        const logoSize = Math.min(qrWidth * 0.15, 60)
        
        updateCustomization('logo', {
          url: dataUrl,
          width: logoSize,
          height: logoSize,
          margin: 2,
        })
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveLogo = () => {
    const updated = { ...localCustomizations }
    delete updated.logo
    setLocalCustomizations(updated)
    onChange(updated)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customize QR Code</CardTitle>
        <CardDescription>Adjust colors, size, and error correction</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="foreground-color">Foreground Color</Label>
            <div className="flex gap-2">
              <Input
                id="foreground-color"
                type="color"
                value={localCustomizations.foregroundColor || '#000000'}
                onChange={(e) => updateCustomization('foregroundColor', e.target.value)}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={localCustomizations.foregroundColor || '#000000'}
                onChange={(e) => updateCustomization('foregroundColor', e.target.value)}
                placeholder="#000000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="background-color">Background Color</Label>
            <div className="flex gap-2">
              <Input
                id="background-color"
                type="color"
                value={localCustomizations.backgroundColor || '#FFFFFF'}
                onChange={(e) => updateCustomization('backgroundColor', e.target.value)}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={localCustomizations.backgroundColor || '#FFFFFF'}
                onChange={(e) => updateCustomization('backgroundColor', e.target.value)}
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="error-correction">Error Correction Level</Label>
          <Select
            value={localCustomizations.errorCorrectionLevel || 'M'}
            onValueChange={(value: 'L' | 'M' | 'Q' | 'H') =>
              updateCustomization('errorCorrectionLevel', value)
            }
          >
            <SelectTrigger id="error-correction">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="L">L - Low (~7%)</SelectItem>
              <SelectItem value="M">M - Medium (~15%)</SelectItem>
              <SelectItem value="Q">Q - Quartile (~25%)</SelectItem>
              <SelectItem value="H">H - High (~30%)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="width">Size (pixels)</Label>
          <Input
            id="width"
            type="number"
            min="100"
            max="1000"
            value={localCustomizations.width || 300}
            onChange={(e) => updateCustomization('width', parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="margin">Margin</Label>
          <Input
            id="margin"
            type="number"
            min="0"
            max="10"
            value={localCustomizations.margin || 4}
            onChange={(e) => updateCustomization('margin', parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2 pt-4 border-t">
          <Label>Logo/Image</Label>
          {localCustomizations.logo?.url ? (
            <div className="space-y-2">
              <div className="relative inline-block">
                <img
                  src={localCustomizations.logo.url}
                  alt="Logo preview"
                  className="w-20 h-20 object-contain border rounded"
                />
                <button
                  onClick={handleRemoveLogo}
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                  aria-label="Remove logo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Logo will be automatically centered and sized
              </p>
            </div>
          ) : (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Logo/Image
              </Button>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG, or SVG. Max 2MB. Will be automatically shaped and centered.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

