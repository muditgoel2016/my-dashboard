import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getWeeklyActivityData } from '@/services/endpointHandlerServices/dashboard/dashboardHandlerService';

interface WeeklyActivity {
 name: string;
 deposit: number;
 withdraw: number;
}

/**
 * API route handler for fetching weekly activity data
 * @param request - Incoming HTTP request 
 * @returns NextResponse containing the weekly activity data
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
 try {
   const weeklyData: WeeklyActivity[] = getWeeklyActivityData();
   
   return NextResponse.json(weeklyData, {
     status: 200,
     headers: {
       'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
     }
   });
 } catch (error) {
   console.error('Error fetching weekly activity:', error);
   return NextResponse.json(
     { error: 'Failed to fetch weekly activity data' },
     { status: 500 }
   );
 }
}