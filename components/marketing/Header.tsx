'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { QrCode, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { SignOutButton } from '@/components/dashboard/SignOutButton'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
    { href: '/blog', label: 'Blog' },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-background/80 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <QrCode className="w-6 h-6 text-primary" />
            </motion.div>
            <span className="font-bold text-lg">QR Snap</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {session ? (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <SignOutButton />
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="block text-sm font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-border space-y-2">
                <div className="flex items-center justify-between px-2 py-2">
                  <span className="text-sm font-medium">Theme</span>
                  <ThemeToggle />
                </div>
                {session ? (
                  <>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <SignOutButton fullWidth />
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link href="/register">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

