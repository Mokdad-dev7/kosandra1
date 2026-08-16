'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Crown, Info } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { AppScreenshot } from '@/components/marketing/AppScreenshot'
import { shots } from '@/lib/screenshots'

const plans = [
  {
    name: 'Free',
    price: '$0',
    priceNote: 'forever',
    description: 'Scan, generate, and organize codes',
    features: [
      'Scan and generate QR codes & barcodes',
      'History, favorites, and folders',
      '5 URL safety checks per day',
      'Unlimited email domain checks',
      'Rewarded ads for +2 URL checks',
      'Supported by banner and interstitial ads',
    ],
  },
  {
    name: 'Lifetime Unlock',
    price: '$9.99',
    priceNote: 'one-time purchase',
    description: 'Remove ads and unlock backup, export, batch gallery, and POS',
    features: [
      'Ads removed permanently',
      'Batch scanning from gallery images',
      'Local backup and restore',
      'Export and share (CSV, JSON, image ZIP)',
      'Point of Sale tools',
      'Still 5 URL safety checks per day',
    ],
    highlighted: true,
  },
]

const creditPacks = [
  { name: 'Starter Pack', price: '$0.99', checks: '+30 URL checks' },
  { name: 'Standard Pack', price: '$2.99', checks: '+100 URL checks' },
  { name: 'Value Pack', price: '$4.99', checks: '+250 URL checks', best: true },
]

export function Pricing() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section ref={ref} id="pricing" className="py-20 bg-muted/20 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Plans &amp; Pricing</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Free covers scanning and generating. A one-time purchase removes ads and unlocks the extras.
            URL check packs add more safety checks if you run through the daily five.
          </p>
        </motion.div>

        <div className="mb-12">
          <AppScreenshot shot={shots.pricingPlans} size="lg" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card className={`h-full relative ${plan.highlighted ? 'border-premium border-2 shadow-xl' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2 min-h-6">
                    {plan.highlighted && <Crown className="w-6 h-6 text-premium" />}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold mt-2">{plan.price}</div>
                  <div className="text-sm text-muted-foreground">{plan.priceNote}</div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.1 + i * 0.05 + 0.3 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-4 h-4 text-success flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">URL Safety Check Packs</h3>
            <p className="text-muted-foreground">
              Need more than 5 checks a day? Packs add checks that never expire on that device.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {creditPacks.map((pack, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className={`h-full text-center ${pack.best ? 'border-primary border-2' : ''}`}>
                  <CardHeader>
                    {pack.best && (
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded self-center mb-2">
                        BEST VALUE
                      </span>
                    )}
                    <CardTitle className="text-lg">{pack.name}</CardTitle>
                    <div className="text-3xl font-bold mt-1">{pack.price}</div>
                    <CardDescription className="mt-1">{pack.checks}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-10"
        >
          <Card className="bg-muted/40">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Checks are used in this order: your free daily checks, then rewarded-ad bonuses, then purchased
                    credits. Failed or inconclusive checks do not consume credits.
                  </p>
                  <p>
                    Purchased URL credits are tied to the anonymous wallet on that installation. They{' '}
                    <strong className="text-foreground">cannot be restored</strong> after uninstalling, clearing app
                    data, or moving to a new device. Lifetime Unlock does restore with the same store account using
                    Restore on the Plans screen.
                  </p>
                  <p>
                    Prices shown in USD as a reference. Localized Google Play and App Store prices are authoritative
                    in the app.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
