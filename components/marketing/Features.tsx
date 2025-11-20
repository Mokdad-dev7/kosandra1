'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { QrCode, Palette, BarChart3, Zap, Shield, Download } from 'lucide-react'
import { FadeIn } from '@/components/ui/fade-in'
import { motion } from 'framer-motion'

const features = [
  {
    icon: QrCode,
    title: 'Multiple QR Types',
    description: 'Generate QR codes for URLs, text, email, phone, SMS, WiFi credentials, and contact cards.',
  },
  {
    icon: Palette,
    title: 'Full Customization',
    description: 'Customize colors, add your logo, adjust error correction levels, and choose from different patterns.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track scans, view geographic data, device types, and time-based analytics for your QR codes.',
  },
  {
    icon: Zap,
    title: 'Dynamic QR Codes',
    description: 'Create editable QR codes that can be updated without regenerating the code itself.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data is encrypted and secure. We never share your QR code data with third parties.',
  },
  {
    icon: Download,
    title: 'Multiple Formats',
    description: 'Download your QR codes in PNG or SVG format, ready for print or digital use.',
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
              Everything you need to create and manage professional QR codes
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

