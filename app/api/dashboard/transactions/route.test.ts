import { NextRequest } from 'next/server'

import * as dashboardHandlerService from '@/services/endpointHandlerServices/dashboard/dashboardHandlerService'

import { GET } from './route'

jest.mock('@/services/endpointHandlerServices/dashboard/dashboardHandlerService')

interface TransactionIcon {
  bg: string;
  color: string;
 }
 
 interface Transaction {
  id: number;
  title: string;
  date: string;
  amount: string;
  type: 'credit' | 'debit';
  icon: TransactionIcon;
  depositMode?: 'instant',
 }
 

describe('Transactions API Route', () => {
  const mockRequest = new NextRequest(new Request('http://localhost:3000/api/dashboard/transactions'))
  
  // Define mock data with explicit Transaction type
  const mockTransactionsData: Transaction[] = [
    {
      id: 1,
      title: 'Online Purchase - Amazon',
      date: '2024-03-20',
      amount: '$249.99',
      type: 'debit',
      depositMode: 'instant',
      icon: {
        bg: '#FFE2E5',
        color: '#FF4D4F'
      }
    },
    {
      id: 2,
      title: 'Salary Deposit',
      date: '2024-03-15',
      amount: '$5,000.00',
      type: 'credit',
      depositMode: 'standard',
      icon: {
        bg: '#E3FCEF',
        color: '#00B37E'
      }
    }
  ] as const

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return transactions data with correct status and headers on successful request', async () => {
    jest.spyOn(dashboardHandlerService, 'getTransactionsData')
       .mockReturnValue(mockTransactionsData)

    const response = await GET(mockRequest)
    const data = await response.json()

    expect(data).toEqual(mockTransactionsData)
    expect(response.status).toBe(200)
    expect(response.headers.get('Cache-Control')).toBe('public, s-maxage=60, stale-while-revalidate=30')
  })

  it('should return 500 status with error message when service throws error', async () => {
    jest.spyOn(dashboardHandlerService, 'getTransactionsData')
       .mockImplementation(() => {
         throw new Error('Service error')
       })

    const response = await GET(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({ error: 'Failed to fetch transactions data' })
  })

  it('should call getTransactionsData once per request', async () => {
    const getTransactionsSpy = jest.spyOn(dashboardHandlerService, 'getTransactionsData')
    getTransactionsSpy.mockReturnValue(mockTransactionsData)

    await GET(mockRequest)

    expect(getTransactionsSpy).toHaveBeenCalledTimes(1)
  })

  it('should handle different transaction types correctly', async () => {
    jest.spyOn(dashboardHandlerService, 'getTransactionsData')
       .mockReturnValue(mockTransactionsData)

    const response = await GET(mockRequest)
    const data = await response.json()

    const debitTransaction = data.find(t => t.type === 'debit')
    const creditTransaction = data.find(t => t.type === 'credit')

    expect(debitTransaction).toBeDefined()
    expect(creditTransaction).toBeDefined()
    expect(debitTransaction?.depositMode).toBe('instant')
    expect(creditTransaction?.depositMode).toBe('standard')
  })
})