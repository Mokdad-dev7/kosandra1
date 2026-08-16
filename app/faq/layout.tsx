import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumb, faqPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'QR Snap FAQ: pricing, Lifetime Unlock, Point of Sale, export formats, backup and restore, gallery batch scan, URL credits, and privacy.',
  alternates: { canonical: 'https://qrsnap.app/faq' },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={faqPageSchema} />
      <JsonLd
        data={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'FAQ', path: '/faq' },
        ])}
      />
      {children}
    </>
  )
}
