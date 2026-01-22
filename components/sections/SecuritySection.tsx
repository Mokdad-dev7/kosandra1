'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lock, Eye, FileCheck } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { useState, useEffect } from 'react'

const securityFeatures = [
  { icon: Shield, title: 'Privacy First', description: 'All QR codes stored locally on your device. No cloud sync, no external storage.' },
  { icon: Lock, title: 'URL Domain Security Check', description: 'Premium/Pro feature: Check URLs for malicious content before opening. Secure API-based, no data stored.' },
  { icon: FileCheck, title: 'Email Domain Validation', description: 'Premium/Pro feature: Validate email domains to prevent spam. Local or secure API-based validation.' },
  { icon: Eye, title: 'Offline-First', description: 'Core functionality works completely offline. Security checks require internet but store no data.' },
]

const shieldStates = ['safe', 'scanning', 'safe'] as const

export function SecuritySection() {
  const { ref, isInView } = useScrollReveal()
  const [shieldState, setShieldState] = useState<'safe' | 'scanning' | 'unknown'>('safe')

  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setShieldState((prev) => {
        if (prev === 'safe') return 'scanning'
        if (prev === 'scanning') return 'safe'
        return 'safe'
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isInView])

  const getShieldColor = () => {
    switch (shieldState) {
      case 'safe':
        return 'text-success'
      case 'scanning':
        return 'text-warning'
      default:
        return 'text-muted-foreground'
    }
  }

  const getShieldGlow = () => {
    switch (shieldState) {
      case 'safe':
        return 'shadow-success/50'
      case 'scanning':
        return 'shadow-warning/50'
      default:
        return 'shadow-muted/50'
    }
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
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Security & Safety</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Local storage, privacy-first design, and optional security features to protect you
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* Left: Features List */}
        <div className="space-y-4">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-success-container flex items-center justify-center">
                        <Icon className="w-6 h-6 text-success" />
                      </div>
                      <div className="flex-1">
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

        {/* Right: Animated Shield */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          <motion.div
            animate={{
              scale: shieldState === 'scanning' ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: shieldState === 'scanning' ? Infinity : 0,
              ease: 'easeInOut',
            }}
            className={`relative ${getShieldGlow()}`}
          >
            <motion.div
              animate={{
                boxShadow: shieldState === 'safe' 
                  ? '0 0 30px rgba(76, 175, 80, 0.5)'
                  : shieldState === 'scanning'
                  ? '0 0 30px rgba(255, 152, 0, 0.5)'
                  : '0 0 20px rgba(0, 0, 0, 0.1)',
              }}
              transition={{ duration: 0.5 }}
              className="w-64 h-64 rounded-full bg-muted flex items-center justify-center"
            >
              <Shield className={`w-32 h-32 ${getShieldColor()}`} />
            </motion.div>
            <motion.div
              animate={{
                opacity: shieldState === 'scanning' ? [0.5, 1, 0.5] : 0.3,
              }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
            />
          </motion.div>
        </motion.div>
      </div>
      </div>
    </section>
  )
}

