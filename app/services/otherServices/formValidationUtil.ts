export const validateEmail = (value: string): string => {
  if (!value) {return 'Email is required.';}
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {return 'Invalid email format.';}
  return '';
};

export const validatePassword = (value: string): string => {
  if (!value) {return 'Password is required.';}
  if (value.length < 8) {return 'Password must be at least 8 characters.';}
  return '';
};

export const validatePostalCode = (value: string): string => {
  if (!value) {return 'Postal code is required.';}
  if (!/^\d{5}$/.test(value)) {return 'Postal code must be 5 digits.';}
  return '';
};

export const validateDateOfBirth = (value: string): string => {
  if (!value) {return 'Date of Birth is required.';}
  const selectedDate = new Date(value);
  const today = new Date();
  if (selectedDate > today) {return 'Date of Birth cannot be in the future.';}
  return '';
};

export const validateFieldExternal = (name: string, value: string): string => {
  switch (name) {
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value);
    case 'postalCode':
      return validatePostalCode(value);
    case 'dateOfBirth':
      return validateDateOfBirth(value);
    default:
      return value ? '' : `${name} is required.`;
  }
};
