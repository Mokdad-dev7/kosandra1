import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumb } from '@/lib/schema'
import { guides } from '@/lib/guides'
import { canonical } from '@/lib/site'

export const metadata: Metadata = {
  title: 'QR code scam guides',
  description:
    'Plain-language guides to QR code scams: fake parking meter codes, fake delivery notices, and the warning signs to check in any link before you open it.',
  alternates: { canonical: canonical('/guides') },
}

export default function GuidesIndex() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd
        data={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
        ])}
      />
      <Header />
      <main className="pt-16">
        <section className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">QR code scam guides</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl">
            How QR code scams work, where they show up, and what to check before you open a link. Each guide cites the
            police and consumer agencies that reported the scam.
          </p>
          <ul className="space-y-4">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="group flex items-start justify-between gap-4 rounded-2xl border p-6 hover:bg-muted/40 transition-colors"
                >
                  <div className="min-w-0">
                    <h2 className="text-xl font-bold mb-1">{g.title}</h2>
                    <p className="text-muted-foreground">{g.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 mt-1 flex-shrink-0 text-muted-foreground group-hover:text-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <Footer />
      </main>
    </div>
  )
}
