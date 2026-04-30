import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createBrowserClient } from '@supabase/ssr'
import { createClient } from './client'

vi.mock('@supabase/ssr', () => ({
  createBrowserClient: vi.fn(),
}))

describe('createClient', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://test.supabase.co')
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'test-key')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('initializes createBrowserClient with correct environment variables', () => {
    const mockInstance = { supabase: 'client' }
    vi.mocked(createBrowserClient).mockReturnValue(mockInstance as any)

    const result = createClient()

    expect(createBrowserClient).toHaveBeenCalledWith(
      'https://test.supabase.co',
      'test-key'
    )
    expect(result).toBe(mockInstance)
  })

  it('throws an error if NEXT_PUBLIC_SUPABASE_URL is missing', () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '')

    expect(() => createClient()).toThrow(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined."
    )
  })

  it('throws an error if NEXT_PUBLIC_SUPABASE_ANON_KEY is missing', () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', '')

    expect(() => createClient()).toThrow(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined."
    )
  })

  it('throws an error if environment variables are undefined', () => {
    // @ts-ignore - testing runtime failure
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', undefined)
    // @ts-ignore - testing runtime failure
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', undefined)

    expect(() => createClient()).toThrow(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined."
    )
  })
})
