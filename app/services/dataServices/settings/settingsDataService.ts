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
async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`/api/settings/${endpoint}`);
    
    if (!response.ok) {
      throw new SettingsAPIError(
        `HTTP error! status: ${response.status}`,
        response.status,
        endpoint
      );
    }
    
    return response.json();
  } catch (error) {
    if (error instanceof SettingsAPIError) {
      throw error;
    }
    throw new SettingsAPIError(
      'Failed to fetch settings data',
      500,
      endpoint
    );
  }
}

/**
 * Settings data service for fetching and managing settings data
 */
export const settingsDataService = {
  /**
   * Fetches settings data including profile image and form fields
   */
  getSettingsData: (): Promise<SettingsData> => 
    fetchData<SettingsData>(''),
} as const;

// Export type for the service
export type SettingsDataService = typeof settingsDataService;