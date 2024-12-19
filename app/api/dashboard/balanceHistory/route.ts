import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getBalanceHistoryData } from '@/services/endpointHandlerServices/dashboard/dashboardHandlerService';

interface BalanceHistoryItem {
  month: string;
  value: number;
}

/**
 * API route handler for balance history data
 * @param request
 * @returns NextResponse containing the balance history data
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const balanceHistoryData: BalanceHistoryItem[] = getBalanceHistoryData();
    
    return NextResponse.json(balanceHistoryData, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    });
  } catch (error) {
    console.error('Error fetching balance history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch balance history data' },
      { status: 500 }
    );
  }
}