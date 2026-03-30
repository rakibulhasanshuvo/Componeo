import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LoginPage from './page';
import { createClient } from '@/utils/supabase/client';

vi.mock('@/utils/supabase/client', () => ({
  createClient: vi.fn(),
}));

// Mock Navbar and Footer to simplify the test and avoid rendering issues
vi.mock('@/components/layout/Navbar', () => ({
  default: () => <div data-testid="navbar" />
}));

vi.mock('@/components/layout/Footer', () => ({
  default: () => <div data-testid="footer" />
}));

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays an error message when handleLogin fails', async () => {
    // Arrange
    const mockSignInWithOtp = vi.fn().mockResolvedValue({
      error: { message: 'Invalid email address' }
    });

    (createClient as any).mockReturnValue({
      auth: {
        signInWithOtp: mockSignInWithOtp
      }
    });

    render(<LoginPage />);

    // Act
    const emailInput = screen.getByPlaceholderText('architect@componeo.io');
    const submitButton = screen.getByRole('button', { name: /dispatch access link/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockSignInWithOtp).toHaveBeenCalledWith({
        email: 'test@example.com',
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
    });

    const errorMessage = await screen.findByText('Invalid email address');
    expect(errorMessage).toBeInTheDocument();
  });
});