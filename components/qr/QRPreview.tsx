'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { generateQRCodeSVG } from '@/lib/qr/generator'
import type { QRCodeType, QRCodeData } from '@/types'

interface QRPreviewProps {
  dataUrl: string
  type?: QRCodeType
  data?: QRCodeData
}

export function QRPreview({ dataUrl, type, data: qrData }: QRPreviewProps) {
  const handleDownload = async (format: 'png' | 'svg') => {
    if (!dataUrl) return

    if (format === 'png') {
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `qrcode-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      // For SVG, regenerate with the original options
      if (!type || !qrData) {
        alert('Unable to generate SVG. Please regenerate the QR code.')
        return
      }

      try {
        const svg = await generateQRCodeSVG({ type, data: qrData })
        const svgBlob = new Blob([svg], { type: 'image/svg+xml' })
        const url = window.URL.createObjectURL(svgBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = `qrcode-${Date.now()}.svg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Error downloading SVG:', error)
        alert('Failed to download SVG')
      }
    }
  }

  if (!dataUrl) {
    return (
      <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">No QR code generated yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center p-4 bg-white rounded-lg border">
        <img src={dataUrl} alt="QR Code" className="max-w-full h-auto" />
      </div>
      <div className="flex gap-2">
        <Button onClick={() => handleDownload('png')} variant="outline" className="flex-1">
          <Download className="w-4 h-4 mr-2" />
          Download PNG
        </Button>
        <Button onClick={() => handleDownload('svg')} variant="outline" className="flex-1">
          <Download className="w-4 h-4 mr-2" />
          Download SVG
        </Button>
      </div>
    </div>
  )
}

