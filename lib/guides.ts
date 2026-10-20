export type GuideSection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export type GuideSource = { label: string; url: string }

export type Guide = {
  slug: string
  title: string
  /** Shorter label for cards and navigation. */
  shortTitle: string
  description: string
  updated: string
  intro: string
  sections: GuideSection[]
  sources: GuideSource[]
}

const WHAT_QR_SNAP_CHECKS: GuideSection = {
  heading: 'What QR Snap checks before you open a link',
  paragraphs: [
    'QR Snap shows you the link first and does not open it until you tap. Before you do, it runs these checks:',
  ],
  bullets: [
    'Where it really goes. Short links and redirects are followed to the page they end on, and QR Snap shows that site ("Opens example.com, after 2 redirects").',
    'Known threats. The link and its destination are checked against Google Web Risk and a public list of active phishing sites.',
    'Look-alike names. A company name on a site it does not own, misspellings like paypa1 or rnicrosoft, letters from other alphabets, and an "@" that hides the real address.',
    'Free website builders and file hosts. A payment or sign-in page hosted on a free site builder, a dynamic-DNS name or a storage bucket is a common scam setup.',
    'Brand-new websites. Most scam sites are days or weeks old, so QR Snap shows when the site was registered.',
  ],
}

const HONEST_LIMITS: GuideSection = {
  heading: 'What no checker can promise',
  paragraphs: [
    'New scam sites appear every day, and some hide behind bot checks so automated tools only see a harmless page. A clean result means none of the checks found a known threat, not that the page is guaranteed safe. If a page asks for card details or a password you did not expect to give, close it and go to the company yourself: type its address or open its official app.',
  ],
}

export const guides: Guide[] = [
  {
    slug: 'qr-code-phishing-emails',
    title: 'QR codes in emails and PDFs: the account-theft scam',
    shortTitle: 'QR codes in emails',
    description:
      'Fake "re-verify your account", shared-document and invoice emails hide a QR code so your phone opens a fake sign-in page. How it works, the red flags, and what to do.',
    updated: '2026-10-20',
    intro:
      'An email says your password expires today, a document is waiting for your signature, or your two-step sign-in must be renewed, and it asks you to scan a QR code. The code opens a copy of a Microsoft, Google or DocuSign sign-in page on your phone. Whatever you type there goes to the scammer, who then signs in to your real account.',
    sections: [
      {
        heading: 'Why scammers put the link in a QR code',
        paragraphs: [
          'Email filters check the links inside a message. A QR code is a picture, often inside a PDF attachment, so many filters never see the address it holds. When you scan it, the page opens on your phone, which usually has less protection than a work computer and is outside your company’s security tools.',
          'In January 2026 the FBI warned that a North Korean group was sending emails with QR codes to think tanks, universities and government staff, posing as advisers, embassy staff and conference organisers. The codes led to fake sign-in pages. The FBI noted that QR images in attachments and embedded graphics slip past link checking and scanning.',
          'The same trick is common in ordinary crime. Barracuda researchers counted more than 500,000 phishing emails with QR codes in PDF attachments between June and September 2024. Most posed as Microsoft SharePoint or OneDrive (51%), DocuSign (31%) or Adobe (15%).',
        ],
      },
      {
        heading: 'What these emails usually say',
        bullets: [
          '“Your password expires today. Scan to keep the same password.”',
          '“Your multi-factor authentication must be re-enrolled.”',
          '“A document has been shared with you” or “Please sign this agreement”.',
          '“You have a new voicemail”, “Your payroll details need updating” or “Invoice attached”.',
          'A PDF that contains only a logo, a short message and a QR code, with no other links.',
        ],
      },
      {
        heading: 'Red flags',
        bullets: [
          'Any email that asks you to scan a QR code to sign in. Microsoft, Google, banks and your IT team do not need you to move to your phone to keep your password.',
          'Urgency: expires today, final notice, account will be locked.',
          'The page that opens is not microsoft.com, live.com, google.com, docusign.com, adobe.com or your company’s own domain. Look-alikes such as micros0ft-verify.com or docusign.secure-review.app are not those companies.',
          'A sign-in page reached through a QR-code service, a free website builder or a file-sharing link.',
          'You are asked for your password and then the code from your authenticator app.',
        ],
      },
      {
        heading: 'What to do',
        bullets: [
          'Do not scan QR codes in emails to sign in. Open the service yourself: type its address or open its official app.',
          'At work, forward the email to your IT or security team and delete it.',
          'If you are unsure whether a message is real, contact the sender another way, for example by phone, as the FBI recommends.',
          'If you typed a password on such a page, change it right away from the real site, sign out of other sessions and tell your IT team.',
          'To see where a code really goes without opening it, scan it with QR Snap first.',
        ],
      },
      WHAT_QR_SNAP_CHECKS,
      HONEST_LIMITS,
    ],
    sources: [
      {
        label: 'FBI FLASH: North Korean Kimsuky actors use malicious QR codes in spearphishing (January 2026)',
        url: 'https://www.ic3.gov/CSA/2026/260108.pdf',
      },
      {
        label: 'Infosecurity Magazine: FBI warns of North Korean QR phishing campaigns (January 2026)',
        url: 'https://infosecurity-magazine.com/news/fbi-warns-north-korean-qr-phishing',
      },
      {
        label: 'ITPro: Barracuda finds 500,000 phishing emails with QR codes in PDFs (October 2024)',
        url: 'https://itpro.com/security/hackers-are-stepping-up-qishing-attacks-by-hiding-malicious-qr-codes-in-pdf-email-attachments',
      },
      {
        label: 'FTC: Scammers hide harmful links in QR codes to steal your information',
        url: 'https://consumer.ftc.gov/consumer-alerts/2023/12/scammers-hide-harmful-links-qr-codes-steal-your-information',
      },
    ],
  },
  {
    slug: 'qr-code-scams',
    title: 'How to spot a QR code scam',
    shortTitle: 'Spot a QR code scam',
    description:
      'QR code scams (quishing) send you to fake payment and login pages. Where they show up, the warning signs in the link, and what to do if you already scanned one.',
    updated: '2026-10-11',
    intro:
      'A QR code is a link you cannot read until you scan it. Scammers use that: they stick their own code over a real one, or print it on a letter, an email or a package. The code opens a fake page that asks for your card details or a password, or pushes you to install an app. Police and consumer agencies in the US and Europe now warn about it regularly. It is often called "quishing", short for QR phishing.',
    sections: [
      {
        heading: 'Where scam QR codes show up',
        bullets: [
          'Parking meters and pay stations, as stickers over or next to the real code.',
          'Fake delivery or collection notices in your letterbox, asking you to rebook a parcel.',
          'Emails and PDF attachments: "your password expires", "sign this document", "confirm your account". A QR code in an email gets past many work email filters.',
          'Packages you never ordered, with no sender and a QR code inside.',
          'Fake fines, toll notices and tax refunds.',
          'Posters, flyers and restaurant tables, where a sticker can sit on top of the real menu code.',
        ],
      },
      {
        heading: 'Warning signs in the link',
        paragraphs: [
          'Most phone cameras show the address before opening it, and QR Snap shows it in full. Read it before you tap:',
        ],
        bullets: [
          'The site name is the part just before .com, .co.uk, .fr and so on. In paypal-secure-login.com the site is paypal-secure-login, not PayPal. In royalmail.parcel-reschedule.help the site is parcel-reschedule.help.',
          'Misspellings and swapped characters: paypa1 with a one, rnicrosoft with "rn" for "m", an extra or missing letter.',
          'An "@" in the address. Everything before it is ignored, so https://www.paypal.com@example.net opens example.net.',
          'A short link (bit.ly, tinyurl and many QR services) hides the real destination. That is not proof of a scam, but you need to see where it ends up.',
          'A payment or sign-in page on a free website builder or hosting address (weebly.com, pages.dev, github.io, web.app and similar). Banks, parking operators and carriers use their own domains.',
          'Pressure: pay within the hour, your account is suspended, the fine doubles tomorrow.',
        ],
      },
      WHAT_QR_SNAP_CHECKS,
      {
        heading: 'If you already entered your details',
        bullets: [
          'Card details: call your bank on the number printed on your card, block the card and ask about a chargeback.',
          'A password: change it on the real site, and anywhere else you use it. Turn on two-step verification.',
          'An app you installed from the link: uninstall it and run your phone’s security check. On Android, that is Google Play Protect.',
          'Report it. In the US: reportfraud.ftc.gov and ic3.gov. In the UK: Action Fraud, or forward scam texts to 7726. In the EU and Switzerland: your national police or cyber security centre.',
        ],
      },
      HONEST_LIMITS,
    ],
    sources: [
      {
        label: 'FTC: Scammers hide harmful links in QR codes to steal your information',
        url: 'https://consumer.ftc.gov/consumer-alerts/2023/12/scammers-hide-harmful-links-qr-codes-steal-your-information',
      },
      {
        label: 'FBI IC3 PSA I-073125-PSA: QR codes in unsolicited packages (July 2025)',
        url: 'https://www.ic3.gov/PSA/2025/PSA250731',
      },
      {
        label: 'Swiss NCSC: Fake QR codes on collection notices (June 2026)',
        url: 'https://www.bacs.admin.ch/en/26w24-en',
      },
      {
        label: 'Ireland NCSC: Quick guide to QR code phishing scams',
        url: 'https://www.ncsc.gov.ie/pdfs/Quick_Guide_QR_Code_Phishing_Scams.pdf',
      },
      {
        label: 'Unit 42: Evolution of sophisticated phishing tactics, the QR code phenomenon (2025)',
        url: 'https://unit42.paloaltonetworks.com/qr-code-phishing/',
      },
    ],
  },
  {
    slug: 'parking-qr-code-scams',
    title: 'Fake QR codes on parking meters',
    shortTitle: 'Parking meter QR scams',
    description:
      'Fake QR stickers on parking meters and pay stations lead to copycat payment sites. How the scam works, how to spot it, and the safe way to pay.',
    updated: '2026-10-11',
    intro:
      'You park, the meter has a QR code that says "scan to pay", and the page that opens looks like a parking app. On a growing number of meters, that code is a sticker placed by a scammer. The page takes your card details, and sometimes signs you up for a recurring charge. Councils and police in the UK, Belgium, Switzerland and US cities have all issued warnings.',
    sections: [
      {
        heading: 'How the scam works',
        bullets: [
          'A sticker with the scammer’s QR code goes on top of the real code, or on a meter or sign that never had one.',
          'The page copies a parking operator: logo, zone number field, "pay now" button.',
          'It asks for your card number, expiry and security code, sometimes your plate and phone number too.',
          'Your parking is not paid, so you may still get a ticket, and the card details are used elsewhere.',
        ],
      },
      {
        heading: 'Who has warned about it',
        bullets: [
          'Hartlepool Borough Council (UK, May 2025): its pay and display machines never use QR codes for payment.',
          'Royal Borough of Kensington and Chelsea (UK, January 2025): fake codes on parking signs in at least six places.',
          'Police in Northern Ireland and Brussels, and the Swiss National Cyber Security Centre.',
          'US cities including New York and Fort Lauderdale, and the FTC (September 2026).',
        ],
      },
      {
        heading: 'How to spot a fake parking code',
        bullets: [
          'The code is a sticker: raised edges, a slightly different colour, stuck on at an angle, or covering part of the printed sign.',
          'The sign tells you to use an app. Install that app from the App Store or Google Play instead of scanning.',
          'The address is not the operator’s own site. Real operators use their own domains, such as paybyphone.com, ringgo.co.uk, parkmobile.io or easypark.com. Check what the sign names.',
          'The page asks for more than a card payment: your bank login, an ID photo, or a code sent to your phone.',
          'A tiny or odd price, or a countdown pushing you to pay fast.',
        ],
      },
      {
        heading: 'The safe way to pay',
        bullets: [
          'Use the operator’s official app, or pay at the machine with a card or coins.',
          'If you want to use the web, type the address printed on the sign yourself.',
          'If QR Snap says the link opens a site that is not the operator’s, or that the site was registered days ago, do not pay there.',
        ],
      },
      WHAT_QR_SNAP_CHECKS,
      {
        heading: 'If you paid on a fake page',
        bullets: [
          'Call your bank on the number on your card, block the card and dispute the charge.',
          'Tell the council or city that runs the car park, so they can remove the stickers.',
          'Report it to the police: Action Fraud in England and Wales, ic3.gov and reportfraud.ftc.gov in the US, or your local police in the EU.',
        ],
      },
      HONEST_LIMITS,
    ],
    sources: [
      {
        label: 'FTC: See a QR code parked somewhere? Don’t scan it… yet! (September 2026)',
        url: 'https://consumer.ftc.gov/consumer-alerts/2026/09/see-qr-code-parked-somewhere-dont-scan-ityet',
      },
      {
        label: 'Hartlepool Borough Council: Warning issued for scam QR codes on parking machines',
        url: 'https://www.hartlepool.gov.uk/news/article/3/warning-issued-for-scam-qr-codes-on-parking-machines-in-hartlepool',
      },
      {
        label: 'Royal Borough of Kensington and Chelsea: Warning to drivers of QR code parking scam',
        url: 'https://www.rbkc.gov.uk/newsroom/warning-drivers-qr-code-parking-scam',
      },
      {
        label: 'Brussels Times: Brussels police warn against QR code parking ticket scams',
        url: 'https://www.brusselstimes.com/1360575/brussels-police-warn-against-qr-code-parking-ticket-scams',
      },
      {
        label: 'PSNI: Drivers urged to be aware of QR code car park scams',
        url: 'https://www.psni.police.uk/latest-news/police-are-encouraging-drivers-be-aware-qr-code-car-park-scams',
      },
      {
        label: 'News 12: Drivers targeted by QR code parking scam in NYC',
        url: 'https://bronx.news12.com/drivers-targeted-by-qr-code-parking-scam-in-nyc',
      },
      {
        label: 'WLRN: Fort Lauderdale QR code scams (May 2025)',
        url: 'https://www.wlrn.org/news-in-brief/2025-05-22/fort-lauderdale-qr-code-scams',
      },
      {
        label: 'Swiss NCSC: Week 24, phishing in the letterbox (mentions parking meter stickers)',
        url: 'https://www.bacs.admin.ch/en/26w24-en',
      },
    ],
  },
  {
    slug: 'fake-delivery-qr-codes',
    title: 'Fake delivery notices and package QR codes',
    shortTitle: 'Fake delivery QR codes',
    description:
      'Fake "we missed you" notices and unexpected packages use QR codes to steal card details. What they look like, the red flags, and how to check a delivery safely.',
    updated: '2026-10-11',
    intro:
      'Parcel scams moved from text messages into the letterbox. A card that looks like a real "we missed you" notice asks you to scan a QR code to rebook delivery, and the page charges a small fee to steal your card details. A related scam sends a package you never ordered, with a QR code inside and no sender.',
    sections: [
      {
        heading: 'Fake collection notices',
        paragraphs: [
          'In June 2026 the Swiss National Cyber Security Centre described fake Swiss Post collection notes ("Avis de passage") left in letterboxes. They copy the colours and logo of the real yellow note and give plausible details of a failed delivery. The QR code opens a site that is almost identical to Swiss Post’s and asks for more information before the parcel can be delivered. The same playbook targets USPS, Royal Mail, DHL, La Poste and other carriers.',
        ],
      },
      {
        heading: 'Packages you never ordered',
        paragraphs: [
          'In July 2025 the FBI warned about unsolicited packages with no sender information and a QR code inside. Scanning it leads to pages that ask for personal and financial details, or to apps that steal data from the phone. The FTC issued a similar alert in January 2025.',
        ],
      },
      {
        heading: 'Red flags',
        bullets: [
          'A small "redelivery" or "customs" fee. Carriers rarely charge to rebook a delivery, and never through a sticker or a card in your letterbox.',
          'The site is not the carrier’s own domain: usps.com, royalmail.com, dhl.com, laposte.fr, post.ch, postnl.nl and so on. Names like usps-redelivery-track.com or royalmail.parcel-reschedule.help are not the carrier.',
          'No tracking number you recognise, or a tracking number that does not work on the carrier’s real site.',
          'The page asks for card details, an ID photo or a code sent to your phone.',
          'A package with no sender and a QR code “to find out who sent it” or “to claim a gift”.',
        ],
      },
      {
        heading: 'Check a delivery safely',
        bullets: [
          'Type the carrier’s address yourself, or open its official app, and enter the tracking number from the notice.',
          'If the number does not exist there, the notice is fake.',
          'Scan suspicious codes with QR Snap: it shows which site the code really opens and whether that site is new or a known scam.',
        ],
      },
      WHAT_QR_SNAP_CHECKS,
      HONEST_LIMITS,
    ],
    sources: [
      {
        label: 'Swiss NCSC: Phishing in the letterbox, fake QR codes on collection notices (June 2026)',
        url: 'https://www.bacs.admin.ch/en/26w24-en',
      },
      {
        label: 'FBI IC3 PSA I-073125-PSA: QR codes in unsolicited packages (July 2025)',
        url: 'https://www.ic3.gov/PSA/2025/PSA250731',
      },
      {
        label: 'FTC: Scam alert, QR code on an unexpected package (January 2025)',
        url: 'https://consumer.ftc.gov/consumer-alerts/2025/01/scam-alert-qr-code-unexpected-package',
      },
      {
        label: 'FTC: Scammers hide harmful links in QR codes to steal your information',
        url: 'https://consumer.ftc.gov/consumer-alerts/2023/12/scammers-hide-harmful-links-qr-codes-steal-your-information',
      },
    ],
  },
]

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug)
}
