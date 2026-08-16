import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumb, howToScanSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Help',
  description:
    'QR Snap help: scan with camera or gallery, generate codes, export CSV JSON and ZIP, backup and restore, share, URL safety checks, and app permissions.',
  alternates: { canonical: 'https://qrsnap.app/help' },
}

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={howToScanSchema} />
      <JsonLd
        data={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Help', path: '/help' },
        ])}
      />
      {children}
    </>
  )
}
