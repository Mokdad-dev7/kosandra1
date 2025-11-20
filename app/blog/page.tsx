import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Footer } from '@/components/marketing/Footer'
import Link from 'next/link'

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground text-lg">
            Coming soon - Tips, tutorials, and updates about QR codes
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">
              Our blog is coming soon. Check back for articles about QR code best practices,
              marketing tips, and platform updates.
            </p>
            <Link href="/" className="text-primary hover:underline">
              ← Back to Home
            </Link>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}

