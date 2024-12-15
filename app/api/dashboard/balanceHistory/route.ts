import { NextResponse } from 'next/server'
import { getBalanceHistoryData } from '@/services/endpointHandlerServices/dashboard/dashboardHandlerService'

export async function GET() {
  const balanceHistoryData = getBalanceHistoryData()
  return NextResponse.json(balanceHistoryData)
}