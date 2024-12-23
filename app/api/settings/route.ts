import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { validateFieldExternal } from '@/app/services/otherServices/formValidationUtil';
import { getSettingsData , updateSettingsData} from '@/services/endpointHandlerServices/settings/settingsHandlerService';

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
  profileImage?: ProfileImage;
  formFields: FormField[];
}

/**
 * GET handler for fetching settings data
 * @param request
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const settingsData = await getSettingsData(); // Now properly awaiting
    
    return NextResponse.json(settingsData, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    
    // Handle specific error messages
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    // Map error messages to appropriate status codes
    let statusCode = 500;
    if (errorMessage === 'Settings data source not found') {
      statusCode = 404;
    } else if (errorMessage === 'Failed to parse settings data source') {
      statusCode = 500;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}

/**
 * POST handler for updating settings
 * @param request
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // First verify we can read current settings
    try {
      await getSettingsData();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to access settings data';
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    const formData = await request.formData();
    
    // Handle profile image if exists
    const profileImage = formData.get('profileImage') as File | null;
    if (profileImage) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(profileImage.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Please upload a JPEG, PNG, or GIF.' },
          { status: 400 }
        );
      }
      
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (profileImage.size > maxSize) {
        return NextResponse.json(
          { error: 'File too large. Maximum size is 5MB.' },
          { status: 400 }
        );
      }
    }

    // Extract and validate form fields
    const formFields = {
      yourName: formData.get('yourName') as string,
      userName: formData.get('userName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      dateOfBirth: formData.get('dateOfBirth') as string,
      presentAddress: formData.get('presentAddress') as string,
      permanentAddress: formData.get('permanentAddress') as string,
      city: formData.get('city') as string,
      postalCode: formData.get('postalCode') as string,
      country: formData.get('country') as string
    };

    // Validate all fields
    const errors: Record<string, string> = {};
    Object.entries(formFields).forEach(([field, value]) => {
      const error = validateFieldExternal(field, value);
      if (error) {
        errors[field] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Update settings with validated data
    const updatedData = await updateSettingsData(formFields, profileImage || undefined);

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      data: updatedData
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update settings' },
      { status: 500 }
    );
  }
}

/**
 * PUT handler for field validation
 * @param request
 */
export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const { field, value } = await request.json();

    // Use shared validation logic
    const error = validateFieldExternal(field, value);
    
    if (error) {
      return NextResponse.json({ 
        isValid: false, 
        error,
        field 
      });
    }

    return NextResponse.json({ 
      isValid: true,
      field 
    });

  } catch (error) {
    return NextResponse.json(
      { 
        isValid: false,
        error: 'Validation failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 400 }
    );
  }
}