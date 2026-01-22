'use client'

import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { PageWrapper } from '@/components/ui/page-wrapper'
import { FadeIn } from '@/components/ui/fade-in'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.message) {
      alert('Please fill in the required fields (Name and Message)')
      return
    }
    
    const subject = encodeURIComponent(
      `Contact from ${formData.name}${formData.email ? ` (${formData.email})` : ''}`
    )
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      (formData.email ? `Email: ${formData.email}\n` : '') +
      `\nMessage:\n${formData.message}\n\n` +
      `---\nSent from QR Snap Contact Form`
    )
    
    const mailtoLink = `mailto:ars.tech.app@gmail.com?subject=${subject}&body=${body}`
    
    // Try to open mailto link
    try {
      window.location.href = mailtoLink
    } catch (error) {
      // Fallback: copy to clipboard or show manual instructions
      const emailBody = `Subject: Contact from ${formData.name}${formData.email ? ` (${formData.email})` : ''}\n\nName: ${formData.name}\n${formData.email ? `Email: ${formData.email}\n` : ''}\nMessage:\n${formData.message}`
      navigator.clipboard.writeText(`To: ars.tech.app@gmail.com\n\n${emailBody}`).then(() => {
        alert('Email content copied to clipboard! Please paste it into your email client and send to ars.tech.app@gmail.com')
      }).catch(() => {
        alert(`Please send an email to ars.tech.app@gmail.com with the following:\n\n${emailBody}`)
      })
    }
  }

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
                          <CardDescription>
                            <a href="mailto:ars.tech.app@gmail.com" className="hover:text-primary transition-colors">
                              ars.tech.app@gmail.com
                            </a>
                          </CardDescription>
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
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input 
                          id="name" 
                          placeholder="Your name" 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email (Optional)</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">
                          We'll use this to respond to your message if needed.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Your message" 
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          className="resize-none"
                        />
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          type="submit" 
                          className="w-full inline-flex items-center justify-center gap-2"
                          disabled={!formData.name || !formData.message}
                        >
                          <Send className="w-4 h-4" />
                          Send Message
                        </Button>
                      </motion.div>
                      <p className="text-xs text-muted-foreground text-center">
                        Clicking "Send Message" will open your email client with a pre-filled message to ars.tech.app@gmail.com
                      </p>
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
