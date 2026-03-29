import { getComponentById } from "../actions";
import { createClient } from "@/utils/supabase/server";
import { ComponentsRepository } from "@/lib/repositories/componentsRepository";
import { ELITE_MOCK_COMPONENTS } from "../mockData";

jest.mock("@/utils/supabase/server", () => ({
  createClient: jest.fn(),
}));

jest.mock("@/lib/repositories/componentsRepository", () => {
  return {
    ComponentsRepository: jest.fn().mockImplementation(() => {
      return {
        getComponentById: jest.fn(),
      };
    }),
  };
});

describe("getComponentById", () => {
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  it("should return mock component on database error", async () => {
    // Arrange
    const testId = "mock-1"; // Using an actual ID from ELITE_MOCK_COMPONENTS
    const expectedMockComponent = ELITE_MOCK_COMPONENTS.find(m => m.id === testId);
    const error = new Error("Database connection failed");

    // Create a specific mock repository instance
    const mockRepoInstance = {
      getComponentById: jest.fn().mockRejectedValue(error)
    };

    (ComponentsRepository as jest.Mock).mockImplementation(() => mockRepoInstance);

    // Act
    const result = await getComponentById(testId);

    // Assert
    expect(createClient).toHaveBeenCalled();
    expect(mockRepoInstance.getComponentById).toHaveBeenCalledWith(testId);
    expect(consoleErrorMock).toHaveBeenCalledWith(
      `SYSTEM: [Database_Error] Fetching component ${testId} failed:`,
      error
    );
    expect(result).toEqual(expectedMockComponent);
  });

  it("should return null if mock component is not found on database error", async () => {
    // Arrange
    const testId = "non-existent-mock-id";
    const error = new Error("Database connection failed");

    // Create a specific mock repository instance
    const mockRepoInstance = {
      getComponentById: jest.fn().mockRejectedValue(error)
    };

    (ComponentsRepository as jest.Mock).mockImplementation(() => mockRepoInstance);

    // Act
    const result = await getComponentById(testId);

    // Assert
    expect(createClient).toHaveBeenCalled();
    expect(mockRepoInstance.getComponentById).toHaveBeenCalledWith(testId);
    expect(consoleErrorMock).toHaveBeenCalledWith(
      `SYSTEM: [Database_Error] Fetching component ${testId} failed:`,
      error
    );
    expect(result).toBeNull();
  });
});
