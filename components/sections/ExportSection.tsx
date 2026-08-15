'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, FileJson, Archive, Download, Share2 } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { Badge } from '@/components/ui/badge'

const exportOptions = [
  { icon: FileText, name: 'CSV Export', description: 'Export your codes as a CSV spreadsheet', premium: true },
  { icon: FileJson, name: 'JSON Export', description: 'Export your codes as structured JSON data', premium: true },
  { icon: Archive, name: 'Images ZIP', description: 'Export code images together as a ZIP archive', premium: true },
  { icon: Download, name: 'Backup & Restore', description: 'Save a local backup and restore it later on this device', premium: true },
  { icon: Share2, name: 'Share Flows', description: 'Send codes and results to any app on your device', premium: true },
]

export function ExportSection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Export & Backup</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Export, backup, and share are included with Lifetime Unlock. Free users can scan, generate, and keep local history. No cloud sync.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {exportOptions.map((option, index) => {
          const Icon = option.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className={`h-full hover:shadow-xl transition-shadow duration-300 ${
                option.premium ? 'border-premium-border bg-premium-container/30' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    {option.premium && (
                      <Badge className="bg-premium-container text-premium border-premium-border">
                        Lifetime
                      </Badge>
                    )}
                  </div>
                  <CardTitle>{option.name}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                {option.premium && (
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 10px rgba(255, 193, 7, 0.3)',
                        '0 0 20px rgba(255, 193, 7, 0.5)',
                        '0 0 10px rgba(255, 193, 7, 0.3)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-lg pointer-events-none"
                  />
                )}
              </Card>
            </motion.div>
          )
        })}
      </div>
      </div>
    </section>
  )
}

