import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/get-session'
import { prisma } from '@/lib/db/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { QrCode, TrendingUp, Users, Zap } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { RecentQRCodes } from '@/components/dashboard/RecentQRCodes'

export default async function DashboardPage() {
  const session = await getSession()

  if (!session?.user) {
    redirect('/login')
  }

  // Preview mode - show demo data if database not available or Prisma not generated
  if (!prisma || !process.env.DATABASE_URL) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard (Preview Mode)</h1>
          <p className="text-muted-foreground">Database not configured - showing demo data</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total QR Codes</CardTitle>
              <QrCode className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">QR codes created</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">All-time scans</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Last 5 QR codes</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4 text-center">
              Database not configured. Set up DATABASE_URL in .env to enable full functionality.
            </p>
            <Button asChild>
              <Link href="/">Go to Landing Page</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const userId = session.user.id

  const [totalQRCodes, recentQRCodes, totalScans] = await Promise.all([
    prisma.qRCode.count({
      where: { userId },
    }),
    prisma.qRCode.findMany({
      where: { userId },
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { analytics: true },
        },
      },
    }),
    prisma.qRCodeAnalytics.count({
      where: {
        qrCode: {
          userId,
        },
      },
    }),
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {session.user.name || session.user.email}</p>
      </div>

        <DashboardStats
          totalQRCodes={totalQRCodes}
          totalScans={totalScans}
          recentCount={recentQRCodes.length}
        />

      <div className="grid gap-4 md:grid-cols-2">
        <RecentQRCodes qrCodes={recentQRCodes} />

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started quickly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/dashboard/qr-codes">Create New QR Code</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/analytics">View Analytics</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

