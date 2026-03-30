import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getComponents, getComponentById } from './actions';
import { ELITE_MOCK_COMPONENTS } from './mockData';

const mockGetPublicComponents = vi.fn();
const mockGetComponentById = vi.fn();

// Mock dependencies
vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(),
}));

vi.mock('@/lib/repositories/componentsRepository', () => {
  return {
    ComponentsRepository: class {
      getPublicComponents(...args: any[]) { return mockGetPublicComponents(...args); }
      getComponentById(...args: any[]) { return mockGetComponentById(...args); }
    },
  };
});

describe('Registry Actions', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    // Silence console logs during tests to keep output clean
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('getComponents', () => {
    it('should return components from the repository', async () => {
      const mockComponents = [{ id: '1', name: 'Test Component' }];
      mockGetPublicComponents.mockResolvedValue(mockComponents);

      const result = await getComponents();

      expect(result).toEqual(mockComponents);
      expect(mockGetPublicComponents).toHaveBeenCalledWith(undefined);
    });

    it('should return components filtered by category', async () => {
      const mockComponents = [{ id: '1', name: 'Test Component', category: 'Buttons' }];
      mockGetPublicComponents.mockResolvedValue(mockComponents);

      const result = await getComponents('Buttons');

      expect(result).toEqual(mockComponents);
      expect(mockGetPublicComponents).toHaveBeenCalledWith('Buttons');
    });

    it('should return ELITE_MOCK_COMPONENTS when database returns empty array', async () => {
      mockGetPublicComponents.mockResolvedValue([]);

      const result = await getComponents();

      expect(result).toEqual(ELITE_MOCK_COMPONENTS);
      expect(console.warn).toHaveBeenCalledWith('SYSTEM: [Database_Empty] Serving architectural fallback set.');
    });

    it('should return ELITE_MOCK_COMPONENTS when repository throws an error', async () => {
      const testError = new Error('Database connection failed');
      mockGetPublicComponents.mockRejectedValue(testError);

      const result = await getComponents();

      expect(result).toEqual(ELITE_MOCK_COMPONENTS);
      expect(console.error).toHaveBeenCalledWith('SYSTEM: [Database_Error] Fetching components failed:', testError);
    });

    it('should return mock components fallback when fetching components fails', async () => {
      const error = new Error('Simulated ComponentsRepository error');
      mockGetPublicComponents.mockRejectedValue(error);

      const result = await getComponents('TestCategory');

      expect(result).toEqual(ELITE_MOCK_COMPONENTS);
      expect(console.error).toHaveBeenCalledWith('SYSTEM: [Database_Error] Fetching components failed:', error);
    });

    it('should return ELITE_MOCK_COMPONENTS when repository throws an error for a specific category', async () => {
      const testError = new Error('Database connection failed for category');
      mockGetPublicComponents.mockRejectedValue(testError);

      const result = await getComponents('Buttons');

      expect(result).toEqual(ELITE_MOCK_COMPONENTS);
      expect(console.error).toHaveBeenCalledWith('SYSTEM: [Database_Error] Fetching components failed:', testError);
    });
  });

  describe('getComponentById', () => {
    it('should return a component by ID from the repository', async () => {
      const mockComponent = { id: 'test-id', name: 'Test Component' };
      mockGetComponentById.mockResolvedValue(mockComponent);

      const result = await getComponentById('test-id');

      expect(result).toEqual(mockComponent);
      expect(mockGetComponentById).toHaveBeenCalledWith('test-id');
    });

    it('should fallback to ELITE_MOCK_COMPONENTS when component is not found', async () => {
      mockGetComponentById.mockResolvedValue(null);

      // Use the first ID from mock data for testing
      const testId = ELITE_MOCK_COMPONENTS[0].id;
      const result = await getComponentById(testId);

      expect(result).toEqual(ELITE_MOCK_COMPONENTS[0]);
    });

    it('should return null when component is not found and not in mock data', async () => {
      mockGetComponentById.mockResolvedValue(null);

      const result = await getComponentById('non-existent-id');

      expect(result).toBeNull();
    });

    it('should fallback to ELITE_MOCK_COMPONENTS when repository throws an error', async () => {
      const testError = new Error('Database connection failed');
      mockGetComponentById.mockRejectedValue(testError);

      // Use the first ID from mock data for testing
      const testId = ELITE_MOCK_COMPONENTS[0].id;
      const result = await getComponentById(testId);

      expect(result).toEqual(ELITE_MOCK_COMPONENTS[0]);
      expect(console.error).toHaveBeenCalledWith(`SYSTEM: [Database_Error] Fetching component ${testId} failed:`, testError);
    });

    it('should return null when repository throws an error and component is not in mock data', async () => {
      const testError = new Error('Database connection failed');
      mockGetComponentById.mockRejectedValue(testError);

      const testId = 'non-existent-id';
      const result = await getComponentById(testId);

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(`SYSTEM: [Database_Error] Fetching component ${testId} failed:`, testError);
    });
  });
});
