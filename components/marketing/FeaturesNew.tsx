'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { QrCode, Palette, Shield, Download, Scan, Star } from 'lucide-react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    icon: QrCode,
    title: 'Multiple QR Types',
    description: 'Generate QR codes for URLs, text, email, phone, SMS, WiFi credentials, contact cards, events, locations, and more.',
    direction: 'left',
  },
  {
    icon: Palette,
    title: 'Icon Customization',
    description: 'Add icons to your QR codes. The app automatically optimizes icon placement for scannability.',
    direction: 'bottom',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'All data stored locally on your device. Premium/Pro includes URL and email security checks. No cloud sync.',
    direction: 'right',
  },
  {
    icon: Download,
    title: 'Export Formats',
    description: 'Download QR codes as PNG or SVG. Pro tier includes local backup and restore functionality.',
    direction: 'left',
  },
  {
    icon: Scan,
    title: 'Batch Scanning',
    description: 'Pro feature: Scan multiple QR codes at once for efficient bulk processing.',
    direction: 'bottom',
  },
  {
    icon: Star,
    title: 'History & Favorites',
    description: 'Keep track of all scanned and generated QR codes. Mark favorites for quick access. All stored locally.',
    direction: 'right',
  },
]

export function FeaturesNew() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  const getInitialPosition = (direction: string) => {
    switch (direction) {
      case 'left':
        return { x: -50, y: 0 }
      case 'right':
        return { x: 50, y: 0 }
      case 'bottom':
        return { x: 0, y: 50 }
      default:
        return { x: 0, y: 40 }
    }
  }

  return (
    <section ref={ref} className="py-20 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Scan, create, and organize QR codes
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          const initialPos = getInitialPosition(feature.direction)

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, ...initialPos }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initialPos }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 8, transition: { duration: 0.2 } }}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

