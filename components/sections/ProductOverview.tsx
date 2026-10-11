'use client'

import { motion } from 'framer-motion'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Camera, Shield, FolderArchive, Store } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const pillars = [
  {
    icon: Camera,
    title: 'Scan and create',
    body: 'Live camera scan, scan from gallery, and camera batch for free. Create 13 QR and barcode types: URL, text, Wi-Fi, vCard, events, location, social, and product codes. Gallery batch scan is in Lifetime Unlock.',
  },
  {
    icon: Shield,
    title: 'URL safety and email checks',
    body: 'Before you open a link, QR Snap checks it for phishing and known threats (Google Web Risk plus pattern checks). Free includes 1 check a day, Lifetime Unlock 2. Each rewarded ad adds 2. Email domain (MX) validation is unlimited and does not use those credits.',
  },
  {
    icon: FolderArchive,
    title: 'Export, backup, restore, share',
    body: 'Lifetime Unlock includes local backup and restore, export as CSV, JSON, image ZIP, and parsed text, and share to other apps. Codes stay on the device. No cloud sync.',
  },
  {
    icon: Store,
    title: 'Point of Sale and pricing',
    body: 'POS in Lifetime Unlock: local inventory, scan-to-cart, sales history, receipts. Pricing is Free, a $9.99 one-time Lifetime Unlock, and URL packs at $0.99, $2.99, and $4.99 if you need more link checks.',
  },
]

export function ProductOverview() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section ref={ref} className="py-20 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What is QR Snap?</h2>
          <p className="text-muted-foreground text-lg">
            QR Snap is an Android QR and barcode app from Ars Technology. You scan with the camera or
            from gallery images, create 13 code types, check links before you open them, turn anything
            you share from another app into a QR code, keep a code on your home screen, keep history
            on the device, and with Lifetime Unlock you get gallery batch scan, export, backup, restore,
            share, and Point of Sale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{pillar.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{pillar.body}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
