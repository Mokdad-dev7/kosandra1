'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { 
  QrCode, 
  Link as LinkIcon, 
  FileText, 
  Mail, 
  Phone, 
  MessageSquare, 
  Wifi, 
  User,
  Calendar,
  MapPin,
  Globe,
  Barcode
} from 'lucide-react'
import { ScreenshotRow } from '@/components/marketing/AppScreenshot'
import { shots } from '@/lib/screenshots'

const qrTypes = [
  { icon: LinkIcon, name: 'URL', description: 'Website links' },
  { icon: FileText, name: 'Text', description: 'Plain text' },
  { icon: Mail, name: 'Email', description: 'Email addresses' },
  { icon: Phone, name: 'Phone', description: 'Phone numbers' },
  { icon: MessageSquare, name: 'SMS', description: 'Text messages' },
  { icon: Wifi, name: 'WiFi', description: 'Network credentials' },
  { icon: User, name: 'vCard', description: 'Contact cards' },
  { icon: Calendar, name: 'Event', description: 'Calendar events' },
  { icon: MapPin, name: 'Location', description: 'GPS coordinates' },
  { icon: Globe, name: 'Social', description: 'Social media' },
  { icon: Barcode, name: 'Barcode', description: 'Product codes' },
  { icon: QrCode, name: 'Custom', description: 'Custom data' },
]

export function QRTypesGrid() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section ref={ref} className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">QR & Barcode Generation</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Support for 14+ QR code and barcode types
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {qrTypes.map((type, index) => {
            const Icon = type.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, rotateY: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 20, rotateY: -15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ 
                  y: -8, 
                  rotateY: 5,
                  transition: { duration: 0.2 }
                }}
                style={{ perspective: '1000px' }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  <CardHeader className="text-center pb-2">
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <CardTitle className="text-base">{type.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-xs text-center">
                      {type.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
        <ScreenshotRow shots={[shots.qrPreview, shots.addIcon, shots.generated, shots.qrPreviewDark]} />
      </div>
    </section>
  )
}

