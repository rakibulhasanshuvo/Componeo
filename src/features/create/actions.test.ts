import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createComponent } from './actions';
import { createClient } from '@/utils/supabase/server';
import { ComponentsRepository } from '@/lib/repositories/componentsRepository';
import { revalidatePath } from 'next/cache';

// Mock dependencies
vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(),
}));

vi.mock('@/lib/repositories/componentsRepository', () => ({
  ComponentsRepository: vi.fn(function() { return {} }),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('createComponent', () => {
  let mockSupabase: any;
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: { id: 'test-user-id' } },
          error: null,
        }),
      },
      storage: {
        from: vi.fn().mockReturnThis(),
        upload: vi.fn().mockResolvedValue({ error: null }),
        getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl: 'http://test.com/img.jpg' } }),
      },
    };

    mockRepository = {
      createComponent: vi.fn().mockResolvedValue({ id: 'new-component-id' }),
    };

    (createClient as any).mockResolvedValue(mockSupabase);
    (ComponentsRepository as any).mockImplementation(function() { return mockRepository; });
  });

  const validData = {
    title: 'Test Component',
    description: 'A test component',
    category: 'UI',
    code: 'export default function Test() { return <div>Test</div> }',
    is_public: true,
  };

  it('should successfully create a component', async () => {
    const result = await createComponent(validData);

    expect(result).toEqual({ success: true });
    expect(mockRepository.createComponent).toHaveBeenCalledWith({
      ...validData,
      thumbnail_url: null,
      author_id: 'test-user-id',
    });
    expect(revalidatePath).toHaveBeenCalledWith('/');
    expect(revalidatePath).toHaveBeenCalledWith('/dashboard');
  });

  it('should handle validation errors', async () => {
    const result = await createComponent({
      ...validData,
      title: 'T', // Too short
    });

    expect(result.error).toBe('Technical validation failed');
    expect(result.details).toHaveProperty('title');
    expect(mockRepository.createComponent).not.toHaveBeenCalled();
  });

  it('should handle authentication errors', async () => {
    mockSupabase.auth.getUser.mockResolvedValueOnce({
      data: { user: null },
      error: new Error('Auth error'),
    });

    const result = await createComponent(validData);

    expect(result).toEqual({ error: 'Identity verification required for registry access.' });
    expect(mockRepository.createComponent).not.toHaveBeenCalled();
  });

  it('should handle repository injection failure (Error Path)', async () => {
    mockRepository.createComponent.mockRejectedValueOnce(new Error('Database error'));

    // Suppress console.error for this specific test so it doesn't pollute the test output
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await createComponent(validData);

    expect(result).toEqual({ error: 'Registry injection encountered a critical failure.' });
    expect(mockRepository.createComponent).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      'SYSTEM: [Database_Error] Component synthesis failed:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
