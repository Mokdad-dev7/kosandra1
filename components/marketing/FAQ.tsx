'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FadeIn } from '@/components/ui/fade-in'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs } from '@/lib/faqs'

interface FAQProps {
  showHeading?: boolean
}

export function FAQ({ showHeading = true }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="max-w-4xl mx-auto w-full px-4">
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
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-left min-w-0 flex-1 break-words text-base sm:text-lg leading-snug" id={`faq-question-${index}`}>{faq.question}</CardTitle>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ 
                          duration: 0.4,
                          type: 'spring',
                          stiffness: 300,
                          damping: 25
                        }}
                        className="flex-shrink-0 mt-0.5"
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
