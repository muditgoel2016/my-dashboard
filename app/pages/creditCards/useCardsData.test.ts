import { renderHook } from '@testing-library/react'
import { useCardsData } from './useCardsData'
import { dashboardDataService } from '@/app/services/dataServices/dashboard/dashboardDataService'

jest.mock('@/app/services/dataServices/dashboard/dashboardDataService')

describe('useCardsData Hook', () => {
  const mockCardsData = [
    {
      balance: 5000,
      holder: 'John Doe',
      validThru: '12/25',
      cardNumber: '4532123456781234',
      theme: {
        bgColor: '#f8faff',
        textPrimaryColor: '#1a1f36'
      }
    },
    {
      balance: 3000,
      holder: 'Jane Smith',
      validThru: '06/24',
      cardNumber: '5412345678901234',
      theme: {
        bgColor: '#1a1f36',
        textPrimaryColor: '#ffffff'
      }
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('initializes with provided initial data when SSR is enabled', () => {
    const { result } = renderHook(() => useCardsData({
      initialData: mockCardsData,
      ssrConfig: { CARDS_SSR_ENABLED: true }
    }))

    expect(result.current.cardsData).toEqual(mockCardsData)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(dashboardDataService.getCardsData).not.toHaveBeenCalled()
  })

  it('fetches data when SSR is disabled and no initial data is provided', async () => {
    jest.spyOn(dashboardDataService, 'getCardsData').mockResolvedValue(mockCardsData)

    const { result } = renderHook(() => useCardsData({
      initialData: null,
      ssrConfig: { CARDS_SSR_ENABLED: false }
    }))

    expect(result.current.isLoading).toBe(true)
    expect(dashboardDataService.getCardsData).toHaveBeenCalledWith(false)

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(result.current.cardsData).toEqual(mockCardsData)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('handles errors during data fetching', async () => {
    const mockError = new Error('Failed to fetch cards')
    jest.spyOn(dashboardDataService, 'getCardsData').mockRejectedValue(mockError)

    const { result } = renderHook(() => useCardsData({
      initialData: null,
      ssrConfig: { CARDS_SSR_ENABLED: false }
    }))

    expect(result.current.isLoading).toBe(true)

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(result.current.error).toEqual(mockError)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.cardsData).toEqual([])
  })

  it('maintains initial data when SSR is enabled and avoids unnecessary fetching', () => {
    const { result } = renderHook(() => useCardsData({
      initialData: mockCardsData,
      ssrConfig: { CARDS_SSR_ENABLED: true }
    }))

    expect(result.current.cardsData).toEqual(mockCardsData)
    expect(dashboardDataService.getCardsData).not.toHaveBeenCalled()
  })

  it('transforms non-Error exceptions into Error objects', async () => {
    jest.spyOn(dashboardDataService, 'getCardsData').mockRejectedValue('Network failure')

    const { result } = renderHook(() => useCardsData({
      initialData: null,
      ssrConfig: { CARDS_SSR_ENABLED: false }
    }))

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error?.message).toBe('Failed to fetch cards data')
  })

  it('initializes with empty array when no initial data is provided', () => {
    const { result } = renderHook(() => useCardsData({
      initialData: null,
      ssrConfig: { CARDS_SSR_ENABLED: true }
    }))

    expect(result.current.cardsData).toEqual([])
    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBeNull()
  })
})