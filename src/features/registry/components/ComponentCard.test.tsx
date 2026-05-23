import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ComponentCard from './ComponentCard';
import React from 'react';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      ...actual.motion,
      article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
    useMotionValue: () => ({ set: vi.fn(), get: () => 0 }),
    useSpring: () => ({ set: vi.fn(), get: () => 0 }),
    useTransform: () => ({ get: () => 0 }),
  };
});

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

// Mock dynamic import
vi.mock('next/dynamic', () => ({
  default: () => () => <div data-testid="live-preview">Live Preview</div>,
}));

describe('ComponentCard', () => {
  const mockComponent = {
    id: 'test-id-1234',
    title: 'Test Component',
    description: 'A test description for the component.',
    category: 'Buttons',
    code: 'export default function Test() { return <button>Test</button>; }',
    thumbnail_url: 'https://example.com/image.png',
    created_at: '2023-01-01T00:00:00Z',
    user_id: 'user-1',
    is_public: true,
  };

  const defaultProps = {
    component: mockComponent,
    idx: 0,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  it('renders basic component information correctly', () => {
    render(<ComponentCard {...defaultProps} />);

    expect(screen.getByText('Test Component')).toBeInTheDocument();
    expect(screen.getByText('Buttons')).toBeInTheDocument();
    expect(screen.getByText('A test description for the component.')).toBeInTheDocument();
    expect(screen.getByText('ID.test')).toBeInTheDocument();
  });

  it('renders default description when none is provided', () => {
    const componentWithoutDescription = { ...mockComponent, description: '' };
    render(<ComponentCard {...defaultProps} component={componentWithoutDescription} />);

    expect(screen.getByText(/Architectural unit synthesized/i)).toBeInTheDocument();
  });

  it('renders thumbnail image when thumbnail_url is provided', () => {
    render(<ComponentCard {...defaultProps} />);
    const img = screen.getByAltText('Test Component');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/image.png');
  });

  it('renders placeholder when thumbnail_url is missing', () => {
    const componentWithoutThumbnail = { ...mockComponent, thumbnail_url: null } as any;
    render(<ComponentCard {...defaultProps} component={componentWithoutThumbnail} />);

    expect(screen.getByText('INITIALIZING_STAGE')).toBeInTheDocument();
    expect(screen.getByText('NO_PREVIEW_DATA_DETECTED')).toBeInTheDocument();
  });

  it('copies code to clipboard when "Fuse Code" button is clicked', async () => {
    render(<ComponentCard {...defaultProps} />);

    const copyButton = screen.getByLabelText('Copy component code');
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockComponent.code);
    expect(screen.getByText('Fused')).toBeInTheDocument();
  });

  it('renders delete button and calls onDelete when in dashboard mode', () => {
    const onDeleteMock = vi.fn();
    render(<ComponentCard {...defaultProps} isDashboard={true} onDelete={onDeleteMock} />);

    const deleteButton = screen.getByLabelText('Delete component');
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(onDeleteMock).toHaveBeenCalledWith(mockComponent.id);
  });

  it('does not render delete button when not in dashboard mode', () => {
    render(<ComponentCard {...defaultProps} isDashboard={false} />);
    expect(screen.queryByLabelText('Delete component')).not.toBeInTheDocument();
  });

  it('shows live preview on mouse enter', async () => {
     render(<ComponentCard {...defaultProps} />);

     const article = screen.getByRole('listitem');
     fireEvent.mouseEnter(article);

     expect(await screen.findByTestId('live-preview')).toBeInTheDocument();
  });
});
