import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumb } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Feedback',
  description: 'Send QR Snap feedback to Ars Technology.',
  alternates: { canonical: 'https://qrsnap.app/feedback' },
}

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Feedback', path: '/feedback' },
        ])}
      />
      {children}
    </>
  )
}
