'use client'

import { motion } from 'framer-motion'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Store, ShoppingCart, BarChart3, Printer } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { Badge } from '@/components/ui/badge'
import { ScreenshotRow } from '@/components/marketing/AppScreenshot'
import { shots } from '@/lib/screenshots'

const posFeatures = [
  { icon: Store, title: 'Shop & Inventory', description: 'Keep a local product list with prices and stock, all stored on the device.' },
  { icon: ShoppingCart, title: 'Scan-to-Cart Checkout', description: 'Scan a product barcode to add it to the cart, then complete the sale.' },
  { icon: BarChart3, title: 'Sales History & Reports', description: 'Review past sales and summaries without any account or server.' },
  { icon: Printer, title: 'Receipts', description: 'Generate PDF receipts or set up a thermal printer, where the platform allows it.' },
]

export function PointOfSale() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-premium-container text-premium border-premium-border">
            Lifetime Unlock
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Point of Sale</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Keep inventory, ring up sales, and print receipts from your phone. POS data stays on your device
            and backs up with your Lifetime tools.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {posFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            )
          })}
        </div>
        <ScreenshotRow shots={[shots.posNewSale, shots.posNewProduct, shots.posShopSettings]} size="md" />
      </div>
    </section>
  )
}
