import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getTransactionsData } from '@/services/endpointHandlerServices/dashboard/dashboardHandlerService';

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
}

/**
 * API route handler for fetching transactions data
 * @param request - Incoming HTTP request
 * @returns NextResponse containing the transactions data
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
 try {
   const transactionsData: Transaction[] = getTransactionsData();
   
   return NextResponse.json(transactionsData, {
     status: 200,
     headers: {
       'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
     }
   });
 } catch (error) {
   console.error('Error fetching transactions:', error);
   return NextResponse.json(
     { error: 'Failed to fetch transactions data' },
     { status: 500 }
   );
 }
}