import { getComponents } from "../actions";
import { ComponentsRepository } from "@/lib/repositories/componentsRepository";
import { ELITE_MOCK_COMPONENTS } from "../mockData";

// Mock the dependencies
jest.mock("@/utils/supabase/server", () => ({
  createClient: jest.fn().mockResolvedValue({}),
}));

jest.mock("@/lib/repositories/componentsRepository");

describe("Registry Actions - getComponents", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console.error/warn during tests to keep output clean
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it("should return ELITE_MOCK_COMPONENTS when ComponentsRepository.getPublicComponents throws an error", async () => {
    // Arrange
    const mockError = new Error("Database connection failed");
    // We need to mock the implementation of the class
    (ComponentsRepository as jest.Mock).mockImplementation(() => {
      return {
        getPublicComponents: jest.fn().mockRejectedValue(mockError),
      };
    });

    // Act
    const result = await getComponents("any-category");

    // Assert
    expect(console.error).toHaveBeenCalledWith(
      "SYSTEM: [Database_Error] Fetching components failed:",
      mockError
    );
    expect(result).toEqual(ELITE_MOCK_COMPONENTS);
  });

  it("should return ELITE_MOCK_COMPONENTS when database is empty", async () => {
    // Arrange
    (ComponentsRepository as jest.Mock).mockImplementation(() => {
      return {
        getPublicComponents: jest.fn().mockResolvedValue([]),
      };
    });

    // Act
    const result = await getComponents();

    // Assert
    expect(console.warn).toHaveBeenCalledWith(
      "SYSTEM: [Database_Empty] Serving architectural fallback set."
    );
    expect(result).toEqual(ELITE_MOCK_COMPONENTS);
  });

  it("should return data when database returns items", async () => {
    // Arrange
    const mockData = [{ id: "1", name: "Test Component" }];
    (ComponentsRepository as jest.Mock).mockImplementation(() => {
      return {
        getPublicComponents: jest.fn().mockResolvedValue(mockData),
      };
    });

    // Act
    const result = await getComponents();

    // Assert
    expect(result).toEqual(mockData);
  });
});
