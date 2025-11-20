'use client'

import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { PageWrapper } from '@/components/ui/page-wrapper'
import { FadeIn } from '@/components/ui/fade-in'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, MapPin } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageWrapper>
        <div className="pt-16">
          <section className="container mx-auto px-4 py-20">
            <FadeIn>
              <div className="text-center mb-12 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
                <p className="text-xl text-muted-foreground">
                  Have questions? We'd love to hear from you.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Info */}
              <FadeIn delay={0.2}>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>Email</CardTitle>
                          <CardDescription>support@qrsnap.app</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>Support</CardTitle>
                          <CardDescription>Available 24/7</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>Location</CardTitle>
                          <CardDescription>Worldwide</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </FadeIn>

              {/* Contact Form */}
              <FadeIn delay={0.3}>
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                    <CardDescription>Fill out the form below and we'll get back to you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Your message" rows={6} />
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button type="submit" className="w-full">
                          Send Message
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </section>
          <Footer />
        </div>
      </PageWrapper>
    </div>
  )
}
