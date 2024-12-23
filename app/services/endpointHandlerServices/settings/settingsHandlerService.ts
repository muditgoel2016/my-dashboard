import fs from 'fs/promises';
import path from 'path';

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

interface SettingsData {
  profileImage: ProfileImage;
  formFields: FormField[];
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

const SETTINGS_FILE_PATH = path.join(process.cwd(), 'data', 'settings.json');

/**
 * Retrieves settings data from JSON file
 * @throws {Error} If file cannot be read or parsed
 * @returns {Promise<SettingsData>} Object containing profile image and form fields configuration
 */
export async function getSettingsData(): Promise<SettingsData> {
  try {
    const jsonData = await fs.readFile(SETTINGS_FILE_PATH, 'utf8');
    
    try {
      const parsedData = JSON.parse(jsonData) as SettingsData;
      return parsedData;
    } catch (parseError) {
      throw new Error('Failed to parse settings data source');
    }
    
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error('Settings data source not found');
    }
    throw new Error('Failed to read settings data source');
  }
}

// Add to existing file above

/**
 * Updates settings data and handles profile image upload
 * @param formFields - Form field data to update
 * @param profileImage - Optional profile image file to upload
 * @throws {Error} If file operations fail
 * @returns {Promise<SettingsData>} Updated settings data
 */
export async function updateSettingsData(
  formFields: Partial<FormFieldNames>, 
  profileImage?: File
): Promise<SettingsData> {
  try {
    // 1. First read current data
    const currentData = await getSettingsData();

    // 2. Handle profile image if provided
    if (profileImage) {
      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      try {
        await fs.access(uploadsDir);
      } catch {
        await fs.mkdir(uploadsDir, { recursive: true });
      }

      // Generate unique filename using timestamp and original extension
      const fileExt = path.extname(profileImage.name);
      const fileName = `profile-${Date.now()}${fileExt}`;
      const filePath = path.join(uploadsDir, fileName);

      // Write file to uploads directory
      const buffer = Buffer.from(await profileImage.arrayBuffer());
      await fs.writeFile(filePath, buffer);

      // Update profile image path in settings data
      // Store relative path for serving via Next.js public directory
      currentData.profileImageData.defaultValue = `/uploads/${fileName}`;
    }

    // 3. Update form fields
    currentData.formFields = currentData.formFields.map(field => ({
      ...field,
      defaultValue: formFields[field.name] || field.defaultValue
    }));

    // 4. Write updated data back to file
    await fs.writeFile(
      SETTINGS_FILE_PATH,
      JSON.stringify(currentData, null, 2),
      'utf8'
    );

    return currentData;

  } catch (error) {
    if (error instanceof Error) {
      throw error; // Re-throw if it's already our error
    }
    throw new Error('Failed to update settings data');
  }
}