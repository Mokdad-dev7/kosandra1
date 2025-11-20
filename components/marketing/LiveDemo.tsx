'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { PhoneMockup } from '@/components/marketing/PhoneMockup'

export function LiveDemo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-200px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const phoneY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} className="py-32 relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left: Content */}
          <motion.div
            style={{ opacity: contentOpacity }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold"
            >
              See It In Action
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-xl text-muted-foreground"
            >
              Experience the power of QR Snap with our interactive demo. 
              Watch how easy it is to create, customize, and track your QR codes.
            </motion.p>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-3"
            >
              {[
                'Switch between different QR code types',
                'Customize colors and add your branding',
                'View real-time analytics and scan history',
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right: Phone Mockup with Parallax */}
          <motion.div
            style={{
              y: phoneY,
              opacity: phoneOpacity,
            }}
            className="relative"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

