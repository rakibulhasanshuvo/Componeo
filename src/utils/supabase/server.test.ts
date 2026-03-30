import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createClient } from './server'

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(),
}))

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}))

describe('createClient (server)', () => {
  const originalEnv = process.env
  let mockCookieStore: {
    getAll: ReturnType<typeof vi.fn>
    set: ReturnType<typeof vi.fn>
  }

  beforeEach(() => {
    vi.resetAllMocks()
    process.env = { ...originalEnv }

    mockCookieStore = {
      getAll: vi.fn().mockReturnValue([{ name: 'test-cookie', value: 'test-value' }]),
      set: vi.fn(),
    }

    vi.mocked(cookies).mockResolvedValue(mockCookieStore as any)
  })

  it('throws an error if environment variables are missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    await expect(createClient()).rejects.toThrow(
      'Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined.'
    )
  })

  it('calls createServerClient with correct parameters', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://custom-url.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'custom-key'

    await createClient()

    expect(createServerClient).toHaveBeenCalledWith(
      'https://custom-url.supabase.co',
      'custom-key',
      expect.objectContaining({
        cookies: expect.any(Object),
      })
    )
  })

  it('configures cookies.getAll correctly', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://custom-url.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'custom-key'

    await createClient()

    // Get the third argument (options object) passed to createServerClient
    const options = vi.mocked(createServerClient).mock.calls[0][2] as any
    const getAllResult = options.cookies.getAll()

    expect(mockCookieStore.getAll).toHaveBeenCalled()
    expect(getAllResult).toEqual([{ name: 'test-cookie', value: 'test-value' }])
  })

  it('configures cookies.setAll correctly for successful sets', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://custom-url.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'custom-key'

    await createClient()

    const options = vi.mocked(createServerClient).mock.calls[0][2] as any
    const cookiesToSet = [
      { name: 'cookie1', value: 'value1', options: { path: '/' } },
      { name: 'cookie2', value: 'value2', options: { path: '/admin' } },
    ]

    options.cookies.setAll(cookiesToSet)

    expect(mockCookieStore.set).toHaveBeenCalledTimes(2)
    expect(mockCookieStore.set).toHaveBeenNthCalledWith(1, 'cookie1', 'value1', { path: '/' })
    expect(mockCookieStore.set).toHaveBeenNthCalledWith(2, 'cookie2', 'value2', { path: '/admin' })
  })

  it('handles errors gracefully in cookies.setAll (Server Component scenario)', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://custom-url.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'custom-key'

    // Mock cookieStore.set to throw an error, simulating a Server Component attempt to set a cookie
    mockCookieStore.set.mockImplementation(() => {
      throw new Error('Cannot set cookies in Server Components')
    })

    await createClient()

    const options = vi.mocked(createServerClient).mock.calls[0][2] as any
    const cookiesToSet = [{ name: 'cookie1', value: 'value1', options: { path: '/' } }]

    // Should not throw
    expect(() => {
      options.cookies.setAll(cookiesToSet)
    }).not.toThrow()

    expect(mockCookieStore.set).toHaveBeenCalledTimes(1)
  })
})
