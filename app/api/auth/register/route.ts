import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { passwordSchema, emailSchema, sanitizeString } from '@/lib/security/validation'
import { authRateLimit } from '@/lib/security/rate-limit'
import { securityHeaders } from '@/lib/security/headers'
import { validateRequestBodySize, safeJsonParse } from '@/lib/security/request-limits'

const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().max(100).optional().transform((val) => val ? sanitizeString(val, 100) : undefined),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = await authRateLimit(request)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    // Preview mode check
    if (!process.env.DATABASE_URL || !prisma) {
      const response = NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
      return securityHeaders(response)
    }

    // Validate request body size
    const bodySizeCheck = await validateRequestBodySize(request)
    if (bodySizeCheck) {
      return bodySizeCheck
    }

    // Safely parse JSON with size limits
    const parseResult = await safeJsonParse<z.infer<typeof registerSchema>>(request)
    if (parseResult.error) {
      return parseResult.error
    }

    const body = parseResult.data
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      const response = NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
      return securityHeaders(response)
    }

    // Hash password with increased rounds for better security
    const passwordHash = await bcrypt.hash(validatedData.password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name || null,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })

    const response = NextResponse.json(
      { message: 'User created successfully', user },
      { status: 201 }
    )
    return securityHeaders(response)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response = NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
      return securityHeaders(response)
    }

    console.error('Error registering user:', error)
    const response = NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    )
    return securityHeaders(response)
  }
}

