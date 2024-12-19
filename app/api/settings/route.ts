import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getSettingsData } from '@/services/endpointHandlerServices/settings/settingsHandlerService';

interface FormField {
 label: string;
 defaultValue: string;
 type: 'text' | 'email' | 'password' | 'date';
 name: keyof FormFieldNames;
}

interface FormFieldNames {
 yourName: string;
 userName: string;
 email: string;
 password: string;
 dateOfBirth: string;
 presentAddress: string;
 permanentAddress: string;
 city: string;
 postalCode: string;
 country: string;
}

interface ProfileImage {
 type: 'image';
 defaultValue: string;
 label: string;
}

interface SettingsData {
 profileImage: ProfileImage;
 formFields: FormField[];
}

/**
* API route handler for fetching settings data
* @param request - Incoming HTTP request
* @returns NextResponse containing the settings configuration data
*/
export async function GET(request: NextRequest): Promise<NextResponse> {
 try {
   const settingsData: SettingsData = getSettingsData();
   
   return NextResponse.json(settingsData, {
     status: 200,
     headers: {
       'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
     }
   });
 } catch (error) {
   console.error('Error fetching settings:', error);
   return NextResponse.json(
     { error: 'Failed to fetch settings data' },
     { status: 500 }
   );
 }
}