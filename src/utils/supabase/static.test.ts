import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createServerClient } from '@supabase/ssr'
import { createStaticClient } from './static'

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(),
}))

describe('createStaticClient', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://test.supabase.co')
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'test-key')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('initializes createServerClient with correct environment variables and static cookie handler', () => {
    const mockInstance = { supabase: 'static-client' }
    vi.mocked(createServerClient).mockReturnValue(mockInstance as any)

    const result = createStaticClient()

    expect(createServerClient).toHaveBeenCalledTimes(1)
    const [url, key, options] = vi.mocked(createServerClient).mock.calls[0]

    expect(url).toBe('https://test.supabase.co')
    expect(key).toBe('test-key')

    // Verify static cookie handler
    expect(options.cookies.getAll()).toEqual([])
    expect(result).toBe(mockInstance)
  })

  it('throws an error if NEXT_PUBLIC_SUPABASE_URL is missing', () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '')

    expect(() => createStaticClient()).toThrow(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined."
    )
  })

  it('throws an error if NEXT_PUBLIC_SUPABASE_ANON_KEY is missing', () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', '')

    expect(() => createStaticClient()).toThrow(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined."
    )
  })
})
