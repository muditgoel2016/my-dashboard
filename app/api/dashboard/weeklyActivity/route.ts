import { NextResponse } from 'next/server'
import { getWeeklyActivityData } from '@/services/endpointHandlerServices/dashboard/dashboardHandlerService'

export async function GET() {
  const weeklyData = getWeeklyActivityData()
  return NextResponse.json(weeklyData)
}