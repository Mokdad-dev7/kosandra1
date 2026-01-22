'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started',
    features: ['Unlimited QR codes', 'Icon customization', 'Local storage'],
    popular: false,
  },
  {
    name: 'Pro',
    price: '$2.99',
    description: 'For professionals',
    features: ['Everything in Free', 'Batch scanning', 'Local backup & restore', 'Premium security features'],
    popular: true,
  },
]

export function PricingPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that fits your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateY: -15 }}
              animate={isInView ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: -15 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className={`h-full ${plan.popular ? 'border-primary border-2 shadow-xl' : ''}`}>
                <CardHeader>
                  {plan.popular && (
                    <div className="text-xs font-semibold text-primary mb-2 bg-premium-container px-2 py-1 rounded w-fit">
                      POPULAR
                    </div>
                  )}
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold mt-2">{plan.price}</div>
                  {plan.price !== '$0' && <div className="text-sm text-muted-foreground">one-time</div>}
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-success flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button asChild className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                      <Link href="#download">Get Started</Link>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

