import { renderHook } from '@testing-library/react'

import { dashboardDataService } from '@/services/dataServices/dashboard/dashboardDataService'

import { useDashboardData } from './useDashboardData'

jest.mock('@/services/dataServices/dashboard/dashboardDataService')

describe('useDashboardData Hook', () => {
  const mockDashboardData = {
    cardsData: [{ id: 1, balance: 5000 }],
    transactionsData: [{ id: 1, amount: 100 }],
    weeklyData: [{ day: 'Monday', value: 500 }],
    expenseData: [{ category: 'Food', amount: 200 }],
    quickTransferUserData: [{ id: 1, name: 'John' }],
    balanceHistoryData: [{ month: 'January', balance: 1000 }]
  }

  const defaultSSRConfig = {
    CARDS_SSR_ENABLED: false,
    TRANSACTIONS_SSR_ENABLED: false,
    WEEKLY_SSR_ENABLED: false,
    EXPENSE_SSR_ENABLED: false,
    QUICK_TRANSFER_SSR_ENABLED: false,
    BALANCE_HISTORY_SSR_ENABLED: false
  }

  beforeEach(() => {
    jest.clearAllMocks()
    Object.values(dashboardDataService).forEach(method => {
      if (typeof method === 'function') {
        jest.spyOn(dashboardDataService, method.name as keyof typeof dashboardDataService)
          .mockResolvedValue([])
      }
    })
  })

  it('initializes with provided initial data when SSR is enabled', () => {
    const ssrConfig = { ...defaultSSRConfig, CARDS_SSR_ENABLED: true }
    
    const { result } = renderHook(() => useDashboardData({
      initialData: mockDashboardData,
      ssrConfig
    }))

    expect(result.current.dashboardData).toEqual(mockDashboardData)
    expect(result.current.loadingState.cards).toBe(false)
    expect(result.current.errors.cards).toBeNull()
    expect(dashboardDataService.getCardsData).not.toHaveBeenCalled()
  })

  it('fetches data for sections where SSR is disabled', async () => {
    jest.spyOn(dashboardDataService, 'getCardsData').mockResolvedValue(mockDashboardData.cardsData)
    jest.spyOn(dashboardDataService, 'getTransactionsData').mockResolvedValue(mockDashboardData.transactionsData)

    const { result } = renderHook(() => useDashboardData({
      initialData: {},
      ssrConfig: defaultSSRConfig
    }))

    expect(result.current.loadingState.cards).toBe(true)
    expect(result.current.loadingState.transactions).toBe(true)

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(result.current.dashboardData.cardsData).toEqual(mockDashboardData.cardsData)
    expect(result.current.dashboardData.transactionsData).toEqual(mockDashboardData.transactionsData)
    expect(result.current.loadingState.cards).toBe(false)
    expect(result.current.loadingState.transactions).toBe(false)
  })

  it('handles errors during data fetching', async () => {
    const mockError = new Error('Failed to fetch cards')
    jest.spyOn(dashboardDataService, 'getCardsData').mockRejectedValue(mockError)

    const { result } = renderHook(() => useDashboardData({
      initialData: {},
      ssrConfig: defaultSSRConfig
    }))

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(result.current.errors.cards).toEqual(mockError)
    expect(result.current.loadingState.cards).toBe(false)
    expect(result.current.dashboardData.cardsData).toBeUndefined()
  })

  it('correctly implements isDataReady helper function', () => {
    const { result } = renderHook(() => useDashboardData({
      initialData: { cardsData: mockDashboardData.cardsData },
      ssrConfig: { ...defaultSSRConfig, CARDS_SSR_ENABLED: true }
    }))

    expect(result.current.isDataReady('cardsData')).toBe(true)
    expect(result.current.isDataReady('transactionsData')).toBe(false)
  })

  it('transforms non-Error exceptions into Error objects', async () => {
    jest.spyOn(dashboardDataService, 'getCardsData').mockRejectedValue('Network failure')

    const { result } = renderHook(() => useDashboardData({
      initialData: {},
      ssrConfig: defaultSSRConfig
    }))

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(result.current.errors.cards).toBeInstanceOf(Error)
    expect(result.current.errors.cards.message).toBe('Failed to fetch cards data')
  })

  it('maintains independent loading and error states for each data type', async () => {
    jest.spyOn(dashboardDataService, 'getCardsData').mockRejectedValue(new Error('Cards error'))
    jest.spyOn(dashboardDataService, 'getTransactionsData').mockResolvedValue(mockDashboardData.transactionsData)

    const { result } = renderHook(() => useDashboardData({
      initialData: {},
      ssrConfig: defaultSSRConfig
    }))

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(result.current.errors.cards).toBeDefined()
    expect(result.current.errors.transactions).toBeNull()
    expect(result.current.loadingState.cards).toBe(false)
    expect(result.current.loadingState.transactions).toBe(false)
    expect(result.current.dashboardData.transactionsData).toEqual(mockDashboardData.transactionsData)
  })
})