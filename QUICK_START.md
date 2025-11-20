# Quick Start Guide - How to See the Website

## Step 1: Set Up Environment Variables

Make sure your `.env` file has the following variables:

```env
# Database (required)
DATABASE_URL="postgresql://user:password@localhost:5432/qrsnap?schema=public"

# NextAuth (required)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-key-here"

# Optional: OAuth Providers (for Google/GitHub login)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

**Important:**
- Replace `user`, `password`, and `localhost:5432` with your PostgreSQL credentials
- Generate a random string for `NEXTAUTH_SECRET` (you can use: `openssl rand -base64 32`)

## Step 2: Set Up Database

### Option A: Using Local PostgreSQL

If you have PostgreSQL installed locally:

```bash
# Create database
createdb qrsnap

# Or using psql
psql -U postgres
CREATE DATABASE qrsnap;
```

### Option B: Using a Cloud Database (Recommended for Quick Start)

You can use free services like:
- **Supabase**: https://supabase.com (free tier available)
- **Neon**: https://neon.tech (free tier available)
- **Railway**: https://railway.app (free tier available)

Just copy the connection string they provide to your `DATABASE_URL`.

## Step 3: Initialize Database Schema

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (for development)
npm run db:push

# OR create a migration (for production)
npm run db:migrate
```

## Step 4: Start Development Server

```bash
npm run dev
```

## Step 5: Open in Browser

Open your browser and go to:
```
http://localhost:3000
```

## What You'll See

1. **Landing Page** (`/`) - The main marketing page with QR generator demo
2. **Register** (`/register`) - Create a new account
3. **Login** (`/login`) - Sign in to your account
4. **Dashboard** (`/dashboard`) - Your QR code management (requires login)

## Quick Test Without Database

If you just want to see the UI without setting up a database, you can:

1. Comment out database calls temporarily
2. The landing page and QR generator (without saving) will work without a database
3. However, authentication and saving QR codes require a database

## Troubleshooting

### "Missing required environment variable: DATABASE_URL"
- Make sure your `.env` file exists and has `DATABASE_URL` set
- Check that the file is in the root directory (same level as `package.json`)

### "Can't reach database server"
- Verify your PostgreSQL is running: `pg_isready` or check your cloud database status
- Double-check your `DATABASE_URL` connection string

### Port 3000 already in use
- Kill the process: `lsof -ti:3000 | xargs kill -9`
- Or use a different port: `npm run dev -- -p 3001`

## Next Steps

Once the website is running:
1. Visit the landing page to try the QR generator
2. Register an account to save QR codes
3. Create QR codes in the dashboard
4. Try dynamic QR codes (URL type only)
5. Check analytics for your QR codes

