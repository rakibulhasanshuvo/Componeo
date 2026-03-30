import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createComponent } from './actions';
import { createClient } from '@/utils/supabase/server';
import { ComponentsRepository } from '@/lib/repositories/componentsRepository';
import { revalidatePath } from 'next/cache';

// Mock dependencies
vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(),
}));

vi.mock('@/lib/repositories/componentsRepository', () => {
  return {
    ComponentsRepository: vi.fn(),
  };
});

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('createComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns a critical failure error when repository.createComponent throws', async () => {
    // Setup valid auth
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: { id: 'test-user-id' } },
          error: null,
        }),
      },
      storage: {
        from: vi.fn(),
      },
    };
    (createClient as any).mockResolvedValue(mockSupabase);

    // Setup repository to throw
    const mockCreateComponent = vi.fn().mockRejectedValue(new Error('Database explosion'));
    (ComponentsRepository as any).mockImplementation(function() {
      return { createComponent: mockCreateComponent };
    });

    // Suppress console.error for clean test output
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const validData = {
      title: 'Valid Component',
      category: 'Test Category',
      code: 'console.log("test");',
      is_public: true,
    };

    const result = await createComponent(validData);

    expect(result).toEqual({ error: 'Registry injection encountered a critical failure.' });
    expect(mockCreateComponent).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      'SYSTEM: [Database_Error] Component synthesis failed:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
