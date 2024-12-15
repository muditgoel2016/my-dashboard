import { NextResponse } from 'next/server'
import { getCardsData } from '@/services/endpointHandlerServices/dashboard/dashboardHandlerService'

export async function GET() {
  const cardsData = getCardsData()
  return NextResponse.json(cardsData)
}