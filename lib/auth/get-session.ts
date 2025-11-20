import { getServerSession } from 'next-auth'
import { authOptions } from './config'

export async function getSession() {
  // In preview mode (no database), return null to allow preview access
  if (!process.env.DATABASE_URL) {
    return null
  }
  return await getServerSession(authOptions)
}

