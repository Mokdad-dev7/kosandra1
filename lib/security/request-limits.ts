import { NextRequest, NextResponse } from 'next/server'
import { securityHeaders } from './headers'

// Maximum request body size (1MB for JSON)
const MAX_BODY_SIZE = 1024 * 1024 // 1MB

// Maximum URL length
const MAX_URL_LENGTH = 2048

/**
 * Validates request body size to prevent DoS attacks
 */
export async function validateRequestBodySize(
  request: NextRequest
): Promise<NextResponse | null> {
  const contentLength = request.headers.get('content-length')
  
  if (contentLength) {
    const size = parseInt(contentLength, 10)
    if (size > MAX_BODY_SIZE) {
      const response = NextResponse.json(
        { error: 'Request body too large. Maximum size is 1MB.' },
        { status: 413 }
      )
      return securityHeaders(response)
    }
  }

  return null
}

/**
 * Validates URL length to prevent DoS attacks
 */
export function validateUrlLength(url: string): boolean {
  return url.length <= MAX_URL_LENGTH
}

/**
 * Safely parse JSON with size and timeout limits
 */
export async function safeJsonParse<T>(
  request: NextRequest,
  maxSize: number = MAX_BODY_SIZE
): Promise<{ data: T; error: null } | { data: null; error: NextResponse }> {
  try {
    // Check content length first
    const contentLength = request.headers.get('content-length')
    if (contentLength) {
      const size = parseInt(contentLength, 10)
      if (size > maxSize) {
        const response = NextResponse.json(
          { error: 'Request body too large' },
          { status: 413 }
        )
        return { data: null, error: securityHeaders(response) }
      }
    }

    // Read body with timeout
    const bodyPromise = request.text()
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), 10000) // 10 second timeout
    )

    const bodyText = await Promise.race([bodyPromise, timeoutPromise])

    // Check actual body size
    if (bodyText.length > maxSize) {
      const response = NextResponse.json(
        { error: 'Request body too large' },
        { status: 413 }
      )
      return { data: null, error: securityHeaders(response) }
    }

    // Parse JSON
    const data = JSON.parse(bodyText) as T
    return { data, error: null }
  } catch (error) {
    if (error instanceof Error && error.message === 'Request timeout') {
      const response = NextResponse.json(
        { error: 'Request timeout' },
        { status: 408 }
      )
      return { data: null, error: securityHeaders(response) }
    }

    if (error instanceof SyntaxError) {
      const response = NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      )
      return { data: null, error: securityHeaders(response) }
    }

    const response = NextResponse.json(
      { error: 'Failed to parse request body' },
      { status: 400 }
    )
    return { data: null, error: securityHeaders(response) }
  }
}

