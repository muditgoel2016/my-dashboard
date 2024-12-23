import { GET } from './route'; // Import the API route handler
import { getBalanceHistoryData } from '@/services/endpointHandlerServices/dashboard/dashboardHandlerService';
import { NextRequest } from 'next/server';

// Mock the `getBalanceHistoryData` function
jest.mock('@/services/endpointHandlerServices/dashboard/dashboardHandlerService', () => ({
  getBalanceHistoryData: jest.fn(),
}));

describe('GET /api/dashboard/balanceHistory', () => {
  let mockRequest: Partial<NextRequest>;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    mockRequest = {};
  });

  it('should return balance history data with a 200 status code', async () => {
    const mockData = [
      { month: 'January', value: 100 },
      { month: 'February', value: 200 },
    ];
    (getBalanceHistoryData as jest.Mock).mockReturnValue(mockData);

    const response = await GET(mockRequest as NextRequest);

    expect(getBalanceHistoryData).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);

    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual(mockData);
    expect(response.headers.get('Cache-Control')).toBe(
      'public, s-maxage=60, stale-while-revalidate=30'
    );
  });

  it('should return a 500 status code when an error occurs', async () => {
    (getBalanceHistoryData as jest.Mock).mockImplementation(() => {
      throw new Error('Mock error');
    });

    const response = await GET(mockRequest as NextRequest);

    expect(getBalanceHistoryData).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(500);

    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual({ error: 'Failed to fetch balance history data' });
  });
});
