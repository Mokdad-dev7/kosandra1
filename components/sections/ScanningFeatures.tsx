'use client'

import { motion } from 'framer-motion'
import { Camera, Image, Scan } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    icon: Camera,
    title: 'Camera Scan',
    description: 'Scan QR codes instantly using your device camera. Fast, accurate, and works in any lighting condition.',
    direction: 'left',
  },
  {
    icon: Image,
    title: 'Gallery Scan',
    description: 'Select images from your gallery to scan QR codes. Perfect for scanning printed codes or screenshots.',
    direction: 'right',
  },
  {
    icon: Scan,
    title: 'Batch Scan',
    description: 'Scan multiple QR codes at once. Premium feature for bulk processing and organization.',
    direction: 'left',
    premium: true,
  },
]

export function ScanningFeatures() {
  const { ref, isInView } = useScrollReveal()

  const getInitialPosition = (direction: string) => {
    return direction === 'left' ? { x: -50, opacity: 0 } : { x: 50, opacity: 0 }
  }

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Core Scanning Features</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Multiple ways to scan QR codes with advanced recognition technology
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
              animate={isInView ? { x: 0, opacity: 1 } : initialPos}
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
                        Premium
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
      </div>
    </section>
  )
}

