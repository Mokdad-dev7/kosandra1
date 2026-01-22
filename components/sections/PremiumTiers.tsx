'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Crown } from 'lucide-react'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const tiers = [
  {
    name: 'Basic',
    price: '$0.99',
    description: 'Remove ads and enjoy an ad-free experience',
    features: [
      'Remove all advertisements',
      'Unlimited QR code generation',
      'Icon customization',
    ],
    popular: false,
  },
  {
    name: 'Premium',
    price: '$1.99',
    description: 'Security features to protect you',
    features: [
      'Everything in Basic',
      'URL Domain Security Check',
      'Email Domain Validation',
      'Protection from malicious content',
    ],
    popular: true,
  },
  {
    name: 'Pro',
    price: '$2.99',
    description: 'Advanced features for power users',
    features: [
      'Everything in Premium',
      'Batch QR code scanning',
      'Export & backup functionality',
      'Local backup and restore',
    ],
    popular: false,
    isPro: true,
  },
]

export function PremiumTiers() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section ref={ref} className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Premium Tiers</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that fits your needs. Free users can also access premium features temporarily via rewarded ads (24-hour access).
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
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
              <Card className={`h-full relative ${
                tier.popular ? 'border-primary border-2 shadow-xl' : ''
              } ${tier.isPro ? 'border-premium border-2' : ''}`}>
                {tier.isPro && (
                  <motion.div
                    animate={{
                      background: [
                        'linear-gradient(45deg, rgba(255, 193, 7, 0.1), rgba(255, 215, 0, 0.1))',
                        'linear-gradient(45deg, rgba(255, 215, 0, 0.2), rgba(255, 193, 7, 0.2))',
                        'linear-gradient(45deg, rgba(255, 193, 7, 0.1), rgba(255, 215, 0, 0.1))',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 rounded-lg pointer-events-none"
                  />
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    {tier.isPro && (
                      <Crown className="w-6 h-6 text-premium" />
                    )}
                    {tier.popular && (
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="text-4xl font-bold mt-2">{tier.price}</div>
                  <div className="text-sm text-muted-foreground">one-time purchase</div>
                  <CardDescription className="mt-2">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, i) => (
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
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      asChild 
                      className="w-full" 
                      variant={tier.popular || tier.isPro ? 'default' : 'outline'}
                    >
                      <Link href="#generator">Get Started</Link>
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

