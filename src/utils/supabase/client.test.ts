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

  it('asserting that createBrowserClient was called with appropriate environment variables', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://custom-url.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'custom-key'

    createClient()

    expect(createBrowserClient).toHaveBeenCalledWith(
      'https://custom-url.supabase.co',
      'custom-key'
    )
  })
})
