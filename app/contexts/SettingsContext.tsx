'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { settingsDataService } from '@/app/services/dataServices/settings/settingsDataService';
import { validateFieldExternal } from '@/services/otherServices/formValidationUtil';

interface SettingsData {
  profileImage: {
    url: string;
    alt: string;
  };
  formFields: {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    defaultValue?: string;
  }[];
}

interface SettingsState {
  settings: SettingsData | null;
  formValues: Record<string, string>;
  formErrors: Record<string, string>;
  isLoading: boolean;
}

interface SettingsContextData extends SettingsState {
  setSettings: (data: SettingsData) => void;
  setFormValues: (values: Record<string, string>) => void;
  setFormErrors: (errors: Record<string, string>) => void;
  setIsLoading: (loading: boolean) => void;
  resetState: () => void;
  validateField: (name: string, value: string) => string;
  validateForm: () => boolean;
}

const initialState: SettingsState = {
  settings: null,
  formValues: {},
  formErrors: {},
  isLoading: false,
};

const SettingsContext = createContext<SettingsContextData | undefined>(undefined);

export function SettingsProvider({
  children,
  initialData,
  ssrConfig,
}: {
  children: React.ReactNode;
  initialData?: SettingsData | null;
  ssrConfig: {
    SETTINGS_SSR_ENABLED: boolean;
  };
}) {
  const [settings, setSettings] = useState<SettingsData | null>(initialData || null);
  const [formValues, setFormValues] = useState<Record<string, string>>(
    initialData
      ? initialData.formFields.reduce(
          (acc, field) => ({ ...acc, [field.name]: field.defaultValue || '' }),
          {}
        )
      : {}
  );
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(!initialData && !ssrConfig.SETTINGS_SSR_ENABLED);

  useEffect(() => {
    if (!ssrConfig.SETTINGS_SSR_ENABLED) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const data = await settingsDataService.getSettingsData(false);
          setSettings(data);
          setFormValues(
            data.formFields.reduce(
              (acc, field) => ({ ...acc, [field.name]: field.defaultValue || '' }),
              {}
            )
          );
        } catch (error) {
          console.error('Failed to fetch settings data:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [ssrConfig.SETTINGS_SSR_ENABLED, initialData]);

  const validateField = (name: string, value: string): string => {
    const error = validateFieldExternal(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const validateForm = (): boolean => {
    if (!settings) return false;

    const errors: Record<string, string> = {};
    let isValid = true;

    settings.formFields.forEach((field) => {
      const error = validateField(field.name, formValues[field.name]);
      if (error) isValid = false;
      errors[field.name] = error;
    });

    setFormErrors(errors);
    return isValid;
  };

  const resetState = () => {
    setSettings(initialState.settings);
    setFormValues(initialState.formValues);
    setFormErrors(initialState.formErrors);
    setIsLoading(initialState.isLoading);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        formValues,
        formErrors,
        isLoading,
        setSettings,
        setFormValues,
        setFormErrors,
        setIsLoading,
        resetState,
        validateField,
        validateForm,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
