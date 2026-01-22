'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { QrCode, Palette, Shield, Download, Scan, Star } from 'lucide-react'
import { Footer } from '@/components/marketing/Footer'
import { Header } from '@/components/marketing/Header'
import { FadeIn } from '@/components/ui/fade-in'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: QrCode,
    title: 'Multiple QR Types',
    description: 'Generate QR codes for URLs, text, email, phone, SMS, WiFi credentials, contact cards, events, locations, and more.',
  },
  {
    icon: Palette,
    title: 'Icon Customization',
    description: 'Add icons to your QR codes. The app automatically optimizes icon placement for scannability.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'All data stored locally on your device. Premium/Pro includes URL and email security checks. No cloud sync, no external storage.',
  },
  {
    icon: Download,
    title: 'Export Formats',
    description: 'Pro tier only: Export QR codes in CSV, JSON, images ZIP, or parsed text formats. Local backup and restore included.',
  },
  {
    icon: Scan,
    title: 'Batch Scanning',
    description: 'Pro feature: Scan multiple QR codes at once for efficient bulk processing.',
  },
  {
    icon: Star,
    title: 'History & Favorites',
    description: 'Keep track of all scanned and generated QR codes. Mark favorites for quick access. All stored locally.',
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
                Everything you need to create and manage professional QR codes
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
                        <CardTitle>{feature.title}</CardTitle>
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

