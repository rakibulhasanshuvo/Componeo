import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateForm from './CreateForm';
import React from 'react';

// Mock MonacoEditor
vi.mock('@/components/editor/MonacoEditor', () => ({
  default: ({ value, onChange }: { value: string; onChange: (val: string) => void }) => (
    <textarea
      data-testid="monaco-mock"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

describe('CreateForm', () => {
  const defaultProps = {
    initialCode: 'export default function Component() {}',
    onCodeChange: vi.fn(),
    isSaving: false,
    saveError: null,
    onSaveError: vi.fn(),
    onSubmit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with initial values', () => {
    render(<CreateForm {...defaultProps} />);

    expect(screen.getByPlaceholderText(/COMPONENT TITLE.../i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ADD A BRIEF COMPONENT BIOGRAPHY.../i)).toBeInTheDocument();
    expect(screen.getByTestId('monaco-mock')).toHaveValue(defaultProps.initialCode);
  });

  it('calls onSubmit with form data when submitted successfully', async () => {
    const user = userEvent.setup();
    render(<CreateForm {...defaultProps} />);

    await user.type(screen.getByPlaceholderText(/COMPONENT TITLE.../i), 'New Component');
    await user.type(screen.getByPlaceholderText(/ADD A BRIEF COMPONENT BIOGRAPHY.../i), 'This is a test component');

    // Simulate changing code in Monaco
    const monaco = screen.getByTestId('monaco-mock');
    fireEvent.change(monaco, { target: { value: 'export default function NewComponent() {}' } });

    // The form has a hidden submit button
    const form = screen.getByRole('form', { hidden: true });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(defaultProps.onSubmit).toHaveBeenCalledWith(expect.objectContaining({
        title: 'New Component',
        description: 'This is a test component',
        code: 'export default function NewComponent() {}',
        category: 'Cursors', // default value
        is_public: true, // default value
      }));
    });
  });

  it('calls onSaveError when onSubmit fails with Error object', async () => {
    const user = userEvent.setup();
    const error = new Error('Database Failure');
    const onSubmitMock = vi.fn().mockRejectedValue(error);

    render(<CreateForm {...defaultProps} onSubmit={onSubmitMock} />);

    await user.type(screen.getByPlaceholderText(/COMPONENT TITLE.../i), 'Failing Component');

    const form = screen.getByRole('form', { hidden: true });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(defaultProps.onSaveError).toHaveBeenCalledWith('Database Failure');
    });
  });

  it('calls onSaveError with default message when onSubmit fails with unknown error', async () => {
    const user = userEvent.setup();
    const onSubmitMock = vi.fn().mockRejectedValue('Something went wrong');

    render(<CreateForm {...defaultProps} onSubmit={onSubmitMock} />);

    await user.type(screen.getByPlaceholderText(/COMPONENT TITLE.../i), 'Failing Component');

    const form = screen.getByRole('form', { hidden: true });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(defaultProps.onSaveError).toHaveBeenCalledWith('Forge Overheat: Critical failure saving component.');
    });
  });

  it('displays saveError when provided', () => {
    const errorMessage = "Critical malfunction";
    render(<CreateForm {...defaultProps} saveError={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('validates required fields and shows error messages', async () => {
    render(<CreateForm {...defaultProps} initialCode="" />);

    const form = screen.getByRole('form', { hidden: true });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/Title must be at least 3 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/Component code is too short for a valid forge./i)).toBeInTheDocument();
    });

    expect(defaultProps.onSubmit).not.toHaveBeenCalled();
  });
});
