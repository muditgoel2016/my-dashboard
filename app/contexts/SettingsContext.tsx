// app/contexts/SettingsContext.tsx
'use client';
import { createContext, useContext, useState } from 'react';
import type {
  FormFieldNames,
  ProfileImage,
  FormField
} from '@/app/components/settings/settingsInterfaces';

interface SettingsData {
  profileImage: ProfileImage;
  formFields: FormField[];
}

interface SettingsState {
  settings: SettingsData | null;
  formErrors: Record<keyof FormFieldNames, string>;
  isLoading: boolean;
}

interface SettingsContextData extends SettingsState {
  setSettings: (data: SettingsData) => void;
  setFormErrors: (errors: Record<keyof FormFieldNames, string>) => void;
  setIsLoading: (loading: boolean) => void;
  resetState: () => void;
}

const initialState: SettingsState = {
  settings: null,
  formErrors: {} as Record<keyof FormFieldNames, string>,
  isLoading: false
};

const SettingsContext = createContext<SettingsContextData | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [formErrors, setFormErrors] = useState<Record<keyof FormFieldNames, string>>({} as Record<keyof FormFieldNames, string>);
  const [isLoading, setIsLoading] = useState(false);

  const resetState = () => {
    setSettings(initialState.settings);
    setFormErrors(initialState.formErrors);
    setIsLoading(initialState.isLoading);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        formErrors,
        isLoading,
        setSettings,
        setFormErrors,
        setIsLoading,
        resetState
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