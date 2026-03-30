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
  ComponentsRepository: vi.fn(),
}));
vi.mock('@/lib/repositories/componentsRepository', () => {
  return {
    ComponentsRepository: vi.fn(),
  };
});

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('createComponent Action', () => {
  const mockGetUser = vi.fn();
  const mockUpload = vi.fn();
  const mockGetPublicUrl = vi.fn();
  const mockCreateComponent = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (createClient as any).mockResolvedValue({
      auth: {
        getUser: mockGetUser,
      },
      storage: {
        from: vi.fn(() => ({
          upload: mockUpload,
          getPublicUrl: mockGetPublicUrl,
        })),
      },
    });

    (ComponentsRepository as any).mockImplementation(function() {
      return {
        createComponent: mockCreateComponent,
      };
    });
  });

  const validData = {
    title: 'Valid Component',
    description: 'A great component',
    category: 'Buttons',
    code: 'export default function Button() { return <button>Click</button> }',
    is_public: true,
  };

  it('should return error if validation fails', async () => {
    const invalidData = {
      title: 'A', // too short
      category: '', // missing
      code: 'code', // too short
    };

    const result = await createComponent(invalidData as any);

    expect(result.error).toBe('Technical validation failed');
    expect(result.details).toBeDefined();
    expect(mockCreateComponent).not.toHaveBeenCalled();
  });

  it('should return error if auth fails', async () => {
    mockGetUser.mockResolvedValueOnce({ error: new Error('Auth failed'), data: { user: null } });

    const result = await createComponent(validData);

    expect(result.error).toBe('Identity verification required for registry access.');
    expect(mockCreateComponent).not.toHaveBeenCalled();
  });

  it('should successfully create a component without thumbnail', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'user-123' } }, error: null });
    mockCreateComponent.mockResolvedValueOnce({});

    const result = await createComponent(validData);

    expect(mockCreateComponent).toHaveBeenCalledWith({
      title: validData.title,
      description: validData.description,
      category: validData.category,
      code: validData.code,
      is_public: validData.is_public,
      thumbnail_url: null,
      author_id: 'user-123',
    });
    expect(revalidatePath).toHaveBeenCalledWith('/');
    expect(revalidatePath).toHaveBeenCalledWith('/dashboard');
    expect(result.success).toBe(true);
  });

  it('should successfully create a component with thumbnail', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'user-123' } }, error: null });

    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    const dataWithThumbnail = { ...validData, thumbnail: mockFile };

    mockUpload.mockResolvedValueOnce({ data: { path: 'path/to/file' }, error: null });
    mockGetPublicUrl.mockReturnValueOnce({ data: { publicUrl: 'http://example.com/test.png' } });
    mockCreateComponent.mockResolvedValueOnce({});

    const result = await createComponent(dataWithThumbnail);

    expect(mockUpload).toHaveBeenCalled();
    expect(mockGetPublicUrl).toHaveBeenCalled();
    expect(mockCreateComponent).toHaveBeenCalledWith({
      title: validData.title,
      description: validData.description,
      category: validData.category,
      code: validData.code,
      is_public: validData.is_public,
      thumbnail_url: 'http://example.com/test.png',
      author_id: 'user-123',
    });
    expect(result.success).toBe(true);
  });

  it('should handle thumbnail upload error gracefully and create component', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'user-123' } }, error: null });

    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    const dataWithThumbnail = { ...validData, thumbnail: mockFile };

    // Simulate upload error
    mockUpload.mockResolvedValueOnce({ data: null, error: new Error('Upload failed') });
    mockCreateComponent.mockResolvedValueOnce({});

    // Suppress console.error during test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await createComponent(dataWithThumbnail);

    expect(mockUpload).toHaveBeenCalled();
    expect(mockGetPublicUrl).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith("STORAGE_ERROR: [Thumbnail_Upload]", expect.any(Error));
    expect(mockCreateComponent).toHaveBeenCalledWith(expect.objectContaining({
      thumbnail_url: null,
    }));
    expect(result.success).toBe(true);

    consoleSpy.mockRestore();
  });

  it('should return error if database injection fails', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'user-123' } }, error: null });
    mockCreateComponent.mockRejectedValueOnce(new Error('Database error'));

    // Suppress console.error during test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await createComponent(validData);

    expect(mockCreateComponent).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      "SYSTEM: [Database_Error] Component synthesis failed:",
      expect.any(Error)
    );
    expect(result.error).toBe('Registry injection encountered a critical failure.');
    expect(result.success).toBeUndefined();
    expect(revalidatePath).not.toHaveBeenCalled();
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
