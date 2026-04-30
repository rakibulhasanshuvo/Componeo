import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from './page'
import { createClient } from '@/utils/supabase/client'
import React from 'react'

// Mock dependencies
vi.mock('@/utils/supabase/client', () => ({
  createClient: vi.fn()
}))

// Mock Next.js navigation and components if needed
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => '/login',
}))

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => React.createElement('div', props, children),
    h1: ({ children, ...props }: any) => React.createElement('h1', props, children),
  },
  AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children),
}))

describe('LoginPage', () => {
  const mockSignInWithOtp = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    // Default mock implementation
    ;(createClient as any).mockReturnValue({
      auth: {
        signInWithOtp: mockSignInWithOtp
      }
    })
  })

  it('displays a generic error message when login fails', async () => {
    // Setup the mock to return an error
    const errorMessage = 'Invalid email address'
    mockSignInWithOtp.mockResolvedValueOnce({
      error: new Error(errorMessage)
    })

    render(React.createElement(LoginPage))

    // Find the input and type an email
    const emailInput = screen.getByPlaceholderText('architect@componeo.io')
    await userEvent.type(emailInput, 'test@example.com')

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /dispatch access link/i })
    fireEvent.submit(submitButton)

    // Verify the generic error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/authentication failed/i)).toBeInTheDocument()
    })

    // Verify the supabase client was called with correct args
    expect(mockSignInWithOtp).toHaveBeenCalledWith({
      email: 'test@example.com',
      options: {
        emailRedirectTo: expect.stringContaining('/auth/callback')
      }
    })
  })

  it('displays a success message when login succeeds', async () => {
    // Setup the mock to return success
    mockSignInWithOtp.mockResolvedValueOnce({
      error: null
    })

    render(React.createElement(LoginPage))

    // Find the input and type an email
    const emailInput = screen.getByPlaceholderText('architect@componeo.io')
    await userEvent.type(emailInput, 'test@example.com')

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /dispatch access link/i })
    fireEvent.submit(submitButton)

    // Verify the success message is displayed
    await waitFor(() => {
      expect(screen.getByText(/matrix access link dispatched/i)).toBeInTheDocument()
    })
  })
})
