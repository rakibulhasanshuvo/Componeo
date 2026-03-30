import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getComponents } from './actions'
import { ELITE_MOCK_COMPONENTS } from './mockData'

// Mock the dependencies
vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn()
}))

vi.mock('@/lib/repositories/componentsRepository', () => {
  const ComponentsRepositoryMock = vi.fn()
  ComponentsRepositoryMock.prototype.getPublicComponents = vi.fn()
  ComponentsRepositoryMock.prototype.getComponentById = vi.fn()

  return {
    ComponentsRepository: ComponentsRepositoryMock
  }
})

describe('Registry Actions - getComponents', () => {
  let mockGetPublicComponents: any

  beforeEach(async () => {
    vi.clearAllMocks()

    // Suppress console.warn and console.error during tests
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})

    // Import inside so we can access the mocked class prototype
    const { ComponentsRepository } = await import('@/lib/repositories/componentsRepository')
    mockGetPublicComponents = ComponentsRepository.prototype.getPublicComponents
  })

  it('should return data when components exist', async () => {
    const mockData = [{ id: '1', title: 'Component 1' }, { id: '2', title: 'Component 2' }]
    mockGetPublicComponents.mockResolvedValue(mockData)

    const result = await getComponents()

    expect(result).toEqual(mockData)
    expect(mockGetPublicComponents).toHaveBeenCalledTimes(1)
  })

  it('should return ELITE_MOCK_COMPONENTS and warn when database is empty', async () => {
    mockGetPublicComponents.mockResolvedValue([])

    const result = await getComponents()

    expect(result).toEqual(ELITE_MOCK_COMPONENTS)
    expect(console.warn).toHaveBeenCalledWith('SYSTEM: [Database_Empty] Serving architectural fallback set.')
  })

  it('should return ELITE_MOCK_COMPONENTS and log error when fetching components fails', async () => {
    const mockError = new Error('Database connection failed')
    mockGetPublicComponents.mockRejectedValue(mockError)

    const result = await getComponents()

    expect(result).toEqual(ELITE_MOCK_COMPONENTS)
    expect(console.error).toHaveBeenCalledWith('SYSTEM: [Database_Error] Fetching components failed:', mockError)
  })
})
