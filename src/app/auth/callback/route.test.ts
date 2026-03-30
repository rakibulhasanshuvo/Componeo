import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET } from './route'
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

// Mock dependencies
vi.mock('next/server', () => ({
  NextResponse: {
    redirect: vi.fn((url: string) => ({ status: 302, url }))
  }
}))

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn()
}))

describe('Auth Callback Route', () => {
  const mockExchangeCodeForSession = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    // Default mock implementation
    ;(createClient as any).mockResolvedValue({
      auth: {
        exchangeCodeForSession: mockExchangeCodeForSession
      }
    })
  })

  const createRequest = (url: string, headers: Record<string, string> = {}) => {
    return {
      url,
      headers: {
        get: (name: string) => headers[name] || null
      }
    } as unknown as Request
  }

  it('should redirect to auth-error if code is missing', async () => {
    const request = createRequest('http://localhost:3000/auth/callback')

    await GET(request)

    expect(NextResponse.redirect).toHaveBeenCalledWith('http://localhost:3000/auth/auth-error')
  })

  it('should redirect to auth-error if exchangeCodeForSession returns an error', async () => {
    mockExchangeCodeForSession.mockResolvedValueOnce({ error: new Error('Auth error') })
    const request = createRequest('http://localhost:3000/auth/callback?code=test-code')

    await GET(request)

    expect(mockExchangeCodeForSession).toHaveBeenCalledWith('test-code')
    expect(NextResponse.redirect).toHaveBeenCalledWith('http://localhost:3000/auth/auth-error')
  })

  it('should redirect to auth-error if an exception is thrown during auth exchange', async () => {
    mockExchangeCodeForSession.mockRejectedValueOnce(new Error('Network error'))
    const request = createRequest('http://localhost:3000/auth/callback?code=test-code')

    await GET(request)

    expect(NextResponse.redirect).toHaveBeenCalledWith('http://localhost:3000/auth/auth-error')
  })

  it('should redirect to auth-error if createClient throws an exception', async () => {
    ;(createClient as any).mockRejectedValueOnce(new Error('Missing env variables'))
    const request = createRequest('http://localhost:3000/auth/callback?code=test-code')

    await GET(request)

    expect(NextResponse.redirect).toHaveBeenCalledWith('http://localhost:3000/auth/auth-error')
  })

  it('should redirect to origin + next in local environment when exchange succeeds', async () => {
    vi.stubEnv('NODE_ENV', 'development')

    mockExchangeCodeForSession.mockResolvedValueOnce({ error: null })
    const request = createRequest('http://localhost:3000/auth/callback?code=test-code&next=/custom-dashboard')

    await GET(request)

    expect(NextResponse.redirect).toHaveBeenCalledWith('http://localhost:3000/custom-dashboard')

    vi.unstubAllEnvs()
  })

  it('should redirect to forwardedHost + next in non-local environment when forwarded host exists', async () => {
    vi.stubEnv('NODE_ENV', 'production')

    mockExchangeCodeForSession.mockResolvedValueOnce({ error: null })
    const request = createRequest('https://original.com/auth/callback?code=test-code&next=/dashboard', {
      'x-forwarded-host': 'forwarded.com'
    })

    await GET(request)

    expect(NextResponse.redirect).toHaveBeenCalledWith('https://forwarded.com/dashboard')

    vi.unstubAllEnvs()
  })

  it('should redirect to origin + next in non-local environment when no forwarded host', async () => {
    vi.stubEnv('NODE_ENV', 'production')

    mockExchangeCodeForSession.mockResolvedValueOnce({ error: null })
    const request = createRequest('https://production.com/auth/callback?code=test-code&next=/dashboard')

    await GET(request)

    expect(NextResponse.redirect).toHaveBeenCalledWith('https://production.com/dashboard')

    vi.unstubAllEnvs()
  })

  it('should use default next value (/dashboard) if not provided in search params', async () => {
    vi.stubEnv('NODE_ENV', 'development')

    mockExchangeCodeForSession.mockResolvedValueOnce({ error: null })
    const request = createRequest('http://localhost:3000/auth/callback?code=test-code')

    await GET(request)

    expect(NextResponse.redirect).toHaveBeenCalledWith('http://localhost:3000/dashboard')

    vi.unstubAllEnvs()
  })

  it('should redirect to auth-error if an exception is thrown during exchange', async () => {
    // Simulate an exception thrown during createClient
    ;(createClient as any).mockRejectedValueOnce(new Error('Unexpected server error'))
    const request = createRequest('http://localhost:3000/auth/callback?code=test-code')

    await GET(request)

    expect(NextResponse.redirect).toHaveBeenCalledWith('http://localhost:3000/auth/auth-error')
  })

  it('should use default next value (/dashboard) if not provided in search params', async () => {
    const originalNodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    mockExchangeCodeForSession.mockResolvedValueOnce({ error: null })
    const request = createRequest('http://localhost:3000/auth/callback?code=test-code')

    await GET(request)

    expect(NextResponse.redirect).toHaveBeenCalledWith('http://localhost:3000/dashboard')

    process.env.NODE_ENV = originalNodeEnv
  })

  it('should use default next value (/dashboard) if not provided in search params', async () => {
    const originalNodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    mockExchangeCodeForSession.mockResolvedValueOnce({ error: null })
    const request = createRequest('http://localhost:3000/auth/callback?code=test-code')

    await GET(request)

    expect(NextResponse.redirect).toHaveBeenCalledWith('http://localhost:3000/dashboard')

    process.env.NODE_ENV = originalNodeEnv
  })

  it('should redirect to auth-error if an exception is thrown during exchange', async () => {
    // Simulate an exception thrown during createClient
    ;(createClient as any).mockRejectedValueOnce(new Error('Unexpected server error'))
    const request = createRequest('http://localhost:3000/auth/callback?code=test-code')

    await GET(request)

    expect(NextResponse.redirect).toHaveBeenCalledWith('http://localhost:3000/auth/auth-error')
  })
})
