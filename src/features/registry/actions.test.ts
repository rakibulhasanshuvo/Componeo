import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getComponentById } from './actions';
import { ComponentsRepository } from '@/lib/repositories/componentsRepository';
import { ELITE_MOCK_COMPONENTS } from './mockData';

// Mock the server client creation
vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({}),
}));

vi.mock('@/utils/supabase/client', () => ({
  createClient: vi.fn().mockReturnValue({}),
}));

// Mock the ComponentsRepository
vi.mock('@/lib/repositories/componentsRepository', () => {
  return {
    ComponentsRepository: vi.fn().mockImplementation(() => {
      return {
        getComponentById: vi.fn(),
      };
    }),
  };
});

describe('getComponentById', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should return mock data when ComponentsRepository.getComponentById throws an error', async () => {
    // Arrange
    const testId = ELITE_MOCK_COMPONENTS[0].id;
    const errorMessage = 'Database connection failed';

    // Get the mocked repository instance constructor and setup the throw
    const MockRepository = vi.mocked(ComponentsRepository);
    MockRepository.mockImplementationOnce(function() {
      return {
        getComponentById: vi.fn().mockRejectedValue(new Error(errorMessage)),
      } as any;
    });

    // Act
    const result = await getComponentById(testId);

    // Assert
    expect(result).toEqual(ELITE_MOCK_COMPONENTS[0]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `SYSTEM: [Database_Error] Fetching component ${testId} failed:`,
      expect.any(Error)
    );
  });

  it('should return null when ComponentsRepository.getComponentById throws an error and mock data does not exist', async () => {
    // Arrange
    const testId = 'non-existent-id';
    const errorMessage = 'Database connection failed';

    // Get the mocked repository instance constructor and setup the throw
    const MockRepository = vi.mocked(ComponentsRepository);
    MockRepository.mockImplementationOnce(function() {
      return {
        getComponentById: vi.fn().mockRejectedValue(new Error(errorMessage)),
      } as any;
    });

    // Act
    const result = await getComponentById(testId);

    // Assert
    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `SYSTEM: [Database_Error] Fetching component ${testId} failed:`,
      expect.any(Error)
    );
  });
});
