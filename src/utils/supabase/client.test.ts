import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createBrowserClient } from '@supabase/ssr'
import { createClient } from './client'

vi.mock('@supabase/ssr', () => ({
  createBrowserClient: vi.fn(),
}))

describe('createClient', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetAllMocks()
    process.env = { ...originalEnv }
  })

  it('calls createBrowserClient with provided environment variables', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://custom-url.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'custom-key'

    createClient()

    expect(createBrowserClient).toHaveBeenCalledWith(
      'https://custom-url.supabase.co',
      'custom-key'
    )
  })

  it('throws an error when environment variables are not set', () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    expect(() => createClient()).toThrowError(
      'Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined.'
    )
  })
})
