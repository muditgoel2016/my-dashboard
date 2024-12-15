import { NextResponse } from 'next/server'
import { getSettingsData } from '@/services/endpointHandlerServices/settings/settingsHandlerService'

export async function GET() {
  const settingsData = getSettingsData()
  return NextResponse.json(settingsData)
}