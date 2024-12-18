import { NextResponse } from 'next/server'

import { getExpenseStatisticsData } from '@/services/endpointHandlerServices/dashboard/dashboardHandlerService'

/**
 *
 */
export async function GET() {
  const expenseData = getExpenseStatisticsData()
  return NextResponse.json(expenseData)
}