'use client'

import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { PageWrapper } from '@/components/ui/page-wrapper'
import { FadeIn } from '@/components/ui/fade-in'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, FileText, AlertTriangle, CreditCard, Shield, Ban, Mail, Store } from 'lucide-react'

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

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageWrapper>
        <div className="pt-16">
          <section className="container mx-auto px-4 py-20 max-w-4xl">
            <FadeIn>
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
                <p className="text-xl text-muted-foreground mb-6">{appName}</p>
                <div className="bg-primary/10 rounded-lg p-4 flex items-center justify-center gap-3 inline-flex">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">
                    Last updated: {lastUpdated}
                  </span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card>
                <CardContent className="pt-6 space-y-8">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      By using {appName}, you agree to these Terms of Service.
                    </p>

                    <Section
                      title="1. Use of the App"
                      icon={FileText}
                      content={
                        <>
                          <p>
                            {appName} is provided for personal and commercial use, subject to these terms.
                          </p>
                          <p className="mt-3">You agree:</p>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                            <li>Not to misuse the app</li>
                            <li>Not to attempt to bypass usage limits or security</li>
                            <li>Not to reverse engineer or exploit app features</li>
                          </ul>
                        </>
                      }
                    />

                    <Section
                      title="2. Features &amp; Availability"
                      icon={Shield}
                      content={
                        <>
                          <p>Features may vary based on:</p>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                            <li>Free usage (with ads, 1 URL check/day, unlimited email checks)</li>
                            <li>Lifetime Unlock (one-time purchase: ads removed, 15 URL checks/day, batch gallery, backup, export, POS, unlimited Pinned QR widgets)</li>
                            <li>URL Credit Packs (consumables: 50 / 150 / 400 checks)</li>
                            <li>Rewarded ads for +2 URL checks</li>
                          </ul>
                          <p className="mt-3">
                            We reserve the right to modify features at any time.
                          </p>
                        </>
                      }
                    />

                    <Section
                      title="3. Purchases"
                      icon={CreditCard}
                      content={
                        <>
                          <p>
                            {appName} offers the following purchases:
                          </p>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                            <li><strong>Lifetime Unlock ($9.99)</strong>: one-time <strong>non-consumable</strong>; removes ads and unlocks premium features</li>
                            <li><strong>URL Credit Packs</strong>: <strong>consumables</strong> (50 / 150 / 400 checks); never expire on that installation</li>
                          </ul>
                          <ul className="list-disc list-inside mt-3 space-y-2 ml-4">
                            <li>Purchases are handled by Google Play Store and Apple App Store</li>
                            <li>Prices may change; localized store prices are authoritative</li>
                            <li>Lifetime Unlock can be restored via Restore on the Plans screen with the same store account</li>
                            <li><strong>URL credits cannot be restored</strong> after uninstalling, clearing app data, or moving to a new device</li>
                          </ul>
                          <p className="mt-3">
                            Refunds follow Google Play / App Store policies. {appName} does not process or store payment information.
                          </p>
                        </>
                      }
                    />

                    <Section
                      title="4. Ads &amp; Rewarded Access"
                      icon={Shield}
                      content={
                        <>
                          <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Free users see ads served by Google AdMob (banner and interstitial)</li>
                            <li>Rewarded ads are optional and grant <strong>+2 URL safety checks</strong></li>
                            <li>Rewarded ads are limited: max 2 per rolling 24 hours, 15-minute cooldown</li>
                            <li>Abuse or manipulation may result in feature restriction</li>
                          </ul>
                        </>
                      }
                    />

                    <Section
                      title="5. Point of Sale"
                      icon={Store}
                      content={
                        <>
                          <p>
                            The POS feature is an on-device tool included with Lifetime Unlock. POS data (inventory, sales, receipts) stays on your device and is backed up with the Lifetime backup tools.
                          </p>
                          <p className="mt-3">
                            <strong>You are responsible</strong> for tax collection, receipt legality, and compliance with local regulations in your jurisdiction.
                          </p>
                        </>
                      }
                    />

                    <Section
                      title="6. Disclaimer"
                      icon={AlertTriangle}
                      content={
                        <>
                          <p>
                            {appName} is provided &ldquo;as is&rdquo; without warranties of any kind.
                            We do not guarantee uninterrupted or error-free operation.
                          </p>
                        </>
                      }
                    />

                    <Section
                      title="7. Limitation of Liability"
                      icon={AlertTriangle}
                      content={
                        <>
                          <p>We are not liable for:</p>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                            <li>Data loss due to device failure, uninstall, or app-data clear</li>
                            <li>Misuse of QR codes</li>
                            <li>Third-party services or ads</li>
                            <li>False positives or negatives from security checks</li>
                          </ul>
                        </>
                      }
                    />

                    <Section
                      title="8. Termination"
                      icon={Ban}
                      content={
                        <>
                          <p>
                            We reserve the right to restrict access if these terms are violated.
                          </p>
                        </>
                      }
                    />

                    <Section
                      title="9. Changes to Terms"
                      icon={FileText}
                      content={
                        <>
                          <p>
                            Terms may be updated periodically. Continued use of the app means acceptance of changes.
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
                            If you have questions about these Terms:
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
          </section>
          <Footer />
        </div>
      </PageWrapper>
    </div>
  )
}
