import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react'
import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { JsonLd } from '@/components/seo/JsonLd'
import { Button } from '@/components/ui/button'
import { breadcrumb } from '@/lib/schema'
import { getGuide, guides } from '@/lib/guides'
import { PLAY_URL, PUBLISHER, SITE_URL, canonical } from '@/lib/site'

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const guide = getGuide((await params).slug)
  if (!guide) return {}
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: canonical(`/guides/${guide.slug}`) },
    openGraph: { title: guide.title, description: guide.description, type: 'article' },
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug)
  if (!guide) notFound()
  const others = guides.filter((g) => g.slug !== guide.slug)
  const updated = new Date(`${guide.updated}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: guide.title,
          description: guide.description,
          dateModified: guide.updated,
          mainEntityOfPage: `${SITE_URL}/guides/${guide.slug}`,
          author: { '@type': 'Organization', name: PUBLISHER, url: SITE_URL },
          publisher: { '@type': 'Organization', name: PUBLISHER, url: SITE_URL },
          citation: guide.sources.map((s) => s.url),
        }}
      />
      <JsonLd
        data={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
          { name: guide.shortTitle, path: `/guides/${guide.slug}` },
        ])}
      />
      <Header />
      <main className="pt-16">
        <article className="container mx-auto px-4 py-16 md:py-20 max-w-3xl">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All scam guides
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 break-words">
            {guide.title}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">Updated {updated}</p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">{guide.intro}</p>

          {guide.sections.map((section) => (
            <section key={section.heading} className="mb-10">
              <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
              {section.paragraphs?.map((p) => (
                <p key={p} className="text-muted-foreground leading-relaxed mb-4">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-5 marker:text-primary">
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <aside className="rounded-2xl border bg-muted/30 p-6 md:p-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-bold mb-2">Check the next QR code before you open it</h2>
                <p className="text-muted-foreground mb-4">
                  QR Snap is free on Android. Scan a code and see where the link really goes, how old the site is, and
                  whether any check flagged it.
                </p>
                <Button asChild>
                  <a href={PLAY_URL} target="_blank" rel="noopener noreferrer">
                    Get QR Snap on Google Play
                  </a>
                </Button>
              </div>
            </div>
          </aside>

          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Sources</h2>
            <ul className="space-y-2 text-sm">
              {guide.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-1.5 text-primary hover:underline break-words"
                  >
                    <ExternalLink className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">More guides</h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {others.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${g.slug}`}
                    className="block h-full rounded-xl border p-4 hover:bg-muted/40 transition-colors"
                  >
                    <span className="font-semibold">{g.title}</span>
                    <span className="block text-sm text-muted-foreground mt-1">{g.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
        <Footer />
      </main>
    </div>
  )
}
