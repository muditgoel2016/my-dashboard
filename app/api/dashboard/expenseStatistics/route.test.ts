import { NextRequest } from 'next/server'
import { GET } from './route'
import * as dashboardHandlerService from '@/services/endpointHandlerServices/dashboard/dashboardHandlerService'

jest.mock('@/services/endpointHandlerServices/dashboard/dashboardHandlerService')

describe('Expense Statistics API Route', () => {
  const mockRequest = new NextRequest(new Request('http://localhost:3000/api/dashboard/expenseStatistics'))
  
  const mockExpenseData = [
    {
      name: 'Shopping',
      value: 450,
      color: '#FF6B6B'
    },
    {
      name: 'Transportation',
      value: 300,
      color: '#4ECDC4'
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return expense statistics with correct status and headers on successful request', async () => {
    jest.spyOn(dashboardHandlerService, 'getExpenseStatisticsData').mockReturnValue(mockExpenseData)

    const response = await GET(mockRequest)
    const data = await response.json()

    expect(data).toEqual(mockExpenseData)
    expect(response.status).toBe(200)

    const headers = response.headers
    expect(headers.get('Cache-Control')).toBe('public, s-maxage=60, stale-while-revalidate=30')
  })

  it('should return 500 status with error message when service throws error', async () => {
    jest.spyOn(dashboardHandlerService, 'getExpenseStatisticsData').mockImplementation(() => {
      throw new Error('Service error')
    })

    const response = await GET(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({ error: 'Failed to fetch expense statistics' })
  })

  it('should call getExpenseStatisticsData once per request', async () => {
    const getExpenseStatisticsSpy = jest.spyOn(dashboardHandlerService, 'getExpenseStatisticsData')
    getExpenseStatisticsSpy.mockReturnValue(mockExpenseData)

    await GET(mockRequest)

    expect(getExpenseStatisticsSpy).toHaveBeenCalledTimes(1)
  })
})