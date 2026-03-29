import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createClient } from './server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Mock next/headers
vi.mock('next/headers', () => {
  return {
    cookies: vi.fn(),
  }
})

// Mock @supabase/ssr
vi.mock('@supabase/ssr', () => {
  return {
    createServerClient: vi.fn(),
  }
})

describe('createClient', () => {
  const mockCookieStore = {
    getAll: vi.fn(),
    set: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(cookies as any).mockResolvedValue(mockCookieStore)

    // Reset environment variables
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test-url.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'
  })

  it('creates a client with the correct environment variables', async () => {
    await createClient()

    expect(createServerClient).toHaveBeenCalledWith(
      'https://test-url.supabase.co',
      'test-anon-key',
      expect.any(Object)
    )
  })

  it('uses fallback placeholders if environment variables are not set', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    await createClient()

    expect(createServerClient).toHaveBeenCalledWith(
      'https://placeholder-url.supabase.co',
      'placeholder-key',
      expect.any(Object)
    )
  })

  describe('cookie handling', () => {
    it('getAll() returns all cookies from the cookie store', async () => {
      const mockCookies = [{ name: 'test', value: 'value' }]
      mockCookieStore.getAll.mockReturnValue(mockCookies)

      await createClient()

      const options = (createServerClient as any).mock.calls[0][2]
      const result = options.cookies.getAll()

      expect(mockCookieStore.getAll).toHaveBeenCalled()
      expect(result).toEqual(mockCookies)
    })

    it('setAll() calls set() on the cookie store for each cookie', async () => {
      await createClient()

      const options = (createServerClient as any).mock.calls[0][2]

      const cookiesToSet = [
        { name: 'test1', value: 'value1', options: { path: '/' } },
        { name: 'test2', value: 'value2', options: { httpOnly: true } },
      ]

      options.cookies.setAll(cookiesToSet)

      expect(mockCookieStore.set).toHaveBeenCalledTimes(2)
      expect(mockCookieStore.set).toHaveBeenNthCalledWith(1, 'test1', 'value1', { path: '/' })
      expect(mockCookieStore.set).toHaveBeenNthCalledWith(2, 'test2', 'value2', { httpOnly: true })
    })

    it('setAll() ignores errors thrown by the cookie store', async () => {
      await createClient()

      const options = (createServerClient as any).mock.calls[0][2]

      const cookiesToSet = [
        { name: 'test1', value: 'value1', options: {} }
      ]

      mockCookieStore.set.mockImplementation(() => {
        throw new Error('Server component error')
      })

      // Should not throw
      expect(() => {
        options.cookies.setAll(cookiesToSet)
      }).not.toThrow()

      expect(mockCookieStore.set).toHaveBeenCalledWith('test1', 'value1', {})
    })
  })
})
