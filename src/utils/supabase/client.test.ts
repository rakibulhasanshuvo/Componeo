import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createBrowserClient } from '@supabase/ssr'
import { createClient } from './client'

vi.mock('@supabase/ssr', () => ({
  createBrowserClient: vi.fn(),
}))

describe('createClient', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('calls createBrowserClient with provided environment variables', () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://custom-url.supabase.co')
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'custom-key')

    createClient()

    expect(createBrowserClient).toHaveBeenCalledWith(
      'https://custom-url.supabase.co',
      'custom-key'
    )
  })

  it('throws an error when environment variables are not set', () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '')
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', '')

    expect(() => createClient()).toThrowError(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined."
    )
  })

  it('throws an error when only NEXT_PUBLIC_SUPABASE_URL is not set', () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '')
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'custom-key')

    expect(() => createClient()).toThrowError(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined."
    )
  })

  it('throws an error when only NEXT_PUBLIC_SUPABASE_ANON_KEY is not set', () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://custom-url.supabase.co')
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', '')

    expect(() => createClient()).toThrowError(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined."
    )
  })
})
