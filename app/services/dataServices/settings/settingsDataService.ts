// Types for settings data
interface ProfileImage {
  type: 'image';
  defaultValue: string;
  label: string;
}

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

interface SettingsData {
  profileImage: ProfileImage;
  formFields: FormField[];
}

// Custom error class for API errors
class SettingsAPIError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string
  ) {
    super(message);
    this.name = 'SettingsAPIError';
  }
}

/**
 * Fetches data from the settings API
 * @param endpoint - API endpoint to fetch from
 * @returns Promise with the typed response data
 * @throws SettingsAPIError if the request fails
 */
async function fetchData<T>(serverSideCall: boolean, endpoint: string): Promise<T> {
  try {
    const url = serverSideCall
      ? `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/settings${endpoint}`
      : `/api/settings${endpoint}`; // Browser will automatically use current origin
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new SettingsAPIError(
        `HTTP error! status: ${response.status}`,
        response.status,
        endpoint
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Server fetch error:', error);
    if (error instanceof SettingsAPIError) {
      throw error;
    }
    throw new SettingsAPIError('Failed to fetch settings data', 500, endpoint);
  }
}

export const settingsDataService = {
  getSettingsData: (serverSideCall: boolean = false): Promise<SettingsData> =>
    fetchData<SettingsData>(serverSideCall, ''),
} as const;
// Export type for the service
export type SettingsDataService = typeof settingsDataService;