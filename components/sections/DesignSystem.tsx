'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sun, Moon, Palette, Type } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { AppScreenshot } from '@/components/marketing/AppScreenshot'
import { shots } from '@/lib/screenshots'

export function DesignSystem() {
  const { ref, isInView } = useScrollReveal()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const isDark = resolvedTheme === 'dark'

  const colors = [
    { name: 'Primary', class: 'bg-primary', hex: '#000000' },
    { name: 'Success', class: 'bg-success', hex: '#4CAF50' },
    { name: 'Error', class: 'bg-error', hex: '#E57373' },
    { name: 'Warning', class: 'bg-warning', hex: '#FF9800' },
    { name: 'Info', class: 'bg-info', hex: '#2196F3' },
    { name: 'Premium', class: 'bg-premium', hex: '#FFC107' },
  ]

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">UI/UX Design System</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Built with Material 3 design principles
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Light / Dark Mode
              </CardTitle>
              <CardDescription>Seamless theme switching</CardDescription>
            </CardHeader>
            <CardContent>
              {mounted ? (
                <motion.button
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                  className="w-full h-16 rounded-lg bg-muted flex items-center justify-center relative overflow-hidden"
                >
                  <motion.span
                    initial={false}
                    animate={{
                      rotate: isDark ? 90 : 0,
                      scale: isDark ? 0 : 1,
                      opacity: isDark ? 0 : 1,
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="absolute inset-0 flex items-center justify-center gap-2"
                  >
                    <Sun className="w-6 h-6" />
                    <span className="text-sm font-medium">Light</span>
                  </motion.span>
                  <motion.span
                    initial={false}
                    animate={{
                      rotate: isDark ? 0 : -90,
                      scale: isDark ? 1 : 0,
                      opacity: isDark ? 1 : 0,
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="absolute inset-0 flex items-center justify-center gap-2"
                  >
                    <Moon className="w-6 h-6" />
                    <span className="text-sm font-medium">Dark</span>
                  </motion.span>
                </motion.button>
              ) : (
                <div className="w-full h-16 rounded-lg bg-muted flex items-center justify-center">
                  <Sun className="w-6 h-6" />
                </div>
              )}
            </CardContent>
          </Card>
          <div className="mt-6 flex justify-center">
            <AppScreenshot shot={shots.qrcodePreview} size="sm" />
          </div>
        </motion.div>

        {/* Typography */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5" />
                Typography
              </CardTitle>
              <CardDescription>Clean, readable fonts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-3xl font-bold mb-1">Heading 1</h3>
                <p className="text-sm text-muted-foreground">Bold, 3xl</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-1">Heading 2</h3>
                <p className="text-sm text-muted-foreground">Semibold, 2xl</p>
              </div>
              <div>
                <p className="text-base mb-1">Body text</p>
                <p className="text-sm text-muted-foreground">Regular, base</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Color Palette */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>Semantic colors that adapt to theme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {colors.map((color, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <motion.div
                      className={`w-full h-20 rounded-lg ${color.class} mb-2`}
                      whileHover={{
                        boxShadow: `0 10px 30px ${color.hex}40`,
                      }}
                    />
                    <p className="text-sm font-medium">{color.name}</p>
                    <p className="text-xs text-muted-foreground">{color.hex}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      </div>
    </section>
  )
}

