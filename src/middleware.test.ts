import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { middleware } from './middleware'
import { createServerClient } from '@supabase/ssr'
import { NextResponse, NextRequest } from 'next/server'

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(),
}))

vi.mock('next/server', () => {
  const next = vi.fn().mockImplementation(() => ({
    cookies: {
      set: vi.fn(),
    },
  }))
  const redirect = vi.fn().mockImplementation((url) => ({
    status: 302,
    url: url.toString(),
  }))
  return {
    NextResponse: {
      next,
      redirect,
    },
    NextRequest: vi.fn().mockImplementation((url) => ({
      url,
      nextUrl: new URL(url),
      cookies: {
        getAll: vi.fn().mockReturnValue([]),
        set: vi.fn(),
      },
    })),
  }
})

describe('middleware', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetAllMocks()
    process.env = { ...originalEnv }
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('throws an error if NEXT_PUBLIC_SUPABASE_URL is missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    const request = new NextRequest('http://localhost:3000')

    await expect(middleware(request)).rejects.toThrow(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined."
    )
  })

  it('throws an error if NEXT_PUBLIC_SUPABASE_ANON_KEY is missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const request = new NextRequest('http://localhost:3000')

    await expect(middleware(request)).rejects.toThrow(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined."
    )
  })

  it('calls createServerClient and returns next response when env vars are present', async () => {
    const request = new NextRequest('http://localhost:3000')
    const mockUser = { id: '123' }
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: mockUser }, error: null }),
      },
    }
    vi.mocked(createServerClient).mockReturnValue(mockSupabase as any)

    const response = await middleware(request)

    expect(createServerClient).toHaveBeenCalled()
    expect(NextResponse.next).toHaveBeenCalled()
    expect(response).toBeDefined()
  })

  it('redirects to login if user is not authenticated and accesses a protected route', async () => {
    const request = new NextRequest('http://localhost:3000/dashboard')
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
      },
    }
    vi.mocked(createServerClient).mockReturnValue(mockSupabase as any)

    await middleware(request)

    expect(NextResponse.redirect).toHaveBeenCalled()
    const redirectUrl = vi.mocked(NextResponse.redirect).mock.calls[0][0].toString()
    expect(redirectUrl).toContain('/login')
    expect(redirectUrl).toContain('next=%2Fdashboard')
  })
})
