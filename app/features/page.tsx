'use client'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { QrCode, Shield, Download, Scan, Star, Store, ShoppingCart, Camera, Image as ImageIcon, Share2, FolderArchive, Send, LayoutGrid } from 'lucide-react'
import { Footer } from '@/components/marketing/Footer'
import { Header } from '@/components/marketing/Header'
import { FadeIn } from '@/components/ui/fade-in'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScreenshotRow } from '@/components/marketing/AppScreenshot'
import { shots } from '@/lib/screenshots'

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
    title: '13 Code Types',
    description: 'Generate QR codes for URLs, text, email, phone, SMS, WiFi, vCard, calendar events, locations, social profiles, and product barcodes.',
  },
  {
    icon: Send,
    title: 'Share to QR Snap',
    description: 'Share a link, text, contact, or calendar event from any app and pick QR Snap. The right QR generator opens, already filled in.',
    badge: 'New',
  },
  {
    icon: LayoutGrid,
    title: 'Home Screen Widgets',
    description: 'Quick actions for Scan, Gallery, Create, and Clipboard, plus Pinned QR to keep a code on your home screen. Free includes one Pinned QR; Lifetime pins as many as you like.',
    badge: 'New',
  },
  {
    icon: Shield,
    title: 'URL Link Safety Check',
    description: 'Flags phishing and known-bad links using Google Web Risk and suspicious-pattern checks, and shows which checks ran. Free includes 1 check a day, Lifetime 2, and each rewarded ad adds 2; packs add more.',
  },
  {
    icon: Download,
    title: 'Export',
    description: 'CSV, JSON, image ZIP, and parsed text as shown in-app. Included with Lifetime Unlock.',
    badge: 'Lifetime',
  },
  {
    icon: FolderArchive,
    title: 'Backup and restore',
    description: 'Save a local backup of your codes and restore it later on this device. No cloud sync.',
    badge: 'Lifetime',
  },
  {
    icon: Share2,
    title: 'Share',
    description: 'Share codes and results to other apps on your device. Included with Lifetime Unlock.',
    badge: 'Lifetime',
  },
  {
    icon: Star,
    title: 'History & Favorites',
    description: 'History of scanned and generated codes, smart filters, and favorites. Stored locally on your device.',
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
              Scan, create, check links, share to QR Snap, pin codes to your home screen, export, backup, and run Point of Sale.
              </p>
            </div>
          </FadeIn>
          <ScreenshotRow
            className="mb-16"
            size="sm"
            shots={[
              shots.liveCameraScan,
              shots.urlSafetyResult,
              shots.phishingWarning,
              shots.shareToCreate,
              shots.homeScreenWidgets,
              shots.generateUrl,
              shots.scanHistory,
              shots.batchScanGallery,
              shots.backupFormats,
              shots.posPortal,
              shots.pricingPlans,
            ]}
          />
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
                            <Badge
                              className={
                                feature.badge === 'New'
                                  ? 'bg-primary/10 text-primary border-primary/30 text-xs'
                                  : 'bg-premium-container text-premium border-premium-border text-xs'
                              }
                            >
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
