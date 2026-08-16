import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumb } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Ars Technology about QR Snap. Email ars.tech.app@gmail.com.',
  alternates: { canonical: 'https://qrsnap.app/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      {children}
    </>
  )
}
