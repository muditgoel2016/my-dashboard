import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSettingsData } from '@/services/endpointHandlerServices/settings/settingsHandlerService';
import { validateFieldExternal } from '@/app/services/otherServices/formValidationUtil';

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

/**
 * POST handler for updating settings
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    
    // Handle profile image if it exists
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

      // TODO: Add your image upload logic here
      console.log('Processing image:', profileImage.name);
    }

    // Extract form fields
    const formFields = Object.fromEntries(formData.entries());
    delete formFields.profileImage;

    // Validate all fields using shared validation logic
    const errors: Record<string, string> = {};
    Object.entries(formFields).forEach(([field, value]) => {
      const error = validateFieldExternal(field, value as string);
      if (error) {
        errors[field] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // TODO: Add your database update logic here
    // For now, simulate success
    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      data: {
        ...formFields,
        profileImageUrl: profileImage ? '/api/images/profile.jpg' : undefined
      }
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