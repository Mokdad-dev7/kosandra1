'use client'

import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { PageWrapper } from '@/components/ui/page-wrapper'
import { FadeIn } from '@/components/ui/fade-in'
import { Card, CardContent } from '@/components/ui/card'

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageWrapper>
        <div className="pt-16">
          <section className="container mx-auto px-4 py-20 max-w-4xl">
            <FadeIn>
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
                <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card>
                <CardContent className="pt-6 prose prose-lg dark:prose-invert max-w-none">
                  <h2>1. Acceptance of Terms</h2>
                  <p>
                    By accessing and using QR Snap, you accept and agree to be bound by the terms and 
                    provision of this agreement.
                  </p>

                  <h2>2. Use License</h2>
                  <p>
                    Permission is granted to temporarily use QR Snap for personal and commercial purposes. 
                    This is the grant of a license, not a transfer of title.
                  </p>

                  <h2>3. User Accounts</h2>
                  <p>
                    You are responsible for maintaining the confidentiality of your account and password. 
                    You agree to accept responsibility for all activities that occur under your account.
                  </p>

                  <h2>4. Prohibited Uses</h2>
                  <p>
                    You may not use QR Snap for any unlawful purpose or to solicit others to perform unlawful acts.
                  </p>

                  <h2>5. Limitation of Liability</h2>
                  <p>
                    QR Snap shall not be liable for any indirect, incidental, special, consequential, or 
                    punitive damages resulting from your use of the service.
                  </p>

                  <h2>6. Contact Information</h2>
                  <p>
                    For questions about these Terms, please contact us at support@qrsnap.app
                  </p>
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
