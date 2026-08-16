import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumb } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'QR Snap privacy policy: no account required, local storage, URL checks via Cloudflare Worker and Google Web Risk, Play Billing, AdMob ads, and non-restorable URL credits.',
  alternates: { canonical: 'https://qrsnap.app/privacy' },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy' },
        ])}
      />
      {children}
    </>
  )
}
