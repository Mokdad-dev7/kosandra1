'use client'

import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { FadeIn } from '@/components/ui/fade-in'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Shield, Eye, Lock, Users, AlertCircle, Mail } from 'lucide-react'

const appName = 'QR Snap'
const contactEmail = 'ars.tech.app@gmail.com'
const developerName = 'Ars Technology'

function Section({ title, content, icon: Icon }: { title: string; content: React.ReactNode; icon?: any }) {
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
                    {appName} ("the App") respects your privacy. This Privacy Policy explains how information is collected, used, and protected when you use the app.
                  </p>

                  <Section
                    title="1. Information We Collect"
                    icon={Eye}
                    content={
                      <>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">1.1 Information You Provide</h3>
                          <p>
                            {appName} does not require account creation. We do not collect:
                          </p>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                            <li>Names</li>
                            <li>Email addresses</li>
                            <li>Phone numbers</li>
                            <li>Login credentials</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">1.2 Automatically Collected Information</h3>
                          <p>
                            The app may collect limited technical data to function properly:
                          </p>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                            <li>Device information (device model, OS version)</li>
                            <li>Anonymous device identifier (hashed, non-reversible)</li>
                            <li>Ad interaction data (for ads and rewarded ads)</li>
                            <li>Crash and performance data</li>
                          </ul>
                          <p className="mt-2">
                            This data is collected anonymously and cannot be used to identify you personally.
                          </p>
                        </div>
                      </>
                    }
                  />

                  <Section
                    title="2. Advertising"
                    icon={Eye}
                    content={
                      <>
                        <p>
                          {appName} displays ads for free users.
                        </p>
                        <div className="mt-3">
                          <p className="font-semibold mb-2">Ads are served by Google AdMob</p>
                          <p>Google may collect:</p>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                            <li>Advertising identifiers</li>
                            <li>Ad interaction data</li>
                          </ul>
                          <p className="mt-2">
                            This is governed by Google's Privacy Policy:{' '}
                            <a 
                              href="https://policies.google.com/privacy" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              https://policies.google.com/privacy
                            </a>
                          </p>
                        </div>
                        <div className="mt-4">
                          <p className="font-semibold mb-2">Rewarded Ads</p>
                          <p>
                            Rewarded ads are optional and allow temporary access to premium features for 24 hours.
                            This includes Premium security features and Pro features like batch scanning and backup.
                            Usage limits are enforced to prevent abuse. Access expires after 24 hours.
                          </p>
                        </div>
                      </>
                    }
                  />

                  <Section
                    title="3. Subscriptions & Purchases"
                    icon={Lock}
                    content={
                      <>
                        <p>
                          {appName} offers optional purchases:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                          <li><strong>Basic</strong> – Remove ads</li>
                          <li><strong>Premium</strong> – Additional security and validation features</li>
                          <li><strong>Pro</strong> – Advanced scanning and backup features</li>
                        </ul>
                        <p className="mt-3">
                          Payments are processed securely by:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                          <li>Google Play Store</li>
                          <li>Apple App Store</li>
                        </ul>
                        <p className="mt-3">
                          {appName} does not process or store payment information.
                        </p>
                      </>
                    }
                  />

                  <Section
                    title="4. Data Storage"
                    icon={Lock}
                    content={
                      <>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>All QR codes are stored locally on your device only</li>
                          <li>No cloud storage or automatic sync is used</li>
                          <li>Pro tier includes local backup & restore functionality (export to local file)</li>
                          <li>Backups are stored locally on your device - no external storage</li>
                          <li>Your data never leaves your device unless you explicitly choose to export it</li>
                        </ul>
                      </>
                    }
                  />

                  <Section
                    title="5. Analytics & Diagnostics"
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
                          This data is anonymized and used only to improve the app.
                        </p>
                      </>
                    }
                  />

                  <Section
                    title="6. Data Security"
                    icon={Shield}
                    content={
                      <>
                        <p>We use industry-standard practices to protect data:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                          <li>All QR codes stored locally on your device</li>
                          <li>Premium/Pro security features (URL Domain Security Check, Email Domain Validation) use secure APIs but store no data externally</li>
                          <li>No unnecessary data collection</li>
                          <li>No cloud sync or external storage</li>
                        </ul>
                      </>
                    }
                  />

                  <Section
                    title="7. Children's Privacy"
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
                    title="8. Changes to This Policy"
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
                    title="9. Contact"
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
                            📧 {contactEmail}
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
