'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

// Number of screenshots (update this if you have a different number)
const SCREENSHOT_COUNT = 28

// Generate screenshot paths - tries both .jpg and .png
const generateScreenshotPaths = (count: number): string[] => {
  return Array.from({ length: count }, (_, i) => {
    const num = String(i + 1).padStart(2, '0')
    // Most are .jpg, but some are .png - we'll handle both
    return `/images/screenshots/screenshot-${num}.jpg`
  })
}

export function PhoneMockup() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [screenshots, setScreenshots] = useState<string[]>([])
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())
  const [imageSources, setImageSources] = useState<Map<number, string>>(new Map())

  // Generate screenshot paths
  const screenshotPaths = useMemo(() => generateScreenshotPaths(SCREENSHOT_COUNT), [])

  // Filter out screenshots that failed to load
  const validScreenshots = useMemo(() => {
    const valid: string[] = []
    screenshotPaths.forEach((path, index) => {
      if (!imageErrors.has(index)) {
        valid.push(imageSources.get(index) || path)
      }
    })
    return valid.length > 0 ? valid : screenshotPaths
  }, [screenshotPaths, imageErrors, imageSources])

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || validScreenshots.length === 0) return

    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % validScreenshots.length)
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, validScreenshots.length])

  // Handle image load errors - try .png if .jpg fails
  const handleImageError = (index: number, currentSrc: string) => {
    if (currentSrc.endsWith('.jpg')) {
      // Try .png version
      const pngSrc = currentSrc.replace('.jpg', '.png')
      setImageSources((prev) => new Map(prev).set(index, pngSrc))
    } else {
      // Both failed, mark as error
      setImageErrors((prev) => new Set(prev).add(index))
    }
  }

  // Navigation functions
  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentScreen((prev) => (prev + 1) % validScreenshots.length)
  }

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentScreen((prev) => (prev - 1 + validScreenshots.length) % validScreenshots.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentScreen(index)
  }

  // If no valid screenshots, show placeholder
  if (validScreenshots.length === 0) {
    return (
      <div className="relative mx-auto" style={{ width: '300px', height: '600px' }}>
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-gray-900 to-gray-800 p-2 shadow-2xl">
          <div className="h-full w-full rounded-[2.5rem] bg-muted/50 overflow-hidden relative flex items-center justify-center">
            <p className="text-muted-foreground text-sm text-center px-4">
              Add screenshots to /public/images/screenshots/
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative mx-auto" style={{ width: '300px', height: '600px' }}>
      {/* Phone Frame */}
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-gray-900 to-gray-800 p-2 shadow-2xl">
        <div className="h-full w-full rounded-[2.5rem] bg-background overflow-hidden relative">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10" />
          
          {/* Status Bar */}
          <div className="absolute top-2 left-0 right-0 flex justify-between items-center px-6 text-xs text-foreground z-10">
            <span>9:41</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-foreground" />
              <div className="w-1 h-1 rounded-full bg-foreground" />
              <div className="w-1 h-1 rounded-full bg-foreground" />
            </div>
          </div>

          {/* Screen Content */}
          <div className="h-full pt-12 pb-16 px-4 overflow-hidden relative">
            <AnimatePresence mode="wait">
              {validScreenshots.map((screenshot, index) => {
                if (index !== currentScreen) return null
                
                return (
                  <motion.div
                    key={`${screenshot}-${index}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full relative"
                  >
                    <img
                      src={screenshot}
                      alt={`App screenshot ${index + 1}`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        handleImageError(index, target.src)
                      }}
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {/* Navigation Arrows */}
            {validScreenshots.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors shadow-lg"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors shadow-lg"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Dots Indicator */}
          {validScreenshots.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 items-center">
              {validScreenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentScreen
                      ? 'w-2.5 h-2.5 bg-primary'
                      : 'w-2 h-2 bg-muted-foreground/40 hover:bg-muted-foreground/60'
                  }`}
                  aria-label={`Go to screenshot ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
