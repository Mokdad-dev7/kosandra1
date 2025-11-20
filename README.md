# QR Snap Website

Official website for qrsnapp.app - A comprehensive QR code generation and management platform.

## Features

- **Multiple QR Code Types**: Generate QR codes for URLs, text, email, phone, SMS, WiFi credentials, and contact cards
- **Full Customization**: Customize colors, add logos, adjust error correction levels
- **Analytics Dashboard**: Track scans, view geographic data, device types, and time-based analytics
- **Dynamic QR Codes**: Create editable QR codes that can be updated without regenerating
- **User Accounts**: Save and manage your QR codes with user authentication
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **QR Generation**: qrcode library

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or cloud)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd qrsnap_website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your database URL and other configuration:
```
DATABASE_URL="postgresql://user:password@localhost:5432/qrsnap?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

4. Set up the database:
```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (for development)
npm run db:push

# Or run migrations (for production)
npm run db:migrate
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
qrsnap_website/
├── app/                    # Next.js app directory
│   ├── (marketing)/       # Marketing pages
│   ├── (auth)/            # Auth pages
│   ├── dashboard/         # Protected routes
│   └── api/               # API routes
├── components/
│   ├── ui/                # shadcn components
│   ├── qr/                # QR code components
│   ├── dashboard/         # Dashboard components
│   └── marketing/         # Marketing components
├── lib/
│   ├── qr/                # QR generation utilities
│   ├── db/                # Database client
│   └── auth/              # Auth utilities
├── prisma/                # Database schema
└── types/                 # TypeScript types
```

## Development

### Database Management

- Generate Prisma Client: `npm run db:generate`
- Push schema changes: `npm run db:push`
- Create migration: `npm run db:migrate`
- Open Prisma Studio: `npm run db:studio`

### Building for Production

```bash
npm run build
npm start
```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Your application URL
- `NEXTAUTH_SECRET`: Secret key for NextAuth (generate a random string)
- `GOOGLE_CLIENT_ID`: (Optional) For Google OAuth
- `GOOGLE_CLIENT_SECRET`: (Optional) For Google OAuth
- `GITHUB_CLIENT_ID`: (Optional) For GitHub OAuth
- `GITHUB_CLIENT_SECRET`: (Optional) For GitHub OAuth

## License

MIT
