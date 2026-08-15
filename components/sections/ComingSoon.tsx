'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Smartphone, Sparkles, Wrench } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { useRef } from 'react'

const upcomingFeatures = [
  {
    icon: Smartphone,
    title: 'iOS App',
    description: 'Bring the same Material design experience to iPhone and iPad',
    status: 'planned',
  },
  {
    icon: Wrench,
    title: 'Polish & Refinements',
    description: 'Continued improvements to performance, usability, and edge cases',
    status: 'in-progress',
  },
  {
    icon: Sparkles,
    title: 'More to Come',
    description: 'Submit ideas through the Feedback page',
    status: 'planned',
  },
]

export function ComingSoon() {
  const { ref, isInView } = useScrollReveal()
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  })

  const lineProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1])

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Roadmap</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          No promised dates, but these are on the list
        </p>
      </motion.div>

      <div ref={timelineRef} className="relative max-w-4xl mx-auto">
        {/* Timeline Line */}
        <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-border">
          <motion.div
            className="h-full bg-primary origin-top"
            style={{ scaleY: lineProgress }}
          />
        </div>

        <div className="space-y-12">
          {upcomingFeatures.map((feature, index) => {
            const Icon = feature.icon
            const isActive = feature.status === 'in-progress'

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
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-primary"
                    />
                  )}
                </div>

                {/* Feature Card */}
                <motion.div
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  className={`flex-1 bg-background rounded-xl p-6 border ${
                    isActive ? 'border-primary shadow-lg' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="mb-3">{feature.description}</CardDescription>
                  <motion.span
                    animate={isActive ? {
                      boxShadow: [
                        '0 0 10px rgba(59, 130, 246, 0.5)',
                        '0 0 20px rgba(59, 130, 246, 0.8)',
                        '0 0 10px rgba(59, 130, 246, 0.5)',
                      ],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {feature.status === 'in-progress' ? 'In Progress' : 'Planned'}
                  </motion.span>
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

