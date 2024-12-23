import { NextRequest } from 'next/server'
import { GET } from './route'
import * as dashboardHandlerService from '@/services/endpointHandlerServices/dashboard/dashboardHandlerService'

jest.mock('@/services/endpointHandlerServices/dashboard/dashboardHandlerService')

describe('Quick Transfer Users API Route', () => {
  const mockRequest = new NextRequest(new Request('http://localhost:3000/api/dashboard/quickTransferUsers'))
  
  const mockQuickTransferUsers = [
    {
      name: 'Sarah Johnson',
      title: 'Product Manager',
      initial: 'SJ',
      avatarUrl: '/uploads/sarah-avatar.png'
    },
    {
      name: 'Michael Chen',
      title: 'Software Engineer',
      initial: 'MC'
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return quick transfer users data with correct status and headers on successful request', async () => {
    jest.spyOn(dashboardHandlerService, 'getQuickTransferUsersData').mockReturnValue(mockQuickTransferUsers)

    const response = await GET(mockRequest)
    const data = await response.json()

    expect(data).toEqual(mockQuickTransferUsers)
    expect(response.status).toBe(200)

    const headers = response.headers
    expect(headers.get('Cache-Control')).toBe('public, s-maxage=60, stale-while-revalidate=30')
  })

  it('should return 500 status with error message when service throws error', async () => {
    jest.spyOn(dashboardHandlerService, 'getQuickTransferUsersData').mockImplementation(() => {
      throw new Error('Service error')
    })

    const response = await GET(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({ error: 'Failed to fetch quick transfer users data' })
  })

  it('should call getQuickTransferUsersData once per request', async () => {
    const getQuickTransferUsersSpy = jest.spyOn(dashboardHandlerService, 'getQuickTransferUsersData')
    getQuickTransferUsersSpy.mockReturnValue(mockQuickTransferUsers)

    await GET(mockRequest)

    expect(getQuickTransferUsersSpy).toHaveBeenCalledTimes(1)
  })

  it('should handle users with and without avatar URLs correctly', async () => {
    jest.spyOn(dashboardHandlerService, 'getQuickTransferUsersData').mockReturnValue(mockQuickTransferUsers)

    const response = await GET(mockRequest)
    const data = await response.json()

    expect(data[0].avatarUrl).toBeDefined()
    expect(data[1].avatarUrl).toBeUndefined()
  })
})