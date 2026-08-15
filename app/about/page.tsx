'use client'

import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { PageWrapper } from '@/components/ui/page-wrapper'
import { FadeIn } from '@/components/ui/fade-in'
import { motion } from 'framer-motion'
import { Users, Target, Heart } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedLogo } from '@/components/ui/AnimatedLogo'

const values = [
  {
    icon: Target,
    title: 'Mission',
    description: 'Let people scan QR codes and know whether a link is safe before opening it.',
  },
  {
    icon: Users,
    title: 'Approach',
    description: 'Your scans and codes stay on your device. No accounts, no tracking, works offline.',
  },
  {
    icon: Heart,
    title: 'Values',
    description: 'Transparent pricing, simple features, no dark patterns.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageWrapper>
        <div className="pt-16">
          <section className="container mx-auto px-4 py-20">
            <FadeIn>
              <div className="text-center mb-12 max-w-3xl mx-auto">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="inline-flex items-center justify-center mb-6"
                >
                  <AnimatedLogo size={100} showText={false} />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About QR Snap</h1>
                <p className="text-xl text-muted-foreground">
                  Developed by <span className="font-semibold text-foreground">Ars Technology</span>. 
                  QR &amp; barcode scanner with built-in link safety checks.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="max-w-4xl mx-auto space-y-8 mb-16">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Scan and generate QR codes and barcodes. Before you open a link, QR Snap checks it against
                    Google Web Risk threat data and shows you a clear safe/risk result.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Email domain validation confirms whether an address can receive mail. You don't need
                    security expertise. The checks run through a Cloudflare Worker backend that stores nothing.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Data stays on your device. No accounts, no cloud sync. Scanning, generating, and local history
                    all work offline. Built with Flutter, local Hive storage keeps your data on the device
                    using local Hive storage.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The free tier includes 5 URL safety checks per day and unlimited email domain checks. Optional
                    Lifetime Unlock ($9.99, one-time) removes ads and unlocks batch scanning from gallery,
                    backup/restore, export/share, and Point of Sale tools. URL check packs are available if you
                    need more than the daily allowance.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    QR Snap is currently live on Android (Google Play). iOS is planned with the same Material
                    design language.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mt-6">
                    <strong className="text-foreground">Developed by Ars Technology</strong>
                    <br />
                    <a 
                      href="mailto:ars.tech.app@gmail.com" 
                      className="text-primary hover:underline"
                    >
                      ars.tech.app@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <FadeIn key={index} delay={0.3 + index * 0.1}>
                    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <CardTitle>{value.title}</CardTitle>
                          <CardDescription>{value.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  </FadeIn>
                )
              })}
            </div>
          </section>
          <Footer />
        </div>
      </PageWrapper>
    </div>
  )
}
