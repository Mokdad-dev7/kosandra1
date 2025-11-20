'use client'

import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { FadeIn } from '@/components/ui/fade-in'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

const appName = 'QR Snap'
const contactEmail = 'support@qrsnap.app'
const websiteUrl = 'https://qrsnap.app'
const developerName = 'QR Snap Team'

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
        {content}
      </div>
    </div>
  )
}

export default function PrivacyPage() {
  const lastUpdated = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-16">
        <section className="container mx-auto px-4 py-20 max-w-4xl">
          <FadeIn>
            <div className="mb-8">
              <div className="bg-primary/10 rounded-lg p-4 flex items-center gap-3 mb-6">
                      <Calendar className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">
                  Last Updated: {lastUpdated}
                </span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card>
              <CardContent className="pt-6 space-y-8">
                <Section
                  title="Introduction"
                  content={`This Privacy Policy describes how ${appName} ("we", "our", or "us") collects, uses, and protects your information when you use our mobile application.`}
                />

                <Section
                  title="Information We Collect"
                  content={`We may collect the following types of information:

• QR Code Data: The content of QR codes you scan or generate
• Usage Data: Information about how you use the app
• Device Information: Device type, operating system, and app version
• Preferences: Your app settings and preferences

Security Processing:

• Email domains (from email QR codes) for validation purposes
• URLs (from QR codes) for malicious content checking
• This data is processed temporarily and not permanently stored`}
                />

                <Section
                  title="How We Use Your Information"
                  content={`We use the collected information to:

• Provide and maintain our service
• Improve and optimize the app experience
• Store your QR codes locally on your device
• Provide backup and restore functionality
• Respond to your support requests

Security Features:

• Validate email domains to ensure deliverability
• Check URLs for malicious content to protect users
• Provide warnings about potentially unsafe content
• These checks are performed in real-time and data is not retained`}
                />

                <Section
                  title="Data Storage and Security"
                  content={`• All QR code data is stored locally on your device
• We do not transmit your QR codes to external servers
• Backup files are created and stored locally unless you choose to share them
• We implement appropriate security measures to protect your data

Security Processing:

• Email domains and URLs may be sent to third-party services for validation
• This data is processed temporarily and not stored by us
• Security checks are only performed in release mode for user protection
• No personal information is included in these security checks`}
                />

                <Section
                  title="Data Sharing"
                  content={`We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:

• With your explicit consent (e.g., when you share backup files)
• To comply with legal requirements
• To protect our rights and safety

Security Service Sharing:

• Email domains are shared with validation services to check deliverability
• URLs are shared with reputation services to check for malicious content
• Only the specific URL/domain is shared, not your personal information
• This sharing is done to protect you from harmful content`}
                />

                <Section
                  title="Security Features"
                  content={`To protect our users, we implement several security measures:

Email Domain Validation:

• We validate email domains in QR codes to prevent spam
• Invalid domains are flagged to help you avoid undeliverable emails
• Only the domain portion is checked, not the full email address

URL Reputation Checking:

• We check URLs in QR codes against known malicious sites
• This helps protect you from phishing, malware, and other threats
• We use reputable security services like VirusTotal and Google Safe Browsing
• You will be warned before accessing potentially dangerous content

These security checks are:

• Performed automatically when you scan QR codes
• Only active in the release version of the app
• Designed to protect you without compromising your privacy`}
                />

                <Section
                  title="Your Rights"
                  content={`You have the right to:

• Access your data stored in the app
• Delete your data using the app's clear history feature
• Export your data using the backup feature
• Request support regarding your data`}
                />

                <Section
                  title="Third-Party Services"
                  content={`Our app uses third-party services to enhance security and functionality:

Security Services:

• Email Domain Validation: We validate email domains to prevent spam and ensure deliverability
• URL Reputation Checking: We check URLs in QR codes for malicious content to protect users
• These services may process URLs and email domains you scan or generate

Other Services:

• Analytics and crash reporting
• Cloud storage (if you choose to use it)
• Social sharing features

Security Processing:

• Email domains are validated through secure third-party services
• URLs are checked against reputation databases (VirusTotal, Google Safe Browsing)
• Only the URL/domain is sent for checking, not your personal information
• Security checks are performed to protect you from malicious content

These services have their own privacy policies, and we encourage you to read them.`}
                />

                <Section
                  title="Children's Privacy"
                  content={`Our app is not intended for children under 13. We do not knowingly collect personal information from children under 13.`}
                />

                <Section
                  title="Changes to This Privacy Policy"
                  content={`We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy in the app.`}
                />

                <Section
                  title="Contact Us"
                  content={`If you have questions about this Privacy Policy, please contact us:

• Email: ${contactEmail}
• Website: ${websiteUrl}

Developer: ${developerName}`}
                />
              </CardContent>
            </Card>
          </FadeIn>
        </section>
        <Footer />
      </div>
    </div>
  )
}
