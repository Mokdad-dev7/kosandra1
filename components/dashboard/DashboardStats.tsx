'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { QrCode, TrendingUp, Zap } from 'lucide-react'
import { FadeIn } from '@/components/ui/fade-in'
import { motion } from 'framer-motion'

interface DashboardStatsProps {
  totalQRCodes: number
  totalScans: number
  recentCount: number
}

export function DashboardStats({ totalQRCodes, totalScans, recentCount }: DashboardStatsProps) {
  const stats = [
    {
      title: 'Total QR Codes',
      value: totalQRCodes,
      icon: QrCode,
      description: 'QR codes created',
      color: 'text-info',
      bgColor: 'bg-info-container',
    },
    {
      title: 'Total Scans',
      value: totalScans,
      icon: TrendingUp,
      description: 'All-time scans',
      color: 'text-success',
      bgColor: 'bg-success-container',
    },
    {
      title: 'Recent Activity',
      value: recentCount,
      icon: Zap,
      description: 'Last 5 QR codes',
      color: 'text-warning',
      bgColor: 'bg-warning-container',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <FadeIn key={index} delay={index * 0.1}>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <motion.div
                    className={`${stat.bgColor} p-2 rounded-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                    className="text-2xl font-bold"
                  >
                    {stat.value.toLocaleString()}
                  </motion.div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          </FadeIn>
        )
      })}
    </div>
  )
}

