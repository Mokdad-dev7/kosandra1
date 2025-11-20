'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Smartphone, Monitor, Tablet, CheckCircle2 } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const specs = [
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Optimized for iOS and Android devices',
    features: ['Native camera integration', 'Offline support', 'Fast scanning'],
  },
  {
    icon: Monitor,
    title: 'Web Platform',
    description: 'Full-featured web application',
    features: ['Cross-browser support', 'Progressive Web App', 'Real-time sync'],
  },
  {
    icon: Tablet,
    title: 'Tablet Optimized',
    description: 'Perfect experience on tablets',
    features: ['Adaptive layouts', 'Touch gestures', 'Split-screen support'],
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
            Built for performance across all platforms
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {specs.map((spec, index) => {
            const Icon = spec.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
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

