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
    title: 'Our Mission',
    description: 'Make QR code generation accessible, powerful, and beautiful for everyone.',
  },
  {
    icon: Users,
    title: 'Our Team',
    description: 'A passionate team of developers and designers building the future of QR codes.',
  },
  {
    icon: Heart,
    title: 'Our Values',
    description: 'Privacy, security, and user experience are at the core of everything we do.',
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
                  Developed by <span className="font-semibold text-foreground">Ars Technology</span> - 
                  Building the most advanced QR code platform for businesses and individuals.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="max-w-4xl mx-auto space-y-8 mb-16">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    QR Snap is a fast, privacy-focused QR code scanner and generator built to be simple, secure, and reliable.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The app is developed using Flutter and designed with an offline-first approach, meaning scanning and QR creation work without an internet connection. All scanned and created QR codes are stored locally on your device — no accounts, no servers, and no data tracking.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    QR Snap supports multiple QR and barcode types and includes history and favorites to easily save, reuse, and manage important codes.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    For users who want extra protection, Premium and Pro plans offer optional security checks such as URL and email domain validation to help identify suspicious links before opening them.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Power users can unlock Pro features like QR export, backups, and batch tools, while free users can access core functionality with ads or temporarily unlock premium features through rewarded ads.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    QR Snap is built with transparency, performance, and user control in mind — offering only features that are clearly explained and genuinely useful.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mt-6">
                    <strong className="text-foreground">Developed by Ars Technology</strong>
                    <br />
                    <a 
                      href="mailto:ars.tech.app@gmail.com" 
                      className="text-primary hover:underline"
                    >
                      📧 ars.tech.app@gmail.com
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
