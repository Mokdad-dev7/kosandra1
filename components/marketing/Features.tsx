'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { QrCode, Palette, Shield, Download, Scan, Star } from 'lucide-react'
import { FadeIn } from '@/components/ui/fade-in'
import { motion } from 'framer-motion'

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
    description: 'All data stored locally on your device. Premium/Pro includes URL and email security checks. No cloud sync.',
  },
  {
    icon: Download,
    title: 'Export Formats',
    description: 'Download QR codes as PNG or SVG. Pro tier includes local backup and restore functionality.',
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

export function Features() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground text-lg">
              Scan, create, and organize QR codes
            </p>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
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
      </div>
    </section>
  )
}

