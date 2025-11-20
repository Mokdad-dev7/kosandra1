'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FadeIn } from '@/components/ui/fade-in'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Eye } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface QRCode {
  id: string
  type: string
  data: string
  createdAt: string
  _count: {
    analytics: number
  }
}

interface RecentQRCodesProps {
  qrCodes: QRCode[]
}

export function RecentQRCodes({ qrCodes }: RecentQRCodesProps) {
  if (qrCodes.length === 0) {
    return (
      <FadeIn>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4 text-center">
              You haven't created any QR codes yet.
            </p>
            <Button asChild>
              <Link href="/dashboard/qr-codes">
                Create Your First QR Code
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </FadeIn>
    )
  }

  return (
    <FadeIn delay={0.3}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent QR Codes</CardTitle>
              <CardDescription>Your latest QR code creations</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/qr-codes">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {qrCodes.map((qrCode, index) => {
              let displayData = ''
              try {
                const data = JSON.parse(qrCode.data)
                if (qrCode.type === 'url') {
                  displayData = data.url || ''
                } else if (qrCode.type === 'text') {
                  displayData = data.text || ''
                } else if (qrCode.type === 'email') {
                  displayData = data.email?.to || ''
                } else {
                  displayData = JSON.stringify(data).slice(0, 50)
                }
              } catch {
                displayData = qrCode.data.slice(0, 50)
              }

              return (
                <motion.div
                  key={qrCode.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    href={`/dashboard/qr-codes`}
                    className="block p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium px-2 py-0.5 rounded bg-primary/10 text-primary uppercase">
                            {qrCode.type}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(qrCode.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-sm font-medium truncate">{displayData}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {qrCode._count.analytics} scans
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-4" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  )
}

