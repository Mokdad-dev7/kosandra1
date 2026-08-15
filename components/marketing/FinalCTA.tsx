'use client'

import { motion } from 'framer-motion'
import { Smartphone } from 'lucide-react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="py-32 relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-info/5"
    >
      {/* Animated background gradient */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute inset-0 opacity-50"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)',
          backgroundSize: '200% 200%',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            Ready to Get Started?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl text-muted-foreground"
          >
            Download the app and start creating professional QR codes today.
          </motion.p>

          {/* App Download Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
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
        </motion.div>
      </div>
    </section>
  )
}

