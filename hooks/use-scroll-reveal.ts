'use client'

import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function useScrollReveal(options?: { margin?: string; once?: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: options?.once ?? false, // Changed default to false so animations work on every scroll
    margin: options?.margin ?? '-100px',
  })

  return { ref, isInView }
}

