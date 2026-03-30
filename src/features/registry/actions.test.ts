import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getComponents, getComponentById } from './actions';
import { ELITE_MOCK_COMPONENTS } from './mockData';

// Mock the server client creation
vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({}),
}));

const mockGetPublicComponents = vi.fn();
const mockGetComponentById = vi.fn();

// Mock the ComponentsRepository
vi.mock('@/lib/repositories/componentsRepository', () => {
  return {
    ComponentsRepository: class {
      getPublicComponents = mockGetPublicComponents;
      getComponentById = mockGetComponentById;
    },
  };
});

describe('Registry Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Spy on console methods to keep test output clean and verify they are called
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('getComponents', () => {
    it('returns data when database call is successful', async () => {
      const mockData = [{ id: 'test-1', title: 'Test Component' }];
      mockGetPublicComponents.mockResolvedValue(mockData);

      const result = await getComponents();

      expect(mockGetPublicComponents).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockData);
    });

    it('should return components filtered by category', async () => {
      const mockComponents = [{ id: '1', name: 'Test Component', category: 'Buttons' }];
      mockGetPublicComponents.mockResolvedValue(mockComponents);

      const result = await getComponents('Buttons');

      expect(result).toEqual(mockComponents);
      expect(mockGetPublicComponents).toHaveBeenCalledWith('Buttons');
    });

    it('returns ELITE_MOCK_COMPONENTS and logs warning when database is empty', async () => {
      mockGetPublicComponents.mockResolvedValue([]);

      const result = await getComponents();

      expect(mockGetPublicComponents).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenCalledWith('SYSTEM: [Database_Empty] Serving architectural fallback set.');
      expect(result).toEqual(ELITE_MOCK_COMPONENTS);
    });

    it('returns ELITE_MOCK_COMPONENTS and logs error when repository throws an error', async () => {
      const error = new Error('Database connection failed');
      mockGetPublicComponents.mockRejectedValue(error);

      const result = await getComponents();

      expect(mockGetPublicComponents).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith('SYSTEM: [Database_Error] Fetching components failed:', error);
      expect(result).toEqual(ELITE_MOCK_COMPONENTS);
    });
  });

  describe('getComponentById', () => {
    it('returns component data when database call is successful', async () => {
      const mockData = { id: 'test-1', title: 'Test Component' };
      mockGetComponentById.mockResolvedValue(mockData);

      const result = await getComponentById('test-1');

      expect(mockGetComponentById).toHaveBeenCalledWith('test-1');
      expect(result).toEqual(mockData);
    });

    it('returns component from ELITE_MOCK_COMPONENTS when database returns null', async () => {
      mockGetComponentById.mockResolvedValue(null);
      const mockId = ELITE_MOCK_COMPONENTS[0].id;

      const result = await getComponentById(mockId);

      expect(mockGetComponentById).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(ELITE_MOCK_COMPONENTS[0]);
    });

    it('returns null when component is not in DB and not in ELITE_MOCK_COMPONENTS', async () => {
      mockGetComponentById.mockResolvedValue(null);

      const result = await getComponentById('non-existent-id');

      expect(mockGetComponentById).toHaveBeenCalledWith('non-existent-id');
      expect(result).toBeNull();
    });

    it('returns component from ELITE_MOCK_COMPONENTS and logs error when repository throws an error', async () => {
      const error = new Error('Database connection failed');
      mockGetComponentById.mockRejectedValue(error);
      const mockId = ELITE_MOCK_COMPONENTS[0].id;

      const result = await getComponentById(mockId);

      expect(mockGetComponentById).toHaveBeenCalledWith(mockId);
      expect(console.error).toHaveBeenCalledWith(`SYSTEM: [Database_Error] Fetching component ${mockId} failed:`, error);
      expect(result).toEqual(ELITE_MOCK_COMPONENTS[0]);
    });
  });
});
