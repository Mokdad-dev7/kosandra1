'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { QrCode } from 'lucide-react'
import { useState, useEffect } from 'react'

export function PhoneMockup() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const screens = ['home', 'generator', 'history']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % screens.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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
          <div className="h-full pt-12 pb-4 px-4 overflow-hidden">
            <AnimatePresence mode="wait">
              {currentScreen === 0 && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <HomeScreen />
                </motion.div>
              )}
              {currentScreen === 1 && (
                <motion.div
                  key="generator"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <GeneratorScreen />
                </motion.div>
              )}
              {currentScreen === 2 && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <HistoryScreen />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

function HomeScreen() {
  return (
    <div className="h-full flex flex-col">
      <div className="text-center mb-6">
        <QrCode className="w-12 h-12 mx-auto mb-2 text-primary" />
        <h2 className="text-lg font-bold">QR Snap</h2>
      </div>
      <div className="flex-1 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-muted rounded-lg p-3 h-20 animate-pulse" />
        ))}
      </div>
    </div>
  )
}

function GeneratorScreen() {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-bold mb-4">Create QR Code</h2>
      <div className="flex-1 bg-muted rounded-lg flex items-center justify-center">
        <div className="w-32 h-32 bg-foreground/10 rounded-lg flex items-center justify-center">
          <QrCode className="w-16 h-16 text-primary" />
        </div>
      </div>
    </div>
  )
}

function HistoryScreen() {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-bold mb-4">My QR Codes</h2>
      <div className="flex-1 space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-muted rounded-lg p-2 h-16 flex items-center gap-2">
            <div className="w-12 h-12 bg-foreground/10 rounded" />
            <div className="flex-1">
              <div className="h-3 bg-foreground/20 rounded w-3/4 mb-1" />
              <div className="h-2 bg-foreground/10 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

