'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { QrCode } from 'lucide-react'

interface AnimatedLogoProps {
  size?: number
  showText?: boolean
  className?: string
}

export function AnimatedLogo({ size = 40, showText = true, className = '' }: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="QR Snap Home"
    >
      <motion.div
        className="relative"
        animate={{
          scale: isHovered ? [1, 1.1, 1] : 1,
          rotate: isHovered ? [0, 5, -5, 0] : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1],
          repeat: isHovered ? Infinity : 0,
          repeatDelay: 0.3,
        }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            boxShadow: isHovered
              ? [
                  '0 0 0px rgba(59, 130, 246, 0)',
                  '0 0 20px rgba(59, 130, 246, 0.4)',
                  '0 0 30px rgba(59, 130, 246, 0.6)',
                  '0 0 20px rgba(59, 130, 246, 0.4)',
                  '0 0 0px rgba(59, 130, 246, 0)',
                ]
              : '0 0 0px rgba(59, 130, 246, 0)',
          }}
          transition={{
            duration: 1.2,
            ease: 'easeInOut',
            repeat: isHovered ? Infinity : 0,
          }}
          style={{
            filter: 'blur(8px)',
            zIndex: -1,
          }}
        />
        
        {/* Logo container */}
        <motion.div
          className="relative overflow-hidden rounded-lg bg-transparent flex items-center justify-center"
          style={{ width: size, height: size }}
          whileHover={{
            borderRadius: '12px',
          }}
          transition={{ duration: 0.3 }}
        >
          {!imageError ? (
            <>
              <Image
                src="/images/logo.png"
                alt="QR Snap Logo"
                width={size}
                height={size}
                className="object-contain w-full h-full transition-all duration-300"
                priority
                unoptimized
                onError={() => setImageError(true)}
              />
              
              {/* Animated shimmer overlay effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  opacity: isHovered ? [0, 0.6, 0] : 0,
                  x: isHovered ? ['-100%', '100%'] : '-100%',
                }}
                transition={{
                  duration: 0.8,
                  ease: 'easeInOut',
                  repeat: isHovered ? Infinity : 0,
                  repeatDelay: 0.4,
                }}
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                }}
              />
            </>
          ) : (
            // Fallback icon if image fails to load
            <QrCode 
              className="w-5 h-5 text-primary" 
              style={{ width: size * 0.6, height: size * 0.6 }}
              aria-hidden="true"
            />
          )}
        </motion.div>
      </motion.div>

      {showText && (
        <motion.span
          className="font-semibold text-lg tracking-tight text-foreground"
          animate={{
            opacity: isHovered ? [1, 0.8, 1] : 1,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut',
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.3,
          }}
        >
          QR Snap
        </motion.span>
      )}
    </Link>
  )
}

