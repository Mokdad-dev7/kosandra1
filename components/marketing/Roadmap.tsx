'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Zap, Globe, Shield, Sparkles } from 'lucide-react'

const roadmapItems = [
  {
    icon: Globe,
    title: 'Multi-language Support',
    description: 'QR Snap will be available in 10+ languages',
    status: 'in-progress',
    date: 'Q2 2024',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Advanced security features for enterprise customers',
    status: 'planned',
    date: 'Q3 2024',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Suggestions',
    description: 'Get intelligent suggestions for QR code optimization',
    status: 'planned',
    date: 'Q4 2024',
  },
  {
    icon: Zap,
    title: 'Bulk QR Generation',
    description: 'Create hundreds of QR codes at once with CSV import',
    status: 'planned',
    date: 'Q1 2025',
  },
]

export function Roadmap() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What's Coming Next</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our roadmap for the future of QR code generation
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block">
            <motion.div
              className="h-full bg-primary origin-top"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="space-y-12">
            {roadmapItems.map((item, index) => {
              const Icon = item.icon
              const isActive = item.status === 'in-progress'

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex items-start gap-6"
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.2 + 0.3,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      className={`w-16 h-16 rounded-full ${
                        isActive ? 'bg-primary' : 'bg-muted'
                      } flex items-center justify-center border-4 border-background shadow-lg`}
                    >
                      <Icon className={`w-6 h-6 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                    </motion.div>
                    {isActive && (
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="absolute inset-0 rounded-full bg-primary"
                      />
                    )}
                  </div>

                  {/* Content Card */}
                  <motion.div
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className={`flex-1 bg-background rounded-xl p-6 border ${
                      isActive ? 'border-primary shadow-lg' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <p className="text-muted-foreground mb-3">{item.description}</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {item.status === 'in-progress' ? 'In Progress' : 'Planned'}
                    </span>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

