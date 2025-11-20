'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2, Eye, Download } from 'lucide-react'
import { QRGenerator } from '@/components/qr/QRGenerator'
import { FadeIn } from '@/components/ui/fade-in'
import { motion } from 'framer-motion'

interface QRCode {
  id: string
  type: string
  data: string
  customizations: any
  isDynamic: boolean
  createdAt: string
  _count: {
    analytics: number
  }
}

export default function QRCodesPage() {
  const [qrCodes, setQrCodes] = useState<QRCode[]>([])
  const [loading, setLoading] = useState(true)
  const [showGenerator, setShowGenerator] = useState(false)

  useEffect(() => {
    fetchQRCodes()
  }, [])

  const fetchQRCodes = async () => {
    try {
      const response = await fetch('/api/qr/list')
      if (response.ok) {
        const data = await response.json()
        setQrCodes(data.qrCodes)
      } else if (response.status === 503) {
        // Database not available - preview mode
        setQrCodes([])
      }
    } catch (error) {
      console.error('Error fetching QR codes:', error)
      // In preview mode, just show empty state
      setQrCodes([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this QR code?')) {
      return
    }

    try {
      const response = await fetch(`/api/qr/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setQrCodes(qrCodes.filter((qr) => qr.id !== id))
      } else {
        alert('Failed to delete QR code')
      }
    } catch (error) {
      console.error('Error deleting QR code:', error)
      alert('Failed to delete QR code')
    }
  }

  if (showGenerator) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => setShowGenerator(false)}>
            ← Back to QR Codes
          </Button>
        </div>
        <QRGenerator />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My QR Codes</h1>
            <p className="text-muted-foreground">Manage your QR code library</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={() => setShowGenerator(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create QR Code
            </Button>
          </motion.div>
        </div>
      </FadeIn>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      ) : qrCodes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No QR codes yet</p>
            <Button onClick={() => setShowGenerator(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create your first QR code
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {qrCodes.map((qr, index) => {
            let displayData = 'N/A'
            try {
              const data = JSON.parse(qr.data)
              displayData = data.url || data.text || data.email?.to || data.phone || 'N/A'
            } catch {
              // Fallback to raw data if JSON parsing fails
              displayData = qr.data.slice(0, 50) || 'Invalid data'
            }
            
            return (
              <FadeIn key={qr.id} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="capitalize">{qr.type}</CardTitle>
                        {qr.isDynamic && (
                          <span className="text-xs bg-premium-container text-premium px-2 py-1 rounded border border-premium-border">
                            Dynamic
                          </span>
                        )}
                      </div>
                      <CardDescription>
                        Created {new Date(qr.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Data:</p>
                        <p className="text-sm font-mono truncate">
                          {displayData}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {qr._count.analytics} scans
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            asChild
                          >
                            <Link href={`/dashboard/qr-codes`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Link>
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-destructive hover:text-destructive"
                            onClick={() => handleDelete(qr.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </FadeIn>
            )
          })}
        </div>
      )}
    </div>
  )
}

