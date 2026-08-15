'use client'

import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { FadeIn } from '@/components/ui/fade-in'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Shield, Eye, Lock, Users, AlertCircle, Mail, Database, CreditCard } from 'lucide-react'

const appName = 'QR Snap'
const contactEmail = 'ars.tech.app@gmail.com'
const developerName = 'Ars Technology'

function Section({ title, content, icon: Icon }: { title: string; content: React.ReactNode; icon?: React.ElementType }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="text-muted-foreground leading-relaxed space-y-3">
        {content}
      </div>
    </div>
  )
}

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-16">
        <section className="container mx-auto px-4 py-20 max-w-4xl">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-xl text-muted-foreground mb-6">{appName}</p>
              <div className="bg-primary/10 rounded-lg p-4 flex items-center justify-center gap-3 inline-flex">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">
                  Last updated: {lastUpdated}
                </span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card>
              <CardContent className="pt-6 space-y-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {appName} (&ldquo;the App&rdquo;) respects your privacy. This Privacy Policy explains how information is collected, used, and protected when you use the app.
                  </p>

                  <Section
                    title="1. No Account Required"
                    icon={Users}
                    content={
                      <>
                        <p>
                          {appName} does not require account creation. We use an anonymous installation identifier solely for entitlements and the URL-check credit wallet. We do not collect:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                          <li>Names</li>
                          <li>Email addresses</li>
                          <li>Phone numbers</li>
                          <li>Login credentials</li>
                        </ul>
                      </>
                    }
                  />

                  <Section
                    title="2. Local-First Storage"
                    icon={Database}
                    content={
                      <>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>All scanned and generated QR codes are stored locally on your device using Hive on-device storage</li>
                          <li>No cloud storage or automatic sync is used</li>
                          <li>Lifetime Unlock includes local backup &amp; restore functionality (export to a local file)</li>
                          <li>Your data never leaves your device unless you explicitly choose to export or share it</li>
                        </ul>
                      </>
                    }
                  />

                  <Section
                    title="3. Security Checks"
                    icon={Shield}
                    content={
                      <>
                        <p>
                          When you request a URL safety check, the URL may be sent to our Cloudflare Worker backend. The backend may query:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                          <li><strong>Google Web Risk</strong>: primary threat data source</li>
                          <li><strong>VirusTotal</strong>: optional enrichment (only if commercially enabled)</li>
                        </ul>
                        <p className="mt-3">
                          <strong>Email domain (MX) validation</strong> uses public DNS (e.g., dns.google) and does not consume URL check credits. No personal data is stored by our backend.
                        </p>
                      </>
                    }
                  />

                  <Section
                    title="4. Purchases"
                    icon={CreditCard}
                    content={
                      <>
                        <p>
                          {appName} offers optional purchases:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                          <li><strong>Lifetime Unlock ($9.99)</strong>: one-time non-consumable; removes ads and unlocks premium features</li>
                          <li><strong>URL Credit Packs</strong>: consumables (30 / 100 / 250 checks); never expire on that installation</li>
                        </ul>
                        <p className="mt-3">
                          Payments are processed securely by Google Play Store and Apple App Store. {appName} does not process or store payment information.
                        </p>
                        <p className="mt-3">
                          Purchase tokens are verified server-side for Lifetime and credit entitlements.
                        </p>
                      </>
                    }
                  />

                  <Section
                    title="5. URL Credit Recoverability"
                    icon={AlertCircle}
                    content={
                      <>
                        <p>
                          Purchased URL credits are tied to the anonymous installation wallet. They <strong className="text-foreground">cannot be restored</strong> after uninstalling, clearing app data, or moving to a new device.
                        </p>
                        <p className="mt-3">
                          <strong>Lifetime Unlock</strong> does restore with the same store account using Restore on the Plans screen.
                        </p>
                      </>
                    }
                  />

                  <Section
                    title="6. Advertising"
                    icon={Eye}
                    content={
                      <>
                        <p>
                          {appName} displays ads for Free users via Google AdMob (banner, interstitial, and rewarded ads).
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                          <li><strong>Lifetime Unlock</strong> removes passive ads (banners and interstitials) permanently</li>
                          <li><strong>Rewarded ads</strong> remain optional for bonus URL checks</li>
                        </ul>
                        <p className="mt-3">
                          Google may collect advertising identifiers and ad interaction data. This is governed by{' '}
                          <a 
                            href="https://policies.google.com/privacy" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Google&apos;s Privacy Policy
                          </a>.
                        </p>
                      </>
                    }
                  />

                  <Section
                    title="7. Analytics &amp; Diagnostics"
                    icon={Eye}
                    content={
                      <>
                        <p>
                          To improve stability and performance, the app may collect:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                          <li>Crash logs</li>
                          <li>Error reports</li>
                          <li>Feature usage statistics</li>
                        </ul>
                        <p className="mt-2">
                          This data is anonymized and used only to improve the app. We do not sell personal scan contents for advertising profiles.
                        </p>
                      </>
                    }
                  />

                  <Section
                    title="8. Children&apos;s Privacy"
                    icon={Users}
                    content={
                      <>
                        <p>
                          {appName} does not knowingly collect personal data from children under 13.
                          If you believe such data has been collected, please contact us.
                        </p>
                      </>
                    }
                  />

                  <Section
                    title="9. Changes to This Policy"
                    icon={AlertCircle}
                    content={
                      <>
                        <p>
                          This Privacy Policy may be updated. Changes will be reflected on this page.
                        </p>
                      </>
                    }
                  />

                  <Section
                    title="10. Contact"
                    icon={Mail}
                    content={
                      <>
                        <p>
                          If you have questions about this Privacy Policy:
                        </p>
                        <p className="mt-3">
                          <a 
                            href={`mailto:${contactEmail}`}
                            className="text-primary hover:underline font-medium"
                          >
                            {contactEmail}
                          </a>
                        </p>
                        <p className="mt-3 text-sm text-muted-foreground">
                          {appName} is developed by <strong className="text-foreground">{developerName}</strong>.
                        </p>
                      </>
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </FadeIn>
          <Footer />
        </section>
      </div>
    </div>
  )
}
