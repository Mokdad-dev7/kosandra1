'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedLogo } from '@/components/ui/AnimatedLogo'

interface FooterSection {
  title: string
  links: Array<{
    href: string
    label: string
  }>
}

const footerSections: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { href: '/features', label: 'Features' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: '/help', label: 'Help Center' },
      { href: '/faq', label: 'FAQ' },
      { href: '/feedback', label: 'Feedback' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
    ],
  },
]

export function Footer() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set())

  const toggleSection = (title: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(title)) {
        next.delete(title)
      } else {
        next.add(title)
      }
      return next
    })
  }

  return (
    <footer className="relative border-t border-border/50 bg-background">
      {/* Subtle divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
            {/* Branding Section */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <AnimatedLogo size={64} showText={true} />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Create, customize, and scan QR codes with ease. Privacy-first, offline-first.
              </p>
              <p className="text-xs text-muted-foreground/60 mt-4">
                Created by{' '}
                <a 
                  href="mailto:ars.tech.app@gmail.com" 
                  className="hover:text-primary transition-colors font-medium"
                >
                  Ars Technology
                </a>
              </p>
            </div>

            {/* Navigation Sections - Desktop */}
            <div className="hidden md:grid md:grid-cols-3 md:col-span-3 gap-8 lg:gap-12">
              {footerSections.map((section) => (
                <nav key={section.title} aria-label={section.title}>
                  <h3 className="font-semibold text-sm text-foreground mb-5 tracking-tight">
                    {section.title}
                  </h3>
                  <ul className="space-y-3.5" role="list">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group relative inline-block text-sm text-muted-foreground hover:text-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                        >
                          <span className="relative">
                            {link.label}
                            <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-200 group-hover:w-full opacity-0 group-hover:opacity-100" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>

            {/* Mobile Accordion */}
            <div className="md:hidden space-y-4">
              {footerSections.map((section) => {
                const isOpen = openSections.has(section.title)
                return (
                  <div key={section.title} className="border-b border-border/50 last:border-0">
                    <button
                      type="button"
                      onClick={() => toggleSection(section.title)}
                      className="w-full flex items-center justify-between py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                      aria-expanded={isOpen}
                      aria-controls={`footer-section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <h3 className="font-semibold text-sm text-foreground tracking-tight">
                        {section.title}
                      </h3>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          id={`footer-section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <nav aria-label={section.title} className="pb-4">
                            <ul className="space-y-3.5" role="list">
                              {section.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </nav>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Copyright Section */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-border/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground/80 text-center sm:text-left">
                &copy; {new Date().getFullYear()} QR Snap by{' '}
                <a 
                  href="mailto:ars.tech.app@gmail.com" 
                  className="hover:text-primary transition-colors font-medium"
                >
                  Ars Technology
                </a>
                . All rights reserved.
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground/60">
                <span>Made with</span>
                <span className="text-red-500" aria-label="love">♥</span>
                <span>by Ars Technology</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
