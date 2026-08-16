'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { heroShots } from '@/lib/screenshots'

export function PhoneMockup() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const total = heroShots.length
  const shot = heroShots[current]

  useEffect(() => {
    if (!autoPlay) return
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, 3500)
    return () => clearInterval(id)
  }, [autoPlay, total])

  const stopAndGo = (index: number) => {
    setAutoPlay(false)
    setCurrent((index + total) % total)
  }

  return (
    <div className="relative mx-auto w-[220px] sm:w-[260px] lg:w-[280px]">
      <div className="rounded-[2rem] bg-zinc-900 p-[6px] shadow-2xl ring-1 ring-black/25">
        <div className="relative overflow-hidden rounded-[1.55rem] bg-black">
          <AnimatePresence mode="wait">
            <motion.img
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-auto w-full"
              loading="eager"
              decoding="async"
            />
          </AnimatePresence>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => stopAndGo(current - 1)}
                className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => stopAndGo(current + 1)}
                className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70"
                aria-label="Next screenshot"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {total > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {heroShots.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => stopAndGo(index)}
              className={`rounded-full transition-all ${
                index === current ? 'h-2 w-5 bg-primary' : 'h-2 w-2 bg-muted-foreground/40'
              }`}
              aria-label={`Show ${item.caption ?? `screenshot ${index + 1}`}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
