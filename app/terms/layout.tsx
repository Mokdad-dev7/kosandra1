import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumb } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'QR Snap terms: Lifetime Unlock is a one-time non-consumable, URL packs are consumables, refunds follow store policy, and POS users handle tax and receipts.',
  alternates: { canonical: 'https://qrsnap.app/terms' },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Terms of Service', path: '/terms' },
        ])}
      />
      {children}
    </>
  )
}
