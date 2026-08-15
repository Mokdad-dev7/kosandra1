'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FadeIn } from '@/components/ui/fade-in'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What types of QR codes can I create?',
    answer: 'You can create QR codes for URLs, plain text, email addresses, phone numbers, SMS messages, WiFi credentials, contact cards (vCard), calendar events, locations, social media links, and product barcodes (EAN, ISBN, etc.).',
  },
  {
    question: 'What are the pricing tiers?',
    answer: 'QR Snap is Free forever for scan and generate. Optional Lifetime Unlock ($9.99) removes ads and unlocks batch-from-gallery, backup/export/share, and Point of Sale. Extra URL safety check packs (30 / 100 / 250) add checks that never expire on that device. Everyone gets 5 free URL checks per day and unlimited email domain checks.',
  },
  {
    question: 'What are rewarded ads?',
    answer: 'Watch a short ad to earn +2 URL safety checks (Free and Lifetime users). Free users can also unlock a productivity feature once via rewarded ad. Max 2 ads per rolling 24 hours, 15-minute cooldown between them.',
  },
  {
    question: 'Are QR codes safe to scan?',
    answer: 'Scanning only reads data. Opening a link can be risky. QR Snap checks links for known threats and suspicious patterns and shows a clear result before you open them.',
  },
  {
    question: 'Is my data secure and private?',
    answer: 'History and created codes stay on your device. We don\'t require an account. Optional security checks send only what\'s needed for the check to our privacy-minded backend (see Privacy Policy). Purchased credit balances are tied to the app installation, not a login.',
  },
  {
    question: 'Can I backup my QR codes?',
    answer: 'With Lifetime Unlock you get local backup and restore. No cloud sync.',
  },
  {
    question: 'What export formats are available?',
    answer: 'Lifetime Unlock enables export in CSV, JSON, and image ZIP formats, plus sharing flows to any app on your device.',
  },
  {
    question: 'Does the app work offline?',
    answer: 'Scan, generate, history, and most actions work offline. Link safety checks and some product lookups require internet.',
  },
  {
    question: 'How do I scan QR codes?',
    answer: 'You can scan QR codes using your device camera in real-time, or select images from your gallery. Batch scanning from the camera is free; batch from gallery images requires Lifetime Unlock.',
  },
  {
    question: 'How is my QR code history stored?',
    answer: 'All your codes are stored locally on your device using Hive on-device storage. The app keeps a history of scanned and generated codes organized by date, and you can mark favorites for quick access. Your history never leaves your device.',
  },
  {
    question: 'What barcode and QR code formats are supported?',
    answer: 'QR Snap supports QR codes (all versions) plus common barcode formats including EAN-13, EAN-8, UPC, Code 128, Code 39, ITF, and more. The app can both generate and scan these formats.',
  },
  {
    question: 'Will QR codes with logos still scan properly?',
    answer: 'When you add a logo, the app bumps error correction to "High" (H), so up to 30% of the code can be covered and still scan. Test yours after adding a logo to be sure.',
  },
  {
    question: 'What features are coming?',
    answer: 'iOS is on the roadmap. No promised dates. Submit ideas through the Feedback page.',
  },
  {
    question: 'What happens to my URL check credits if I uninstall?',
    answer: 'Purchased URL credits are tied to the anonymous installation wallet. They cannot be restored after uninstalling, clearing app data, or moving to a new device. Lifetime Unlock restores with the same store account via Restore on the Plans screen.',
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
              Common questions about the app
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
