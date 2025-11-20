'use client'

import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { PageWrapper } from '@/components/ui/page-wrapper'
import { FAQ } from '@/components/marketing/FAQ'
import { FadeIn } from '@/components/ui/fade-in'

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageWrapper>
        <div className="pt-16">
          <section className="container mx-auto px-4 py-20">
            <FadeIn>
              <div className="text-center mb-12 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
                <p className="text-xl text-muted-foreground">
                  Everything you need to know about QR Snap
                </p>
              </div>
            </FadeIn>
            <FAQ showHeading={false} />
          </section>
          <Footer />
        </div>
      </PageWrapper>
    </div>
  )
}

