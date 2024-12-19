import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getQuickTransferUsersData } from '@/services/endpointHandlerServices/dashboard/dashboardHandlerService';

interface QuickTransferUser {
 name: string;
 title: string;
 initial: string;
 avatarUrl?: string;
}

/**
 * API route handler for fetching quick transfer users data
 * @param request - Incoming HTTP request
 * @returns NextResponse containing the quick transfer users data
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
 try {
   const quickTransferUserData: QuickTransferUser[] = getQuickTransferUsersData();
   
   return NextResponse.json(quickTransferUserData, {
     status: 200,
     headers: {
       'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
     }
   });
 } catch (error) {
   console.error('Error fetching quick transfer users:', error);
   return NextResponse.json(
     { error: 'Failed to fetch quick transfer users data' },
     { status: 500 }
   );
 }
}