'use client'

import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { PageWrapper } from '@/components/ui/page-wrapper'
import { FadeIn } from '@/components/ui/fade-in'
import { motion } from 'framer-motion'
import { QrCode, Users, Target, Heart } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6"
                >
                  <QrCode className="w-10 h-10 text-primary" />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About QR Snap</h1>
                <p className="text-xl text-muted-foreground">
                  We're building the most advanced QR code platform for businesses and individuals.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="max-w-4xl mx-auto space-y-8 mb-16">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    QR Snap was born from a simple idea: QR codes should be beautiful, functional, and easy to use. 
                    We've built a platform that combines powerful features with an intuitive interface, making it 
                    the go-to solution for QR code generation and management.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our team is committed to providing the best possible experience, with continuous updates, 
                    new features, and unwavering focus on security and privacy.
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
