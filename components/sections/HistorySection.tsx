'use client'

import { motion } from 'framer-motion'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, Clock, Search, Filter } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { AppScreenshot } from '@/components/marketing/AppScreenshot'
import { shots } from '@/lib/screenshots'

const historyFeatures = [
  { icon: Clock, title: 'Scan History', description: 'Complete log of all scanned QR codes with timestamps' },
  { icon: Search, title: 'Quick Search', description: 'Find any QR code instantly with powerful search' },
  { icon: Filter, title: 'Smart Filters', description: 'Filter by type, date, or custom tags' },
  { icon: Star, title: 'Favorites', description: 'Mark important codes for quick access' },
]

export function HistorySection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section ref={ref} className="py-20 bg-muted/20 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">History & Organization</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Keep track of all your QR codes with powerful organization tools
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
          <div className="flex flex-wrap justify-center gap-6">
            <AppScreenshot shot={shots.history} size="md" />
            <AppScreenshot shot={shots.created} size="md" />
          </div>

          {/* Right: Features List */}
          <div className="space-y-4">
            {historyFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1 + 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-info-container flex items-center justify-center">
                          <Icon className="w-6 h-6 text-info" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                          <CardDescription>{feature.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

