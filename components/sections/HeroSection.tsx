'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { PhoneMockup } from '@/components/marketing/PhoneMockup'
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function HeroSection() {
  const { ref, isInView } = useScrollReveal()
  const parallaxRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ['start start', 'end start'],
  })

  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={parallaxRef} className="min-h-screen flex items-center justify-center relative overflow-x-hidden overflow-y-hidden bg-gradient-to-b from-background via-background to-muted/20">
      {/* Background decoration with parallax */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-info/5 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
      </motion.div>

      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left: Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <span className="inline-flex max-w-full flex-wrap justify-center lg:justify-start px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium text-center">
                QR code scam checker
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight break-words"
            >
              See where a QR code{' '}
              <span className="bg-gradient-to-r from-primary via-info to-primary bg-clip-text text-transparent animate-gradient">
                really
              </span>
              {' '}goes before you open it
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed"
            >
              Fake QR stickers on parking meters, fake delivery notices, phishing emails. QR Snap follows the
              link to the page it really opens and checks it for known scams, look-alike names and brand-new
              sites. Then you decide. It also creates 13 code types and puts your favorite on the home screen.
            </motion.p>

            {/* CTAs - Staggered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="text-lg px-8 h-14 w-full sm:w-auto">
                  <Link href="#download">
                    Download App
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" variant="outline" className="text-lg px-8 h-14 w-full sm:w-auto">
                  <Link href="/features">View Features</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Phone mockup */}
          <motion.div
            style={{
              y: phoneY,
              opacity: phoneOpacity,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <PhoneMockup />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

