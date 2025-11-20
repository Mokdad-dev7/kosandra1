import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/get-session'
import { prisma } from '@/lib/db/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BarChart3, TrendingUp, Globe, Smartphone } from 'lucide-react'

export default async function AnalyticsPage() {
  // Preview mode - show demo analytics
  if (!process.env.DATABASE_URL) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics (Preview Mode)</h1>
          <p className="text-muted-foreground">Database not configured - showing demo data</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">All-time scans</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4 text-center">
              Set up DATABASE_URL in .env to enable analytics tracking.
            </p>
            <Button asChild>
              <Link href="/">Go to Landing Page</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const session = await getSession()

  if (!session?.user) {
    redirect('/login')
  }

  const userId = session.user.id

  if (!prisma) {
    // Already handled in preview mode check above, but double-check
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics (Preview Mode)</h1>
          <p className="text-muted-foreground">Prisma Client not generated</p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4 text-center">
              Run "npm run db:generate" to generate Prisma Client.
            </p>
            <Button asChild>
              <Link href="/">Go to Landing Page</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const [totalScans, scansByDate, scansByDevice] = await Promise.all([
    prisma.qRCodeAnalytics.count({
      where: {
        qrCode: {
          userId,
        },
      },
    }),
    prisma.qRCodeAnalytics.groupBy({
      by: ['scannedAt'],
      where: {
        qrCode: {
          userId,
        },
      },
      _count: {
        id: true,
      },
      orderBy: {
        scannedAt: 'desc',
      },
      take: 30,
    }),
    prisma.qRCodeAnalytics.groupBy({
      by: ['userAgent'],
      where: {
        qrCode: {
          userId,
        },
      },
      _count: {
        id: true,
      },
    }),
  ])

  // Simple device detection from user agent
  const deviceStats = scansByDevice.reduce(
    (acc, item) => {
      const ua = item.userAgent || ''
      if (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')) {
        acc.mobile += item._count.id
      } else {
        acc.desktop += item._count.id
      }
      return acc
    },
    { mobile: 0, desktop: 0 }
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">Track your QR code performance</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalScans}</div>
            <p className="text-xs text-muted-foreground">All-time scans</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scansByDate.length}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mobile Scans</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deviceStats.mobile}</div>
            <p className="text-xs text-muted-foreground">
              {totalScans > 0
                ? Math.round((deviceStats.mobile / totalScans) * 100)
                : 0}
              % of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Desktop Scans</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deviceStats.desktop}</div>
            <p className="text-xs text-muted-foreground">
              {totalScans > 0
                ? Math.round((deviceStats.desktop / totalScans) * 100)
                : 0}
              % of total
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
          <CardDescription>Last 30 days of activity</CardDescription>
        </CardHeader>
        <CardContent>
          {scansByDate.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No scans yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {scansByDate.slice(0, 10).map((scan, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {new Date(scan.scannedAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(scan.scannedAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{scan._count.id}</p>
                    <p className="text-xs text-muted-foreground">scans</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

