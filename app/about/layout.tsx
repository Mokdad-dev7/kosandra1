import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumb } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'About',
  description:
    'QR Snap by Ars Technology: Android QR and barcode scanner with generation, URL safety checks, export, backup, share, Point of Sale, and flexible pricing.',
  alternates: { canonical: 'https://qrsnap.app/about' },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      {children}
    </>
  )
}
