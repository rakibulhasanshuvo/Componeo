import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './page';
import { createClient } from '@/utils/supabase/client';

// Mock the components
jest.mock('lucide-react', () => ({
  Mail: () => <div data-testid="icon-mail" />,
  ArrowRight: () => <div data-testid="icon-arrow-right" />,
  ShieldCheck: () => <div data-testid="icon-shield-check" />,
  Command: () => <div data-testid="icon-command" />,
  ChevronRight: () => <div data-testid="icon-chevron-right" />,
}));

jest.mock('@/components/layout/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('@/components/layout/Footer', () => () => <div data-testid="footer" />);

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: any) => <div className={className}>{children}</div>,
    h1: ({ children, className }: any) => <h1 className={className}>{children}</h1>,
  },
}));

// Mock Supabase
jest.mock('@/utils/supabase/client', () => ({
  createClient: jest.fn(),
}));

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<LoginPage />);
    expect(screen.getByText('Matrix Access')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('architect@componeo.io')).toBeInTheDocument();
    expect(screen.getByText('Dispatch Access Link')).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    const mockSignInWithOtp = jest.fn().mockResolvedValue({ error: null });
    (createClient as jest.Mock).mockReturnValue({
      auth: {
        signInWithOtp: mockSignInWithOtp,
      },
    });

    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText('architect@componeo.io');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const form = emailInput.closest('form');
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockSignInWithOtp).toHaveBeenCalledWith({
        email: 'test@example.com',
        options: {
          emailRedirectTo: 'http://localhost/auth/callback',
        },
      });
      expect(screen.getByText('Matrix access link dispatched. Check your terminal (inbox).')).toBeInTheDocument();
    });
  });

  it('handles login error', async () => {
    const mockSignInWithOtp = jest.fn().mockResolvedValue({ error: { message: 'Invalid email address' } });
    (createClient as jest.Mock).mockReturnValue({
      auth: {
        signInWithOtp: mockSignInWithOtp,
      },
    });

    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText('architect@componeo.io');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const form = emailInput.closest('form');
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockSignInWithOtp).toHaveBeenCalledWith({
        email: 'invalid-email',
        options: {
          emailRedirectTo: 'http://localhost/auth/callback',
        },
      });
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
  });
});
