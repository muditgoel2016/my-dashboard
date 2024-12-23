import { NextRequest } from 'next/server'

import * as dashboardHandlerService from '@/services/endpointHandlerServices/dashboard/dashboardHandlerService'

import { GET } from './route'

jest.mock('@/services/endpointHandlerServices/dashboard/dashboardHandlerService')

describe('Weekly Activity API Route', () => {
  const mockRequest = new NextRequest(new Request('http://localhost:3000/api/dashboard/weeklyActivity'))
  
  const mockWeeklyData: WeeklyActivity[] = [
    {
      name: 'Mon',
      deposit: 2400,
      withdraw: 1800
    },
    {
      name: 'Tue',
      deposit: 1600,
      withdraw: 1200
    },
    {
      name: 'Wed',
      deposit: 3200,
      withdraw: 2100
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return weekly activity data with correct status and headers on successful request', async () => {
    jest.spyOn(dashboardHandlerService, 'getWeeklyActivityData')
       .mockReturnValue(mockWeeklyData)

    const response = await GET(mockRequest)
    const data = await response.json()

    expect(data).toEqual(mockWeeklyData)
    expect(response.status).toBe(200)
    expect(response.headers.get('Cache-Control')).toBe('public, s-maxage=60, stale-while-revalidate=30')
  })

  it('should return 500 status with error message when service throws error', async () => {
    jest.spyOn(dashboardHandlerService, 'getWeeklyActivityData')
       .mockImplementation(() => {
         throw new Error('Service error')
       })

    const response = await GET(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({ error: 'Failed to fetch weekly activity data' })
  })

  it('should call getWeeklyActivityData once per request', async () => {
    const getWeeklyActivitySpy = jest.spyOn(dashboardHandlerService, 'getWeeklyActivityData')
    getWeeklyActivitySpy.mockReturnValue(mockWeeklyData)

    await GET(mockRequest)

    expect(getWeeklyActivitySpy).toHaveBeenCalledTimes(1)
  })

  it('should validate the structure of weekly activity data', async () => {
    jest.spyOn(dashboardHandlerService, 'getWeeklyActivityData')
       .mockReturnValue(mockWeeklyData)

    const response = await GET(mockRequest)
    const data = await response.json()

    expect(Array.isArray(data)).toBe(true)
    expect(data[0]).toHaveProperty('name')
    expect(data[0]).toHaveProperty('deposit')
    expect(data[0]).toHaveProperty('withdraw')
    expect(typeof data[0].deposit).toBe('number')
    expect(typeof data[0].withdraw).toBe('number')
  })
})