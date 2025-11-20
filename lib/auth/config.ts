import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { prisma } from '@/lib/db/client'
import bcrypt from 'bcryptjs'
import { emailSchema } from '@/lib/security/validation'

// Check if database is available
const isDatabaseAvailable = !!process.env.DATABASE_URL && prisma

// Account lockout configuration
const MAX_FAILED_ATTEMPTS = 5
const LOCKOUT_DURATION_MS = 15 * 60 * 1000 // 15 minutes

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!isDatabaseAvailable) {
          return null
        }

        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Validate and sanitize email
        const emailResult = emailSchema.safeParse(credentials.email)
        if (!emailResult.success) {
          return null
        }

        const email = emailResult.data

        // Get user with lockout check
        const user = await prisma.user.findUnique({
          where: { email },
        })

        if (!user || !user.passwordHash) {
          // Log failed attempt (user doesn't exist)
          await logLoginAttempt(email, null, false, 'User not found')
          return null
        }

        // Check if account is locked
        if (user.lockedUntil && user.lockedUntil > new Date()) {
          const remainingMinutes = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000)
          throw new Error(`Account locked. Try again in ${remainingMinutes} minute(s).`)
        }

        // Verify password
        const isValid = await bcrypt.compare(credentials.password, user.passwordHash)

        // Get IP address for logging
        const ipAddress = 'unknown' // Will be set by the request context

        if (!isValid) {
          // Increment failed attempts
          const newFailedAttempts = user.failedLoginAttempts + 1
          const shouldLock = newFailedAttempts >= MAX_FAILED_ATTEMPTS

          await prisma.user.update({
            where: { id: user.id },
            data: {
              failedLoginAttempts: newFailedAttempts,
              lockedUntil: shouldLock ? new Date(Date.now() + LOCKOUT_DURATION_MS) : null,
            },
          })

          // Log failed attempt
          await logLoginAttempt(email, user.id, false, 'Invalid password')

          if (shouldLock) {
            throw new Error(`Account locked due to ${MAX_FAILED_ATTEMPTS} failed login attempts. Try again in 15 minutes.`)
          }

          return null
        }

        // Successful login - reset failed attempts and update last login
        await prisma.user.update({
          where: { id: user.id },
          data: {
            failedLoginAttempts: 0,
            lockedUntil: null,
            lastLoginAt: new Date(),
            // lastLoginIp will be set from request context if available
          },
        })

        // Log successful login
        await logLoginAttempt(email, user.id, true, 'Login successful')

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!isDatabaseAvailable) {
        return false
      }

      if (account?.provider === 'google' || account?.provider === 'github') {
        // Check if user exists, if not create them
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        })

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name || null,
              emailVerified: new Date(),
            },
          })
        }
      }
      return true
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    callbackUrl: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.callback-url' : 'next-auth.callback-url',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: process.env.NODE_ENV === 'production' ? '__Host-next-auth.csrf-token' : 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
}

// Helper function to log login attempts
async function logLoginAttempt(
  email: string,
  userId: string | null,
  success: boolean,
  reason: string,
  ipAddress?: string,
  userAgent?: string
) {
  if (!isDatabaseAvailable || !prisma) {
    return
  }

  try {
    await prisma.loginLog.create({
      data: {
        userId: userId || '',
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
        success,
      },
    })
  } catch (error) {
    // Don't throw - logging failures shouldn't break authentication
    console.error('Failed to log login attempt:', error)
  }
}

