import { NextResponse } from 'next/server'
import { getQuickTransferUsersData } from '@/services/endpointHandlerServices/dashboard/dashboardHandlerService'

export async function GET() {
  const quickTransferUserData = getQuickTransferUsersData()
  return NextResponse.json(quickTransferUserData)
}