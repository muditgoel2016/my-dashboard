'use client';

import { ChevronDown } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import ProfileImagePicker from '@/app/components/settings/ProfileImagePicker';
import { Button } from '@/app/components/shared/common/button';
import { Input } from '@/app/components/shared/common/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/shared/common/tabs';
import MobileNav from '@/app/components/shared/mobile/nav';
import TopBar from '@/app/components/shared/mobile/top-bar';
import { settingsDataService } from '@/app/services/dataServices/settings/settingsDataService';
import { validateFieldExternal } from '@/services/otherServices/formValidationUtil';

interface FormField {
  name: string;
  label: string;
  type: string;
  hasDropdown?: boolean;
  defaultValue?: string;
}

interface SettingsData {
  formFields: FormField[];
  profileImage?: {
    url: string;
    alt: string;
  };
}

interface FormValues {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

const Settings: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [settingsData, setSettingsData] = useState<SettingsData | null>(null);

  // =============== Data Fetching ===============
  useEffect(() => {
    void (async () => {
      try {
        const data = await settingsDataService.getSettingsData();
        setSettingsData(data);

        // Initialize form with default values
        const initialValues = data.formFields.reduce((acc: FormValues, field) => {
          acc[field.name] = field.defaultValue || '';
          return acc;
        }, {} as FormValues);
        setFormValues(initialValues);
      } catch (error) {
        console.error('Error fetching settings data:', error);
      }
    })();
  }, []);

  // =============== Form Validation ===============
  const validateField = (name: string, value: string): string => {
    let error = '';

    error = validateFieldExternal(name, value);

    setFormErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const validateForm = (): boolean => {
    if (!settingsData) {return false;}

    const errors: FormErrors = {};
    let valid = true;

    settingsData.formFields.forEach((field) => {
      const error = validateField(field.name, formValues[field.name]);
      if (error) {valid = false;}
      errors[field.name] = error;
    });

    setFormErrors(errors);
    return valid;
  };

  // =============== Event Handlers ===============
  const handleInputChange = (name: string, value: string): void => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    if (validateForm()) {
      console.log('Form submitted successfully:', formValues);
      alert('Form submitted successfully!');
    } else {
      console.log('Validation failed.');
    }
  };

  if (!settingsData) {return <div>Loading...</div>;}

  // =============== Component Render ===============
  return (
    <div className='min-h-screen bg-[#f6f7fa]'>
      <TopBar 
        title='Settings' 
        onMenuClick={(): void => setIsMobileMenuOpen(true)}/>
      <main className='pb-24'>
        <div
          className='bg-white rounded-[15px] shadow-md mx-auto mt-6'
          style={{
            width: '90%',
            maxWidth: '325px',
            padding: '4%',
          }}>
          <Tabs defaultValue='profile' className='w-full'>
            {/* Tabs Header */}
            <div className='border-b border-gray-200 mb-4'>
              <TabsList className='w-full flex justify-start px-4 border-0'>
                <TabsTrigger value='profile' className='relative px-0 pb-3 text-base font-medium text-[#718EBF]'>
                  Edit Profile
                </TabsTrigger>
                <TabsTrigger value='preferences' className='relative px-0 pb-3 ml-8 text-base font-medium text-[#718EBF]'>
                  Preference
                </TabsTrigger>
                <TabsTrigger value='security' className='relative px-0 pb-3 ml-8 text-base font-medium text-[#718EBF]'>
                  Security
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Content */}
            <TabsContent value='profile'>
              <div className='flex justify-center mb-6'>
                <ProfileImagePicker imageData={settingsData.profileImage} />
              </div>

              <form 
                className='space-y-4' 
                onSubmit={(e) => {
                  void handleSubmit(e);
                }} 
                noValidate>
                {settingsData.formFields.map((field, index) => (
                  <div key={index}>
                    <label className='block text-sm text-[#1A1F36] mb-2'>{field.label}</label>
                    <div className='relative'>
                      <Input
                        value={formValues[field.name] || ''}
                        type={field.type}
                        className={`border-gray-200 rounded-lg h-11 px-3 text-sm text-[#718EBF] focus:border-[#4F46E5] focus:ring-0 w-full bg-white ${
                          formErrors[field.name] ? 'border-red-500' : ''
                        }`}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        onBlur={() => validateField(field.name, formValues[field.name])}/>
                      {field.hasDropdown && (
                        <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-[#718EBF]' size={16} />
                      )}
                    </div>
                    {formErrors[field.name] && (
                      <p className='text-red-500 text-xs mt-1'>{formErrors[field.name]}</p>
                    )}
                  </div>
                ))}

                <Button 
                  type='submit' 
                  className='w-full bg-[#1A1F36] h-[50px] rounded-[15px] mt-6 text-white'>
                  Save
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <MobileNav />
    </div>
  );
};

export default Settings;