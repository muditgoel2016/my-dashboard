import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getCardsData } from '@/services/endpointHandlerServices/dashboard/dashboardHandlerService';

interface CardTheme {
 bgColor: string;
 textPrimaryColor: string; 
}

interface Card {
 id: number;
 balance: string;
 holder: string;
 validThru: string;
 cardNumber: string;
 theme: CardTheme;
}

/**
 * API route handler for fetching credit cards data
 * @param request - Incoming HTTP request
 * @returns NextResponse containing the cards data
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
 try {
   const cardsData: Card[] = getCardsData();
   
   return NextResponse.json(cardsData, {
     status: 200,
     headers: {
       'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
     }
   });
 } catch (error) {
   console.error('Error fetching cards data:', error);
   return NextResponse.json(
     { error: 'Failed to fetch cards data' },
     { status: 500 }
   );
 }
}