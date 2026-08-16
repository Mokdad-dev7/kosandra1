import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { Pricing } from '@/components/sections/Pricing'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumb, pricingPageSchema } from '@/lib/schema'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'QR Snap is free to scan and generate. Lifetime Unlock is $9.99 one-time for gallery batch, backup, restore, export, share, and Point of Sale. URL packs add 30, 100, or 250 checks.',
  alternates: { canonical: 'https://qrsnap.app/pricing' },
  openGraph: {
    title: 'QR Snap Pricing | Free, Lifetime Unlock, URL Packs',
    description:
      'Free scan and generate. $9.99 Lifetime Unlock for gallery batch, backup, export, share, and POS. URL credit packs at $0.99, $2.99, $4.99.',
    url: 'https://qrsnap.app/pricing',
  },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={pricingPageSchema} />
      <JsonLd
        data={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Pricing', path: '/pricing' },
        ])}
      />
      <Header />
      <div className="pt-16">
        <Pricing />
        <Footer />
      </div>
    </div>
  )
}
