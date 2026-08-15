import { HeroSection } from '@/components/sections/HeroSection'
import { DownloadBar } from '@/components/sections/DownloadBar'
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

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-16">
        {/* 1. Hero Section */}
        <HeroSection />
        
        {/* 2. App Download Bar */}
        <DownloadBar />
        
        {/* 3. Core Scanning Features */}
        <ScanningFeatures />
        
        {/* 4. QR + Barcode Generation Types */}
        <QRTypesGrid />
        
        {/* 5. Security & Safety */}
        <SecuritySection />
        
        {/* 6. History & Organization */}
        <HistorySection />
        
        {/* 7. Export & Backup */}
        <ExportSection />
        
        {/* 8. Point of Sale */}
        <PointOfSale />
        
        {/* 9. Plans & Pricing */}
        <Pricing />
        
        {/* 10. UI/UX Design System */}
        <DesignSystem />
        
        {/* 11. Technical Specs */}
        <TechSpecs />
        
        {/* 12. Roadmap */}
        <ComingSoon />
        
        {/* 13. FAQ Preview */}
        <FAQ />
        
        {/* 14. Final CTA */}
        <FinalCTA />
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
