const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined
}

// Create Prisma client only if DATABASE_URL is available and Prisma Client is generated
let prisma: any = null

try {
  if (process.env.DATABASE_URL) {
    // Dynamically import PrismaClient to avoid errors if not generated
    const { PrismaClient } = require('@prisma/client')
    prisma = globalForPrisma.prisma ?? new PrismaClient()
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
  }
} catch (error) {
  // Prisma Client not generated yet - this is fine for preview mode
  prisma = null
}

export { prisma }

