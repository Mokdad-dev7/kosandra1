'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FadeIn } from '@/components/ui/fade-in'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What types of QR codes can I create?',
    answer: 'You can create QR codes for URLs, plain text, email addresses, phone numbers, SMS messages, WiFi credentials, contact cards (vCard), calendar events, locations, social media links, barcodes, and custom data.',
  },
  {
    question: 'Can I customize the appearance of my QR codes?',
    answer: 'Absolutely! You can customize colors (foreground and background), add your logo or images, adjust error correction levels, and modify the margin and size. The app automatically shapes and fits logos for optimal appearance.',
  },
  {
    question: 'What file formats can I download?',
    answer: 'You can download your QR codes in PNG (raster) or SVG (vector) formats. PNG is great for digital use, while SVG is perfect for print and scaling without quality loss.',
  },
  {
    question: 'How do I scan QR codes?',
    answer: 'You can scan QR codes using your device camera in real-time, or select images from your gallery. The app also supports batch scanning for multiple codes at once (Premium feature).',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes! All QR code data is stored locally on your device. We do not transmit your QR codes to external servers. The app includes security features like URL reputation checking and email domain validation to protect you from malicious content.',
  },
  {
    question: 'What are the premium tiers?',
    answer: 'We offer three one-time purchase tiers: Basic ($0.99) removes ads, Premium ($1.99) adds batch scanning and backup features, and Pro ($2.99) includes advanced security features like URL reputation checking and email domain validation.',
  },
  {
    question: 'Can I backup my QR codes?',
    answer: 'Yes! Premium and Pro tiers include backup and restore functionality. You can export your QR codes and restore them later or share them across devices.',
  },
  {
    question: 'Does the app work offline?',
    answer: 'Yes! QR code generation and scanning work completely offline. Security features like URL checking require an internet connection, but core functionality is available offline.',
  },
]

interface FAQProps {
  showHeading?: boolean
}

export function FAQ({ showHeading = true }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="max-w-4xl mx-auto">
      {showHeading && (
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about QR Snap
            </p>
          </div>
        </FadeIn>
      )}

      <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <motion.div
                initial={false}
                animate={{ height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-left pr-8" id={`faq-question-${index}`}>{faq.question}</CardTitle>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ 
                          duration: 0.4,
                          type: 'spring',
                          stiffness: 300,
                          damping: 25
                        }}
                      >
                        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      </motion.div>
                    </div>
                  </CardHeader>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ 
                        duration: 0.4,
                        type: 'spring',
                        stiffness: 300,
                        damping: 25
                      }}
                    >
                      <CardContent id={`faq-answer-${index}`} aria-labelledby={`faq-question-${index}`}>
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-muted-foreground"
                        >
                          {faq.answer}
                        </motion.p>
                      </CardContent>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            </FadeIn>
          ))}
        </div>
    </div>
  )
}

