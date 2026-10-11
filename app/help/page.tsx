'use client'

import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { PageWrapper } from '@/components/ui/page-wrapper'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FadeIn } from '@/components/ui/fade-in'
import { 
  Scan, 
  QrCode, 
  Download, 
  Share2, 
  Shield, 
  Settings,
} from 'lucide-react'

const tutorials = [
  {
    icon: Scan,
    title: 'Scanning QR Codes',
    description: 'Learn how to scan QR codes using your device camera',
    steps: [
      'Open the QR Snap app on your device',
      'Tap the "Scan" button on the home screen',
      'Point your camera at the QR code you want to scan',
      'The app will automatically detect and decode the QR code',
      'View the decoded content or follow the link',
      'For better results, ensure good lighting and hold the device steady'
    ],
    tips: [
      'You can also scan QR codes from images in your gallery',
      'Batch scanning from gallery images requires Lifetime Unlock',
      'The app works offline for basic scanning'
    ]
  },
  {
    icon: QrCode,
    title: 'Generating QR Codes',
    description: 'Create custom QR codes for any purpose',
    steps: [
      'Open QR Snap and tap "Generate" or the "+" button',
      'Select the type of QR code you want to create (URL, Text, Contact, WiFi, etc.)',
      'Fill in the required information for your QR code type',
      'For location-based QR codes, use the map picker to select coordinates',
      'Preview your QR code in real-time',
      'Tap "Save" to store your QR code'
    ],
    tips: [
      'You can generate multiple QR codes and organize them in folders',
      'All QR codes are stored locally on your device',
      'Add icons to QR codes using the customization options'
    ]
  },
  {
    icon: Download,
    title: 'Exporting QR Codes (Lifetime Unlock)',
    description: 'Export your QR codes in multiple formats',
    steps: [
      'Ensure you have Lifetime Unlock',
      'Open the export menu from the main screen',
      'Select your preferred export format:',
      '  • CSV - Export as spreadsheet data',
      '  • JSON - Export as structured data',
      '  • Images ZIP - Export all QR code images as ZIP archive',
      'Choose the location to save the exported file',
      'The file will be saved locally on your device'
    ],
    tips: [
      'All export features require Lifetime Unlock',
      'Exports are stored locally, no cloud sync',
      'You can restore exported data using the restore feature'
    ]
  },
  {
    icon: Share2,
    title: 'Sharing QR Codes',
    description: 'Share your QR codes with others',
    steps: [
      'Open the QR code you want to share',
      'Tap the "Share" button',
      'Choose your sharing method:',
      '  • Share QR code image',
      '  • Copy to clipboard',
      'Select the app or contact you want to share with',
      'The recipient will receive your QR code'
    ],
    tips: [
      'You can share multiple QR codes at once',
      'Sharing as image preserves all customizations',
      'Share flows require Lifetime Unlock'
    ]
  },
  {
    icon: Shield,
    title: 'Privacy &amp; Security',
    description: 'Understand how QR Snap protects your data',
    steps: [
      'All QR codes are stored locally on your device',
      'No data is transmitted to external servers without your permission',
      'URL safety checks send only the link to our privacy-minded backend',
      'Email domain (MX) validation uses public DNS, no credits used',
      'Review app permissions in your device settings'
    ],
    tips: [
      'Free includes 1 URL safety check per day; Lifetime Unlock includes 2 (+2 per rewarded ad)',
      'URL Credit Packs add more checks that never expire on that device',
      'Purchased credits cannot be restored after uninstall or app-data clear',
      'Lifetime Unlock restores with the same store account'
    ]
  },
  {
    icon: Settings,
    title: 'App Permissions',
    description: 'Manage what QR Snap can access on your device',
    steps: [
      'Go to your device Settings',
      'Navigate to Apps → QR Snap → Permissions',
      'Review and manage the following permissions:',
      '  • Camera: Required for scanning QR codes',
      '  • Storage/Photos: Needed to save and access QR codes',
      '  • Location: Optional, used for location-based QR codes',
      '  • Network: Optional, used for URL safety checks and product lookups',
      'Enable or disable permissions as needed',
      'The app will work with minimal permissions for basic features'
    ],
    tips: [
      'Camera permission is essential for the app to function',
      'You can still generate QR codes without storage permission',
      'Location permission is only needed for location QR code types',
      'Network permission is optional, offline scanning and generation still work'
    ]
  }
]

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageWrapper>
        <div className="pt-16">
          <section className="container mx-auto px-4 py-20">
            <FadeIn>
              <div className="text-center mb-16 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
                <p className="text-xl text-muted-foreground">
                  Guides for scanning, generating, exporting, and permissions
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {tutorials.map((tutorial, index) => {
                const Icon = tutorial.icon
                return (
                  <FadeIn key={index} delay={index * 0.1}>
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <CardTitle className="text-2xl">{tutorial.title}</CardTitle>
                        </div>
                        <CardDescription className="text-base">
                          {tutorial.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-sm">Steps:</h4>
                          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                            {tutorial.steps.map((step, stepIndex) => (
                              <li key={stepIndex}>{step}</li>
                            ))}
                          </ol>
                        </div>
                        {tutorial.tips && tutorial.tips.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2 text-sm">Tips:</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                              {tutorial.tips.map((tip, tipIndex) => (
                                <li key={tipIndex}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </FadeIn>
                )
              })}
            </div>

            <FadeIn delay={0.6}>
              <div className="mt-16 text-center">
                <Card className="max-w-2xl mx-auto bg-muted/50">
                  <CardHeader>
                    <CardTitle>Still need help?</CardTitle>
                    <CardDescription>
                      Can&apos;t find what you&apos;re looking for? We&apos;re here to help.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                        href="/faq"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        View FAQ
                      </a>
                      <a
                        href="/feedback"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border bg-background hover:bg-muted transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        Contact Support
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </section>
          <Footer />
        </div>
      </PageWrapper>
    </div>
  )
}
