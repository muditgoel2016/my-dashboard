import { dashboardDataService, DashboardAPIError } from './dashboardDataService'

describe('Dashboard Data Service', () => {
  const originalFetch = global.fetch
  const mockBaseUrl = 'http://localhost:3000'

  beforeAll(() => {
    process.env.NEXT_PUBLIC_BASE_URL = mockBaseUrl
  })

  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    global.fetch = originalFetch
    delete process.env.NEXT_PUBLIC_BASE_URL
  })

  describe('Successful Data Fetching', () => {
    it('fetches balance history data correctly', async () => {
      const mockData = [{ month: 'January', value: 1000 }]
      mockSuccessfulResponse(mockData)

      const result = await dashboardDataService.getBalanceHistoryData()
      expect(result).toEqual(mockData)
      validateFetchCall('balanceHistory', false)
    })

    it('fetches cards data with proper typing', async () => {
      const mockData = [{
        id: 1,
        balance: '5000',
        holder: 'John Doe',
        validThru: '12/25',
        cardNumber: '4111111111111111',
        theme: {
          bgColor: '#ffffff',
          textPrimaryColor: '#000000'
        }
      }]
      mockSuccessfulResponse(mockData)

      const result = await dashboardDataService.getCardsData()
      expect(result).toEqual(mockData)
      validateFetchCall('cards', false)
    })

    it('fetches expense statistics with correct structure', async () => {
      const mockData = [{
        name: 'Shopping',
        value: 500,
        color: '#ff0000'
      }]
      mockSuccessfulResponse(mockData)

      const result = await dashboardDataService.getExpenseStatisticsData()
      expect(result).toEqual(mockData)
      validateFetchCall('expenseStatistics', false)
    })

    it('handles server-side calls correctly', async () => {
      const mockData = [{ name: 'Test User', title: 'Developer', initial: 'T' }]
      mockSuccessfulResponse(mockData)

      await dashboardDataService.getQuickTransferUsersData(true)
      validateFetchCall('quickTransferUsers', true)
    })
  })

  describe('Error Handling', () => {
    it('handles HTTP errors appropriately', async () => {
      mockFailedResponse(404, 'Not Found')

      await expect(dashboardDataService.getTransactionsData())
        .rejects
        .toThrow(DashboardAPIError)
    })

    it('transforms network errors into DashboardAPIError', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'))

      await expect(dashboardDataService.getWeeklyActivityData())
        .rejects
        .toThrow(DashboardAPIError)
    })

    it('includes correct error details in DashboardAPIError', async () => {
      mockFailedResponse(500, 'Server Error')

      try {
        await dashboardDataService.getCardsData()
      } catch (error) {
        expect(error).toBeInstanceOf(DashboardAPIError)
        expect(error.status).toBe(500)
        expect(error.endpoint).toBe('cards')
      }
    })
  })

  describe('URL Construction', () => {
    it('uses correct base URL for client-side calls', async () => {
      mockSuccessfulResponse([])
      await dashboardDataService.getBalanceHistoryData(false)
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/dashboard/balanceHistory',
        expect.any(Object)
      )
    })

    it('uses environment URL for server-side calls', async () => {
      mockSuccessfulResponse([])
      await dashboardDataService.getBalanceHistoryData(true)
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockBaseUrl}/api/dashboard/balanceHistory`,
        expect.any(Object)
      )
    })
  })
})

// Helper functions
function mockSuccessfulResponse(data: any) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(data)
  })
}

function mockFailedResponse(status: number, statusText: string) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status,
    statusText
  })
}

function validateFetchCall(endpoint: string, isServerSide: boolean) {
  const expectedUrl = isServerSide
    ? `${mockBaseUrl}/api/dashboard/${endpoint}`
    : `/api/dashboard/${endpoint}`

  expect(global.fetch).toHaveBeenCalledWith(
    expectedUrl,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}