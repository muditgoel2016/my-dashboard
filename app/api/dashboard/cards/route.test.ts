import { NextRequest } from 'next/server'

import * as dashboardHandlerService from '@/services/endpointHandlerServices/dashboard/dashboardHandlerService'

import { GET } from './route'

// Mock the dashboardHandlerService
jest.mock('@/services/endpointHandlerServices/dashboard/dashboardHandlerService')

describe('Cards API Route', () => {
  const mockRequest = new NextRequest(new Request('http://localhost:3000/api/dashboard/cards'))
  
  const mockCardsData = [
    {
      id: 1,
      balance: '$5,000',
      holder: 'John Doe',
      validThru: '12/25',
      cardNumber: '4532 **** **** 1234',
      theme: {
        bgColor: '#000000',
        textPrimaryColor: '#FFFFFF'
      }
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return cards data with correct status and headers on successful request', async () => {
    // Mock the getCardsData implementation
    jest.spyOn(dashboardHandlerService, 'getCardsData').mockReturnValue(mockCardsData)

    const response = await GET(mockRequest)
    const data = await response.json()

    // Verify response data
    expect(data).toEqual(mockCardsData)
    expect(response.status).toBe(200)

    // Verify cache headers
    const headers = response.headers
    expect(headers.get('Cache-Control')).toBe('public, s-maxage=60, stale-while-revalidate=30')
  })

  it('should return 500 status with error message when service throws error', async () => {
    // Mock service to throw error
    jest.spyOn(dashboardHandlerService, 'getCardsData').mockImplementation(() => {
      throw new Error('Service error')
    })

    const response = await GET(mockRequest)
    const data = await response.json()

    // Verify error response
    expect(response.status).toBe(500)
    expect(data).toEqual({ error: 'Failed to fetch cards data' })
  })

  it('should call getCardsData once per request', async () => {
    const getCardsDataSpy = jest.spyOn(dashboardHandlerService, 'getCardsData')
    getCardsDataSpy.mockReturnValue(mockCardsData)

    await GET(mockRequest)

    expect(getCardsDataSpy).toHaveBeenCalledTimes(1)
  })
})