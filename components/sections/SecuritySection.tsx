'use client'

import { motion } from 'framer-motion'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lock, Eye, FileCheck } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { AppScreenshot } from '@/components/marketing/AppScreenshot'
import { shots } from '@/lib/screenshots'

const securityFeatures = [
  { icon: Lock, title: 'URL Link Safety Check', description: 'Scanned links are checked against known threats via Google Web Risk, plus suspicious-pattern checks. Everyone gets 5 checks per day; more are available through credit packs.' },
  { icon: FileCheck, title: 'Email Domain Validation', description: 'Unlimited for everyone. An MX lookup over DNS confirms whether an email domain can receive mail. Does not use your URL check credits.' },
  { icon: Shield, title: 'Plain-Language Results', description: 'Clear safe, risk, or unavailable states shown inline on the scan result. No need to interpret threat logs.' },
  { icon: Eye, title: 'Private, Works Offline', description: 'Scans, history, and generated codes stay on your device. Only the link being checked is sent for a safety check.' },
]

export function SecuritySection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section ref={ref} className="py-20 overflow-x-hidden">
      <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Security & Safety</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Other QR apps decode the data and stop there. QR Snap checks the link before you open it.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <div className="space-y-4">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className="w-12 h-12 rounded-lg bg-success-container flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-success" />
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

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <AppScreenshot shot={shots.urlSafetyResult} size="lg" />
        </motion.div>
      </div>
      </div>
    </section>
  )
}

