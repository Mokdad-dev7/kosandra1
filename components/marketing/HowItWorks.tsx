'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { QrCode, Palette, Share2 } from 'lucide-react'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const steps = [
  {
    icon: QrCode,
    title: 'Create QR',
    description: 'Choose your QR code type and enter your data',
    color: 'text-info',
    bgColor: 'bg-info-container',
  },
  {
    icon: Palette,
    title: 'Customize',
    description: 'Add icons to personalize your QR codes',
    color: 'text-warning',
    bgColor: 'bg-warning-container',
  },
  {
    icon: Share2,
    title: 'Download & Share',
    description: 'Download in PNG or SVG format and share your QR codes',
    color: 'text-success',
    bgColor: 'bg-success-container',
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const lineProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1])

  return (
    <section ref={ref} className="py-20 bg-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to create professional QR codes
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2">
            <motion.div
              className="h-full bg-primary"
              style={{ scaleX: lineProgress, originX: 0 }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon
              const stepProgress = useTransform(
                scrollYProgress,
                [index * 0.33, (index + 1) * 0.33],
                [0, 1]
              )

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm z-10">
                    {index + 1}
                  </div>

                  {/* Step Card */}
                  <motion.div
                    style={{
                      scale: useTransform(stepProgress, [0, 1], [1, 1.05]),
                      boxShadow: useTransform(
                        stepProgress,
                        [0, 1],
                        ['0 4px 6px rgba(0,0,0,0.1)', '0 10px 25px rgba(0,0,0,0.15)']
                      ),
                    }}
                    className="bg-background rounded-2xl p-6 border text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={isInView ? { scale: 1 } : { scale: 0.8 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.2 + 0.3,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      className={`w-16 h-16 ${step.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className={`w-8 h-8 ${step.color}`} />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

