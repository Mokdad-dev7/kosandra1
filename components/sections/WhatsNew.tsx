'use client'

import { motion } from 'framer-motion'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Send, LayoutGrid } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { AppScreenshot } from '@/components/marketing/AppScreenshot'
import { shots } from '@/lib/screenshots'

const updates = [
  {
    icon: Send,
    title: 'Share to QR Snap',
    description:
      'Share a link, text, contact, or calendar event from any app and pick QR Snap. The right QR generator opens with everything filled in, and a shared link gets the site name as its title.',
    shot: shots.shareToCreate,
  },
  {
    icon: LayoutGrid,
    title: 'Home screen widgets',
    description:
      'Quick actions puts Scan, Gallery, Create, and Clipboard one tap away. Pinned QR keeps a code on your home screen, like your Wi-Fi or a payment link, ready for someone to scan. Free includes one Pinned QR; Lifetime Unlock pins as many as you like.',
    shot: shots.homeScreenWidgets,
  },
]

export function WhatsNew() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section ref={ref} id="whats-new" className="py-20 bg-muted/20 overflow-x-hidden scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
            New in 1.1.0
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Make a code from anywhere</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Turn whatever you are looking at into a QR code, and keep the one you use most on your home screen.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {updates.map((update, index) => {
            const Icon = update.icon
            return (
              <motion.div
                key={update.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-8"
              >
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{update.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{update.description}</CardDescription>
                  </CardHeader>
                </Card>
                <AppScreenshot shot={update.shot} size="md" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
