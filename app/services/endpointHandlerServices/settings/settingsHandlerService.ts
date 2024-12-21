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
  profileImageData: ProfileImage;
  formFields: FormField[];
}

// Type safety for form field names
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

/**
 * Retrieves settings data including profile image and form fields
 * @returns {SettingsData} Object containing profile image and form fields configuration
 */
export function getSettingsData(): SettingsData {
  return {
    profileImageData: {
      type: 'image',
      defaultValue: 'https://picsum.photos/id/64/96/96',
      label: 'Profile Picture'
    },
    formFields: [
      { label: 'Your Name', defaultValue: 'Charlene Reed', type: 'text', name: 'yourName' },
      { label: 'User Name', defaultValue: 'Charlene Reed', type: 'text', name: 'userName' },
      { label: 'Email', defaultValue: 'charlenereed@gmail.com', type: 'email', name: 'email' },
      { label: 'Password', defaultValue: '********', type: 'password', name: 'password' },
      { label: 'Date of Birth', defaultValue: '25 January 1990', type: 'date', name: 'dateOfBirth' },
      { label: 'Present Address', defaultValue: 'San Jose, California, USA', type: 'text', name: 'presentAddress' },
      { label: 'Permanent Address', defaultValue: 'San Jose, California, USA', type: 'text', name: 'permanentAddress' },
      { label: 'City', defaultValue: 'San Jose', type: 'text', name: 'city' },
      { label: 'Postal Code', defaultValue: '45962', type: 'text', name: 'postalCode' },
      { label: 'Country', defaultValue: 'USA', type: 'text', name: 'country' },
    ]
  };
}