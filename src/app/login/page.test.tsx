import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LoginPage from './page';
import { createClient } from '@/utils/supabase/client';
import React from 'react';

// Mock Supabase Client
vi.mock('@/utils/supabase/client', () => {
  const mockSignInWithOtp = vi.fn();
  return {
    createClient: vi.fn(() => ({
      auth: {
        signInWithOtp: mockSignInWithOtp,
      },
    })),
  };
});

// Mock Next Navigation if needed by layout/navbar, etc
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/login',
}));

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form correctly', () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText('architect@componeo.io')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /dispatch access link/i })).toBeInTheDocument();
  });

  it('displays error message on failed login', async () => {
    // Setup the mock to return an error
    const mockSignInWithOtp = vi.fn().mockResolvedValue({
      error: { message: 'Invalid email address' },
    });
    vi.mocked(createClient).mockReturnValue({
      auth: { signInWithOtp: mockSignInWithOtp },
    } as any);

    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('architect@componeo.io');
    const submitButton = screen.getByRole('button', { name: /dispatch access link/i });

    // Fill the form and submit
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    // Expect loading state
    expect(submitButton).toHaveTextContent(/synchronizing/i);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });

    // Check if loading state reverted
    expect(submitButton).toHaveTextContent(/dispatch access link/i);

    // Verify correct API call
    expect(mockSignInWithOtp).toHaveBeenCalledWith({
      email: 'test@example.com',
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  });

  it('displays success message on successful login', async () => {
    // Setup the mock to return success (no error)
    const mockSignInWithOtp = vi.fn().mockResolvedValue({
      error: null,
    });
    vi.mocked(createClient).mockReturnValue({
      auth: { signInWithOtp: mockSignInWithOtp },
    } as any);

    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('architect@componeo.io');
    const submitButton = screen.getByRole('button', { name: /dispatch access link/i });

    // Fill the form and submit
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    // Wait for the success message to appear
    await waitFor(() => {
      expect(screen.getByText('Matrix access link dispatched. Check your terminal (inbox).')).toBeInTheDocument();
    });

    // Verify correct API call
    expect(mockSignInWithOtp).toHaveBeenCalledWith({
      email: 'test@example.com',
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  });
});
