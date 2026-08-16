import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumb } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Features',
  description:
    'QR Snap features: camera and gallery scan, gallery batch, 14+ generators, URL safety checks, email MX validation, history, CSV/JSON/ZIP export, backup, restore, share, and Point of Sale.',
  alternates: { canonical: 'https://qrsnap.app/features' },
}

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Features', path: '/features' },
        ])}
      />
      {children}
    </>
  )
}
