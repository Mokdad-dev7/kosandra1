'use client'

import { motion } from 'framer-motion'
import { Smartphone } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

export function DownloadBar() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section id="download" ref={ref} className="py-12 bg-muted/30 border-y border-border/50 scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto"
        >
          <p className="text-sm text-muted-foreground">Download our mobile app</p>
          
          {/* Google Play - Active */}
          <motion.a
            href="https://play.google.com/store/apps/details?id=com.ars.qr_snap"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-foreground text-background rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Smartphone className="w-5 h-5" />
            <div className="text-left">
              <div className="text-xs opacity-80">Get it on</div>
              <div className="text-sm font-bold">Google Play</div>
            </div>
          </motion.a>

          {/* App Store - Coming Soon */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative inline-flex items-center gap-3 px-6 py-3 bg-muted text-muted-foreground rounded-xl font-medium cursor-not-allowed opacity-60 shadow-lg"
          >
            <Smartphone className="w-5 h-5" />
            <div className="text-left">
              <div className="text-xs">Coming soon</div>
              <div className="text-sm font-bold">App Store</div>
            </div>
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 bg-premium text-premium-on text-xs px-2 py-1 rounded-full font-semibold"
            >
              Soon
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

