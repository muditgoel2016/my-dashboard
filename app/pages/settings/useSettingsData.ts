import { useState, useEffect } from 'react';

import { settingsDataService } from '@/services/dataServices/settings/settingsDataService';
import { validateFieldExternal } from '@/services/otherServices/formValidationUtil';

export interface FormField {
 name: string;
 label: string;
 type: string;
 hasDropdown?: boolean;
 defaultValue?: string;
}

export interface SettingsData {
 formFields: FormField[];
 profileImageData?: {
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

interface UseSettingsDataProps {
 initialData: SettingsData | null;
 ssrConfig: {
   SETTINGS_SSR_ENABLED: boolean;
 };
}

export const useSettingsData = ({ initialData, ssrConfig }: UseSettingsDataProps) => {
 const [formValues, setFormValues] = useState<FormValues>({});
 const [formErrors, setFormErrors] = useState<FormErrors>({});
 const [settingsData, setSettingsData] = useState<SettingsData | null>(initialData);

 // Utility function to initialize form values
 const initializeFormValues = (data: SettingsData): FormValues => {
   return data.formFields.reduce((acc, field) => {
     acc[field.name] = field.defaultValue || '';
     return acc;
   }, {} as FormValues);
 };

 useEffect(() => {
   const fetchData = async (): Promise<void> => {
     // Only fetch if SSR is not enabled or no initial data
     if (!ssrConfig.SETTINGS_SSR_ENABLED) {
       try {
         const data = await settingsDataService.getSettingsData(false);
         setSettingsData(data);
         setFormValues(initializeFormValues(data));
       } catch (error) {
         console.error('Error fetching settings data:', error);
       }
     }
   };

   // If we have initial data, use it regardless of SSR setting
   if (initialData) {
     setSettingsData(initialData);
     setFormValues(initializeFormValues(initialData));
   } else {
     void fetchData();
   }
 }, [initialData, ssrConfig.SETTINGS_SSR_ENABLED]);

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

   settingsData?.formFields.forEach((field) => {
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