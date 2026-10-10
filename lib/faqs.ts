export type FaqItem = {
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    question: 'What types of QR codes can I create?',
    answer:
      'You can create QR codes for URLs, plain text, email addresses, phone numbers, SMS messages, WiFi credentials, contact cards (vCard), calendar events, locations, social media links, and product barcodes (EAN, ISBN, and related formats as supported in-app).',
  },
  {
    question: 'What are the pricing plans?',
    answer:
      'QR Snap is Free forever for scan and generate: history, favorites, ads, 1 URL safety check per day (plus 2 more for each rewarded ad), unlimited email domain checks, the Quick actions widget and one Pinned QR widget. Optional Lifetime Unlock ($9.99 one-time) removes ads, raises link checks to 15 per day, and unlocks gallery batch scan, local backup and restore, export (CSV, JSON, image ZIP), share, Point of Sale, and unlimited Pinned QR widgets. URL packs add 50, 150, or 400 checks that never expire on that install. Store prices in the app are authoritative.',
  },
  {
    question: 'What is Lifetime Unlock?',
    answer:
      'Lifetime Unlock is a $9.99 one-time purchase, not a subscription. It removes ads and unlocks gallery batch scan, backup and restore, export, share, Point of Sale, and unlimited Pinned QR widgets. It includes 15 URL safety checks per day instead of 1. Buy credit packs if you need more. Restore it with the same store account on the Plans screen.',
  },
  {
    question: 'What is Point of Sale in QR Snap?',
    answer:
      'Point of Sale is an on-device shop tool in Lifetime Unlock. You keep a local product list, scan barcodes into a cart, review sales history and reports, and generate PDF receipts or set up a thermal printer where the platform allows. POS data stays on the device and backs up with Lifetime tools. You handle tax and receipt rules in your area.',
  },
  {
    question: 'What export and share formats are available?',
    answer:
      'Lifetime Unlock unlocks export as CSV, JSON, image ZIP, and parsed text as shown in-app, plus share flows to other apps on the device. Free users can scan, generate, and keep local history. There is no cloud sync.',
  },
  {
    question: 'Can I backup and restore my QR codes?',
    answer:
      'Yes with Lifetime Unlock: local backup and restore on the device. Codes are not synced to a cloud. Restore the backup file on that device when you need it.',
  },
  {
    question: 'How do I scan QR codes and barcodes?',
    answer:
      'Use the live camera, or pick images from your gallery. Camera batch scanning is free. Batch scanning from gallery images requires Lifetime Unlock. Recognition covers QR and many barcode formats.',
  },
  {
    question: 'What are rewarded ads?',
    answer:
      'Watch a short ad to earn +2 URL safety checks (Free and Lifetime). Free users can also unlock a productivity feature once via a rewarded ad. Up to 4 rewarded ads per rolling 24 hours, with a 15-minute cooldown.',
  },
  {
    question: 'Are QR codes safe to scan?',
    answer:
      'Scanning only reads data. Opening a link can be risky. QR Snap checks URLs for known threats and suspicious patterns and shows a clear safe, risk, or unavailable result before you open them. Free includes 1 URL check per day and Lifetime Unlock includes 15. Email domain checks are unlimited.',
  },
  {
    question: 'Is my data private?',
    answer:
      'History and created codes stay on your device. No account is required. A URL check sends only what is needed to the backend (see Privacy Policy). Purchased credit balances are tied to the installation, not a login.',
  },
  {
    question: 'Does the app work offline?',
    answer:
      'Scan, generate, history, Point of Sale, and most actions work offline. Link safety checks and some product lookups need internet.',
  },
  {
    question: 'How is my QR code history stored?',
    answer:
      'Codes are stored locally with Hive on-device storage. You get scan and create history, favorites, folders, and smart filters. History never leaves the device unless you export or back it up with Lifetime Unlock.',
  },
  {
    question: 'What barcode and QR code formats are supported?',
    answer:
      'QR Snap supports QR codes plus common barcode formats including EAN-13, EAN-8, UPC, Code 128, Code 39, ITF, and more. The app can generate and scan these formats as supported in-app.',
  },
  {
    question: 'Will QR codes with logos still scan?',
    answer:
      'When you add a logo, the app uses high error correction so up to about 30% of the code can be covered and still scan. Test yours after adding a logo.',
  },
  {
    question: 'What happens to my URL check credits if I uninstall?',
    answer:
      'Purchased URL credits are tied to the anonymous installation wallet. They cannot be restored after uninstall, clearing app data, or a new device. Lifetime Unlock restores with the same store account via Restore on the Plans screen.',
  },
  {
    question: 'How do I make a QR code from another app?',
    answer:
      'Use Share in any app, for example on a link, a piece of text, a contact, or a calendar event, and pick QR Snap. QR Snap opens the matching QR generator with the details already filled in. For a link, the title defaults to the site name.',
  },
  {
    question: 'What home screen widgets does QR Snap have?',
    answer:
      'Quick actions gives you one-tap Scan, Gallery, Create, and Clipboard. Pinned QR keeps one of your saved QR codes on the home screen, ready for someone to scan, such as your Wi-Fi or a payment link. Free includes one Pinned QR widget; Lifetime Unlock lets you pin as many as you like. Add them from your launcher widget list, or use Pin to home screen on a QR code in the app.',
  },
  {
    question: 'What features are coming?',
    answer:
      'An iPhone version is in development, with the same features including the share extension and home screen widgets. There is no release date yet. Submit ideas on the Feedback page.',
  },
]
