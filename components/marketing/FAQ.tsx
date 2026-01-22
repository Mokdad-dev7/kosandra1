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
    answer: 'Yes! You can add icons to your QR codes. The app automatically shapes and fits icons for optimal appearance while maintaining scannability.',
  },
  {
    question: 'What export formats are available?',
    answer: 'Export features are Pro tier only. You can export QR codes in CSV, JSON, images ZIP, or parsed text formats. All exports are stored locally on your device.',
  },
  {
    question: 'How do I scan QR codes?',
    answer: 'You can scan QR codes using your device camera in real-time, or select images from your gallery. The app also supports batch scanning for multiple codes at once (Pro feature).',
  },
  {
    question: 'Is my data secure and private?',
    answer: 'Yes! All QR code data is stored locally on your device. We do not transmit your QR codes to external servers. Premium and Pro tiers include optional security features (URL Domain Security Check and Email Domain Validation) that use secure APIs but store no data externally. Your privacy is our priority - we never collect or share your personal data.',
  },
  {
    question: 'Are QR codes safe to scan?',
    answer: 'QR Snap includes optional security features to help protect you. Premium and Pro tiers include URL Domain Security Check and Email Domain Validation to warn you about potentially malicious content. These checks are performed via secure APIs and do not store your data. However, always exercise caution when scanning QR codes from unknown sources.',
  },
  {
    question: 'What barcode and QR code formats are supported?',
    answer: 'QRSnap supports QR codes (all versions), as well as common barcode formats including EAN-13, EAN-8, UPC-A, UPC-E, Code 128, Code 39, ITF, and Codabar. The app can both generate and scan these formats.',
  },
  {
    question: 'Will QR codes with logos still scan properly?',
    answer: 'Yes! When you add a logo to your QR code, QRSnap automatically adjusts the error correction level to "High" (H), which allows up to 30% of the code to be obscured while still remaining scannable. The app also optimizes logo placement and size to ensure maximum scannability. We recommend testing your QR code after adding a logo to ensure it scans correctly.',
  },
  {
    question: 'Does the app work offline?',
    answer: 'Yes! QR code generation and scanning work completely offline. All core functionality is available without an internet connection. Security features like URL Domain Security Check and Email Domain Validation (Premium/Pro tiers) require an internet connection but store no data. Basic scanning and generation work entirely offline.',
  },
  {
    question: 'How is my QR code history stored?',
    answer: 'All your QR codes are stored locally on your device. The app maintains a history of all generated and scanned QR codes, organized by date. You can mark favorites for quick access. Pro tier includes local backup and restore functionality, allowing you to export your history to a local file and restore it later. Your history never leaves your device unless you explicitly choose to back it up. No cloud sync.',
  },
  {
    question: 'What are the pricing tiers?',
    answer: 'QR Snap offers three one-time purchase tiers: Basic ($0.99) removes ads, Premium ($1.99) adds URL Domain Security Check and Email Domain Validation, and Pro ($2.99) includes all Premium features plus batch scanning and local backup/restore. Free users can also access premium features temporarily via rewarded ads (24-hour access).',
  },
  {
    question: 'What features are coming in future updates?',
    answer: 'We\'re constantly working on improving QR Snap! You can submit feature requests through our feedback page. All updates maintain our privacy-first, offline-first approach with local storage.',
  },
  {
    question: 'Can I backup my QR codes?',
    answer: 'Yes! Pro tier includes local backup and restore functionality. You can export all your QR codes to a local file and restore them later. Backups are stored locally on your device - no cloud sync. This is a Pro-only feature.',
  },
  {
    question: 'What are rewarded ads?',
    answer: 'Free users can watch rewarded ads to temporarily access premium features for 24 hours. This includes security features (Premium tier) and advanced features like batch scanning and backup (Pro tier). Access expires after 24 hours and can be renewed by watching another ad. Usage limits apply to prevent abuse.',
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

