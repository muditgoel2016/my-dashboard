import { useState, useEffect } from 'react';

import { settingsDataService } from '@/app/services/dataServices/settings/settingsDataService';
import { validateFieldExternal } from '@/pages/settings/formValidationUtil';

export interface FormField {
  name: string;
  label: string;
  type: string;
  hasDropdown?: boolean;
  defaultValue?: string;
}

export interface SettingsData {
  formFields: FormField[];
  profileImage?: {
    url: string;
    alt: string;
  };
}

export interface FormValues {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}

export const useSettings = () => {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [settingsData, setSettingsData] = useState<SettingsData | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const data = await settingsDataService.getSettingsData();
        setSettingsData(data);

        const initialValues = data.formFields.reduce((acc: FormValues, field) => {
          acc[field.name] = field.defaultValue || '';
          return acc;
        }, {});
        setFormValues(initialValues);
      } catch (error) {
        console.error('Error fetching settings data:', error);
      }
    };

    // Correctly handle the Promise to suppress eslint warnings
    void fetchData();
  }, []);

  const validateField = (name: string, value: string): string => {
    const error = validateFieldExternal(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const validateForm = (): boolean => {
    if (!settingsData) {
      return false;
    }

    const errors: FormErrors = {};
    let isValid = true;

    settingsData.formFields.forEach((field) => {
      const error = validateField(field.name, formValues[field.name]);
      if (error) {
        isValid = false;
      }
      errors[field.name] = error;
    });

    setFormErrors(errors);
    return isValid;
  };

  return {
    formValues,
    formErrors,
    settingsData,
    setFormValues,
    validateField,
    validateForm,
  };
};
