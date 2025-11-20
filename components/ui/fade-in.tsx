'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FadeIn({ children, delay = 0, duration = 0.6, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-100px' }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.22, 1, 0.36, 1] // Smooth elastic easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

