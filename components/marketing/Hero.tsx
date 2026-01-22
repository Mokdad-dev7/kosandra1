'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, QrCode, Download, Smartphone } from 'lucide-react'
import Link from 'next/link'
import { FadeIn } from '@/components/ui/fade-in'
import { SlideIn } from '@/components/ui/slide-in'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-info/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-8">
          {/* Animated Logo */}
          <FadeIn delay={0.1}>
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <QrCode className="w-10 h-10 text-primary" />
            </motion.div>
          </FadeIn>

          {/* Main Heading */}
          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Create, Customize & Scan
              <br />
              <span className="text-primary bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                QR Codes
              </span>{' '}
              Instantly
            </h1>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.3}>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Generate professional QR codes for URLs, contacts, WiFi, and more.{' '}
              <span className="text-foreground font-medium">
                Add icons to QR codes. All data stored locally on your device. Privacy-first, offline-first.
              </span>
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="text-lg px-8 h-14">
                  <Link href="#generator">
                    Generate QR Code Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </FadeIn>

          {/* App Download Section */}
          <FadeIn delay={0.5}>
            <div className="pt-12 border-t border-border/50 mt-12">
              <p className="text-sm text-muted-foreground mb-4">Download our mobile app</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href="https://play.google.com/store/apps/details?id=com.qrsnap.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-foreground text-background rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <Smartphone className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </motion.a>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-muted text-muted-foreground rounded-xl font-medium cursor-not-allowed opacity-60 shadow-lg"
                >
                  <Smartphone className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs">Coming soon</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

