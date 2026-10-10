'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Smartphone, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const specs = [
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Built for Android today, with an iPhone version in development',
    features: ['Native camera integration', 'Share sheet and home screen widgets', 'Local storage, works offline', 'Adaptive mobile layouts'],
  },
  {
    icon: Layers,
    title: 'Built with Flutter',
    description: 'One Material 3 design language across platforms',
    features: ['Flutter and Material 3', 'On-device Hive storage', 'Smooth, consistent UI'],
  },
  {
    icon: ShieldCheck,
    title: 'Backed Safety Checks',
    description: 'Server-backed link safety and store billing',
    features: ['Cloudflare Worker link safety', 'Google Web Risk threat data', 'Purchases verified with Google Play'],
  },
]

export function TechSpecs() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section ref={ref} className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Specs</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built for speed on mobile, with safety checks backed by a privacy-minded server
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {specs.map((spec, index) => {
            const Icon = spec.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={isInView ? { scale: 1 } : { scale: 0.8 }}
                      transition={{
                        delay: index * 0.15 + 0.3,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                    >
                      <Icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl">{spec.title}</CardTitle>
                    <CardDescription>{spec.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {spec.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ delay: index * 0.15 + i * 0.1 + 0.4 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

