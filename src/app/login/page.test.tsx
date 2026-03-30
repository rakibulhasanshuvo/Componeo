import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LoginPage from './page';
import { createClient } from '@/utils/supabase/client';

// Mock components to simplify tests
vi.mock('@/components/layout/Navbar', () => ({ default: () => <div data-testid="navbar" /> }));
vi.mock('@/components/layout/Footer', () => ({ default: () => <div data-testid="footer" /> }));

// Mock Supabase client
vi.mock('@/utils/supabase/client', () => ({
  createClient: vi.fn(),
}));

describe('LoginPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders correctly', () => {
    render(<LoginPage />);
    expect(screen.getAllByText('Matrix Access')[0]).toBeDefined();
    expect(screen.getAllByPlaceholderText('architect@componeo.io')[0]).toBeDefined();
    expect(screen.getAllByText('Dispatch Access Link')[0]).toBeDefined();
  });

  it('displays success message on successful login', async () => {
    const mockSignInWithOtp = vi.fn().mockResolvedValue({ error: null });
    (createClient as any).mockReturnValue({
      auth: { signInWithOtp: mockSignInWithOtp },
    });

    render(<LoginPage />);

    const emailInput = screen.getAllByPlaceholderText('architect@componeo.io')[0];
    const submitButton = screen.getAllByText('Dispatch Access Link')[0];

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Matrix access link dispatched. Check your terminal (inbox).')).toBeDefined();
    });

    expect(mockSignInWithOtp).toHaveBeenCalledWith({
      email: 'test@example.com',
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  });

  it('displays error message on failed login', async () => {
    const mockSignInWithOtp = vi.fn().mockResolvedValue({
      error: { message: 'Failed to dispatch access link.' }
    });
    (createClient as any).mockReturnValue({
      auth: { signInWithOtp: mockSignInWithOtp },
    });

    render(<LoginPage />);

    const emailInput = screen.getAllByPlaceholderText('architect@componeo.io')[0];
    const submitButton = screen.getAllByText('Dispatch Access Link')[0];

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to dispatch access link.')).toBeDefined();
    });

    expect(mockSignInWithOtp).toHaveBeenCalledWith({
      email: 'test@example.com',
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  });
});