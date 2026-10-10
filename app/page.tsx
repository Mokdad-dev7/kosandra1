import { HeroSection } from '@/components/sections/HeroSection'
import { DownloadBar } from '@/components/sections/DownloadBar'
import { ProductOverview } from '@/components/sections/ProductOverview'
import { WhatsNew } from '@/components/sections/WhatsNew'
import { ScanningFeatures } from '@/components/sections/ScanningFeatures'
import { QRTypesGrid } from '@/components/sections/QRTypesGrid'
import { SecuritySection } from '@/components/sections/SecuritySection'
import { HistorySection } from '@/components/sections/HistorySection'
import { ExportSection } from '@/components/sections/ExportSection'
import { PointOfSale } from '@/components/sections/PointOfSale'
import { Pricing } from '@/components/sections/Pricing'
import { DesignSystem } from '@/components/sections/DesignSystem'
import { TechSpecs } from '@/components/sections/TechSpecs'
import { ComingSoon } from '@/components/sections/ComingSoon'
import { FinalCTA } from '@/components/marketing/FinalCTA'
import { Footer } from '@/components/marketing/Footer'
import { Header } from '@/components/marketing/Header'
import { FAQ } from '@/components/marketing/FAQ'
import { JsonLd } from '@/components/seo/JsonLd'
import { faqPageSchema, homepageGraph, howToScanSchema } from '@/lib/schema'
import type { Metadata } from 'next'
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: SITE_URL },
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={homepageGraph} />
      <JsonLd data={faqPageSchema} />
      <JsonLd data={howToScanSchema} />
      <Header />
      <div className="pt-16 overflow-x-hidden w-full">
        <HeroSection />
        <DownloadBar />
        <SecuritySection />
        <ProductOverview />
        <WhatsNew />
        <ScanningFeatures />
        <QRTypesGrid />
        <HistorySection />
        <ExportSection />
        <PointOfSale />
        <Pricing />
        <DesignSystem />
        <TechSpecs />
        <ComingSoon />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  )
}
