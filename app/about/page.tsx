'use client'

import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { PageWrapper } from '@/components/ui/page-wrapper'
import { FadeIn } from '@/components/ui/fade-in'
import { motion } from 'framer-motion'
import { Users, Target, Heart } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedLogo } from '@/components/ui/AnimatedLogo'

const values = [
  {
    icon: Target,
    title: 'Mission',
    description: 'Give people a QR and barcode app that scans, creates, checks links, exports, and can run a small shop on the phone.',
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
                  QR and barcode scanner, generator, export tools, Point of Sale, and link safety checks.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="max-w-4xl mx-auto space-y-8 mb-16">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    QR Snap is an Android app from Ars Technology. You scan QR codes and barcodes with the
                    camera or from gallery images, generate 14+ types, and act on the result. URL safety
                    checks use Google Web Risk. Email domain (MX) validation is unlimited for everyone.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Codes stay on the device. No account, no cloud sync. Scan, generate, history, and Point
                    of Sale work offline. Built with Flutter and Hive local storage.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Free includes 5 URL checks per day and ads. Lifetime Unlock ($9.99 one-time) removes ads
                    and adds gallery batch scan, local backup and restore, export (CSV, JSON, image ZIP),
                    share, and Point of Sale. URL packs add 30, 100, or 250 checks that never expire on
                    that install.
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
