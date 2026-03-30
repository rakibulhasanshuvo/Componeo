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

  beforeEach(() => {
    vi.resetAllMocks()
    process.env = { ...originalEnv }
  })

  it('throws an error if NEXT_PUBLIC_SUPABASE_URL is missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'
    vi.mocked(cookies).mockResolvedValue({} as any)

    await expect(createClient()).rejects.toThrow(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined."
    )
  })

  it('throws an error if NEXT_PUBLIC_SUPABASE_ANON_KEY is missing', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    vi.mocked(cookies).mockResolvedValue({} as any)

    await expect(createClient()).rejects.toThrow(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined."
    )
  })

  it('calls createServerClient with correct parameters and methods', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'

    const mockGetAll = vi.fn().mockReturnValue([{ name: 'test', value: '123' }])
    const mockSet = vi.fn()
    const mockCookieStore = {
      getAll: mockGetAll,
      set: mockSet,
    }

    vi.mocked(cookies).mockResolvedValue(mockCookieStore as any)

    await createClient()

    expect(createServerClient).toHaveBeenCalledTimes(1)
    const [url, key, options] = vi.mocked(createServerClient).mock.calls[0]

    expect(url).toBe('https://test.supabase.co')
    expect(key).toBe('test-key')

    // Test cookies.getAll()
    const allCookies = options.cookies.getAll()
    expect(mockGetAll).toHaveBeenCalledTimes(1)
    expect(allCookies).toEqual([{ name: 'test', value: '123' }])

    // Test cookies.setAll() successfully
    const cookiesToSet = [
      { name: 'session', value: 'xyz', options: { path: '/' } },
      { name: 'theme', value: 'dark', options: { path: '/', maxAge: 3600 } },
    ]
    options.cookies.setAll(cookiesToSet)

    expect(mockSet).toHaveBeenCalledTimes(2)
    expect(mockSet).toHaveBeenNthCalledWith(1, 'session', 'xyz', { path: '/' })
    expect(mockSet).toHaveBeenNthCalledWith(2, 'theme', 'dark', { path: '/', maxAge: 3600 })
  })

  it('ignores errors in setAll when cookieStore.set throws (e.g. in Server Components)', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'

    const mockSet = vi.fn().mockImplementation(() => {
      throw new Error("Cookies can only be modified in a Server Action or Route Handler.")
    })
    const mockCookieStore = {
      getAll: vi.fn(),
      set: mockSet,
    }

    vi.mocked(cookies).mockResolvedValue(mockCookieStore as any)

    await createClient()

    const options = vi.mocked(createServerClient).mock.calls[0][2]

    const cookiesToSet = [{ name: 'test', value: '123', options: {} }]

    // This should not throw an error because of the try/catch in setAll
    expect(() => options.cookies.setAll(cookiesToSet)).not.toThrow()
    expect(mockSet).toHaveBeenCalledTimes(1)
  })
})
