import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/get-session'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { QrCode, LayoutDashboard, BarChart3, Settings, LogOut } from 'lucide-react'
import { SignOutButton } from '@/components/dashboard/SignOutButton'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In preview mode, allow access without authentication
  if (!process.env.DATABASE_URL) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <QrCode className="w-6 h-6" />
                  <span className="font-bold text-lg">QR Snap (Preview)</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Preview Mode</span>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </div>
    )
  }

  const session = await getSession()

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="flex items-center gap-2">
                <QrCode className="w-6 h-6" />
                <span className="font-bold text-lg">QR Snap</span>
              </Link>
              <div className="hidden md:flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/qr-codes"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  QR Codes
                </Link>
                <Link
                  href="/dashboard/analytics"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {session.user.name || session.user.email}
              </span>
              <SignOutButton />
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}

