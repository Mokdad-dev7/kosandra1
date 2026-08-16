'use client'

import { motion } from 'framer-motion'
import { Camera, Image, Scan } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { Badge } from '@/components/ui/badge'
import { ScreenshotRow } from '@/components/marketing/AppScreenshot'
import { shots } from '@/lib/screenshots'

const features = [
  {
    icon: Camera,
    title: 'Live Camera Scan',
    description: 'Scan QR codes and barcodes instantly with your device camera. Fast recognition across many formats.',
    direction: 'left',
  },
  {
    icon: Image,
    title: 'Scan from Gallery',
    description: 'Select images from your gallery to scan codes. Perfect for printed codes, screenshots, and saved images.',
    direction: 'right',
  },
  {
    icon: Scan,
    title: 'Batch Scan',
    description: 'Scan several codes in one session. Camera batch scanning is free; batch scanning from gallery images requires Lifetime Unlock.',
    direction: 'left',
    premium: true,
  },
]

export function ScanningFeatures() {
  const { ref, isInView } = useScrollReveal()

  const getInitialPosition = (_direction: string) => {
    return { y: 24, opacity: 0 }
  }

  return (
    <section ref={ref} className="py-20 overflow-x-hidden">
      <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Core Scanning Features</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Multiple ways to scan QR codes and barcodes, with fast recognition across many formats
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon
          const initialPos = getInitialPosition(feature.direction)

          return (
            <motion.div
              key={index}
              initial={initialPos}
              animate={isInView ? { y: 0, opacity: 1 } : initialPos}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.15, rotate: 5, transition: { type: 'spring', stiffness: 300 } }}
                    initial={{ scale: 0.8 }}
                    animate={isInView ? { scale: 1 } : { scale: 0.8 }}
                    transition={{
                      delay: index * 0.15 + 0.3,
                      type: 'spring',
                      stiffness: 200,
                    }}
                  >
                    <Icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <div className="flex items-center gap-2">
                    <CardTitle>{feature.title}</CardTitle>
                    {feature.premium && (
                      <Badge className="bg-premium-container text-premium border-premium-border">
                        Gallery: Lifetime
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          )
        })}
      </div>
      <ScreenshotRow shots={[shots.scanCamera, shots.scanMethod, shots.batchCamera, shots.batchGallery]} />
      </div>
    </section>
  )
}

