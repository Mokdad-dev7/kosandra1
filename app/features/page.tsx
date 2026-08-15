'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { QrCode, Shield, Download, Scan, Star, Store, ShoppingCart, Camera, Image as ImageIcon } from 'lucide-react'
import { Footer } from '@/components/marketing/Footer'
import { Header } from '@/components/marketing/Header'
import { FadeIn } from '@/components/ui/fade-in'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    icon: Camera,
    title: 'Live Camera Scan',
    description: 'Scan QR codes and barcodes in real-time with your device camera. Fast recognition across many formats.',
  },
  {
    icon: ImageIcon,
    title: 'Scan from Gallery',
    description: 'Select images from your gallery to scan codes. Batch scanning from gallery images requires Lifetime Unlock.',
    badge: 'Gallery batch: Lifetime',
  },
  {
    icon: QrCode,
    title: '14+ Code Types',
    description: 'Generate QR codes for URLs, text, email, phone, SMS, WiFi, vCard, calendar events, locations, social profiles, and product barcodes.',
  },
  {
    icon: Shield,
    title: 'URL Link Safety Check',
    description: 'Checks links against known threats via Google Web Risk plus suspicious-pattern analysis. Everyone gets 5 checks per day; buy packs for more.',
  },
  {
    icon: Download,
    title: 'Export & Backup',
    description: 'CSV, JSON, image ZIP, and local backup/restore. Included with Lifetime Unlock. No cloud sync.',
    badge: 'Lifetime',
  },
  {
    icon: Star,
    title: 'History & Favorites',
    description: 'Complete history of scanned and generated codes. Mark favorites for quick access. All stored locally on your device.',
  },
  {
    icon: Store,
    title: 'Point of Sale',
    description: 'Local shop inventory, scan-to-cart checkout, sales history and reports, PDF receipts. POS data stays on device.',
    badge: 'Lifetime',
  },
  {
    icon: ShoppingCart,
    title: 'Product Lookup',
    description: 'Scan product barcodes and look up details from Open Food Facts and similar databases where available.',
  },
  {
    icon: Scan,
    title: 'Batch Scanning',
    description: 'Scan multiple codes in one session. Camera batch is free; gallery batch requires Lifetime Unlock.',
    badge: 'Gallery batch: Lifetime',
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-20">
          <FadeIn>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Features</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Scan and create QR codes. Check links for threats before you open them.
              </p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <FadeIn key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <motion.div
                          className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Icon className="w-6 h-6 text-primary" />
                        </motion.div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <CardTitle>{feature.title}</CardTitle>
                          {feature.badge && (
                            <Badge className="bg-premium-container text-premium border-premium-border text-xs">
                              {feature.badge}
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                </FadeIn>
              )
            })}
          </div>
          <FadeIn delay={0.6}>
            <div className="text-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg">
                  <Link href="/">Get Started</Link>
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>
        <Footer />
      </div>
    </div>
  )
}
