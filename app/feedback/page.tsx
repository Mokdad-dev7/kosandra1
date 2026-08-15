'use client'

import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { PageWrapper } from '@/components/ui/page-wrapper'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FadeIn } from '@/components/ui/fade-in'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { Mail, Send, MessageSquare } from 'lucide-react'

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    message: '',
    email: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.category || !formData.message) {
      alert('Please fill in the required fields (Category and Message)')
      return
    }
    
    const subject = encodeURIComponent(
      `[${formData.category}] ${formData.subject || 'Feedback'}`
    )
    const body = encodeURIComponent(
      `Category: ${formData.category}\n\n` +
      `Message:\n${formData.message}\n\n` +
      (formData.email ? `Reply Email: ${formData.email}\n` : '') +
      `\n---\nSent from QR Snap Feedback Form`
    )
    
    const mailtoLink = `mailto:ars.tech.app@gmail.com?subject=${subject}&body=${body}`
    
    // Try to open mailto link
    try {
      window.location.href = mailtoLink
    } catch (error) {
      // Fallback: copy to clipboard or show manual instructions
      const emailBody = `Subject: ${formData.category ? `[${formData.category}] ` : ''}${formData.subject || 'Feedback'}\n\nCategory: ${formData.category}\n\nMessage:\n${formData.message}\n\n${formData.email ? `Reply Email: ${formData.email}\n` : ''}`
      navigator.clipboard.writeText(`To: ars.tech.app@gmail.com\n\n${emailBody}`).then(() => {
        alert('Email content copied to clipboard! Please paste it into your email client and send to ars.tech.app@gmail.com')
      }).catch(() => {
        alert(`Please send an email to ars.tech.app@gmail.com with the following:\n\nSubject: ${formData.category ? `[${formData.category}] ` : ''}${formData.subject || 'Feedback'}\n\n${emailBody}`)
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
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Feedback</h1>
                <p className="text-xl text-muted-foreground">
                  We'd love to hear from you! Share your thoughts, report bugs, or suggest features.
                </p>
              </div>
            </FadeIn>

            <div className="max-w-2xl mx-auto">
              <FadeIn delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Send us your feedback
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll open your email client to send your message.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                          required
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bug">Bug Report</SelectItem>
                            <SelectItem value="feature">Feature Request</SelectItem>
                            <SelectItem value="question">Question</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Your Email (Optional)</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">
                          We'll use this to respond to your feedback if needed.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject (Optional)</Label>
                        <Input
                          id="subject"
                          type="text"
                          placeholder="Brief description of your feedback"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us what's on your mind..."
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          className="resize-none"
                        />
                        <p className="text-xs text-muted-foreground">
                          Please provide as much detail as possible. For bug reports, include steps to reproduce.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          type="submit"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!formData.category || !formData.message}
                        >
                          <Send className="w-4 h-4" />
                          Send Email
                        </button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn delay={0.2}>
                <Card className="mt-8 bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">What happens next?</h3>
                        <p>
                          When you click "Send Email", your default email app will open with 
                          a pre-filled message addressed to ars.tech.app@gmail.com. Review and send.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Response time</h3>
                        <p>
                          We aim to respond to all feedback within 2-3 business days. For urgent 
                          issues, please include "URGENT" in your subject line.
                        </p>
                      </div>
                    </div>
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

