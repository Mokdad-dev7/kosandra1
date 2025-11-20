'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SlideInProps {
  children: ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  delay?: number
  duration?: number
  className?: string
}

export function SlideIn({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.5,
  className 
}: SlideInProps) {
  const directions = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
  }

  const initial = directions[direction]

  return (
    <motion.div
      initial={{ opacity: 0, ...initial }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, margin: '-100px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

