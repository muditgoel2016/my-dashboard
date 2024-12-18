import { NextResponse } from 'next/server'

import { getTransactionsData } from '@/services/endpointHandlerServices/dashboard/dashboardHandlerService'

/**
 *
 */
export async function GET() {
  const transactionsData = getTransactionsData()
  return NextResponse.json(transactionsData)
}