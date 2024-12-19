import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getExpenseStatisticsData } from '@/services/endpointHandlerServices/dashboard/dashboardHandlerService';

interface ExpenseStatistic {
 name: string;
 value: number;
 color: string;
}

/**
 * API route handler for fetching expense statistics data
 * @param request - Incoming HTTP request
 * @returns NextResponse containing the expense statistics
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
 try {
   const expenseData: ExpenseStatistic[] = getExpenseStatisticsData();
   
   return NextResponse.json(expenseData, {
     status: 200,
     headers: {
       'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
     }
   });
 } catch (error) {
   console.error('Error fetching expense statistics:', error);
   return NextResponse.json(
     { error: 'Failed to fetch expense statistics' },
     { status: 500 }
   );
 }
}