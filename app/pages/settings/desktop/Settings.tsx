import React, { useState, useEffect } from 'react';

import ProfileImagePicker from '@/app/components/settings/ProfileImagePicker';
import { Button } from '@/app/components/shared/common/button';
import { Card, CardContent } from '@/app/components/shared/common/card';
import { Input } from '@/app/components/shared/common/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/shared/common/tabs';
import Sidenav from '@/app/components/shared/desktop/nav';
import TopBar from '@/app/components/shared/desktop/top-bar';
import { settingsDataService } from '@/app/services/dataServices/settings/settingsDataService';

interface FormField {
  name: string;
  label: string;
  type: string;
  defaultValue?: string;
}

interface SettingsData {
  formFields: FormField[];
  profileImage: {
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
  // =============== State Management ===============
  const [formValues, setFormValues] = useState<FormValues>({});     
  const [formErrors, setFormErrors] = useState<FormErrors>({});     
  const [settingsData, setSettingsData] = useState<SettingsData | null>(null);  

  // =============== Data Fetching ===============
  useEffect(() => {
    void (async () => {
      try {
        const data = await settingsDataService.getSettingsData();
        setSettingsData(data);
        
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

  const validateField = (name: string, value: string): string => {
    let error = '';
  
    switch (name) {
      case 'email':
        if (!value) {
          error = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Invalid email format.';
        }
        break;
  
      case 'password':
        if (!value) {
          error = 'Password is required.';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters.';
        }
        break;
  
      case 'postalCode':
        if (!value) {
          error = 'Postal code is required.';
        } else if (!/^\d{5}$/.test(value)) {
          error = 'Postal code must be 5 digits.';
        }
        break;
  
      case 'dateOfBirth':
        if (!value) {
          error = 'Date of Birth is required.';
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
  
          if (selectedDate > today) {
            error = 'Date of Birth cannot be in the future.';
          }
        }
        break;
  
      default:
        if (!value) {
          error = `${name} is required.`;
        }
    }
  
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

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    
    if (validateForm()) {
      try {
        console.log('Form submitted successfully:', formValues);
        alert('Form submitted successfully!');
      } catch (error) {
        console.error('Error updating settings:', error);
        alert('Failed to update settings. Please try again.');
      }
    } else {
      console.log('Validation failed.');
    }
  };

  if (!settingsData) {return <div>Loading...</div>;}

  return (
    <div className='min-h-screen bg-[#F7F9FC] flex'>
      <Sidenav />
      <div className='ml-64 flex-1'>
        <TopBar title='Settings' />
        
        <main className='p-6'>
          <Card className='mx-4 bg-white shadow-sm rounded-lg'>
            <CardContent className='p-8'>
              <Tabs defaultValue='profile' className='w-full'>
                <div className='border-b border-gray-200 mb-8'>
                  <TabsList className='space-x-8 border-0'>
                    <TabsTrigger 
                      value='profile' 
                      className="relative px-0 pb-4 text-base font-medium text-[#718EBF] data-[state=active]:text-[#1A1F36] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-[#4F46E5]">
                      Edit Profile
                    </TabsTrigger>
                    <TabsTrigger 
                      value='preferences' 
                      className='relative px-0 pb-4 text-base font-medium text-[#718EBF]'>
                      Preferences
                    </TabsTrigger>
                    <TabsTrigger 
                      value='security' 
                      className='relative px-0 pb-4 text-base font-medium text-[#718EBF]'>
                      Security
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value='profile'>
                  <div className='flex gap-8'>
                    <ProfileImagePicker imageData={settingsData.profileImage} />

                    <form 
                      className='grid grid-cols-2 gap-x-8 gap-y-6 flex-1' 
                      onSubmit={(e) => {
                        void handleSubmit(e);
                      }} 
                      noValidate>
                      {settingsData.formFields.map((field, index) => (
                        <div key={index}>
                          <label className='block text-sm text-[#1A1F36] mb-2'>
                            {field.label}
                          </label>
                          <div className='relative'>
                            <Input
                              value={formValues[field.name] || ''}
                              type={field.type}
                              className={`border-gray-200 rounded-lg h-11 px-3 text-sm text-[#718EBF] focus:border-[#4F46E5] focus:ring-0 w-full bg-white ${
                                formErrors[field.name] ? 'border-red-500' : ''
                              }`}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              onBlur={() => validateField(field.name, formValues[field.name])}/>
                          </div>
                          {formErrors[field.name] && (
                            <p className='text-red-500 text-xs mt-1'>{formErrors[field.name]}</p>
                          )}
                        </div>
                      ))}

                      <div className='col-span-2 flex justify-end mt-6'>
                        <Button
                          type='submit'
                          className='bg-[#1A1F36] hover:bg-[#1A1F36]/90 text-white w-[190px] h-[50px] rounded-[15px] text-sm font-medium'>
                          Save
                        </Button>
                      </div>
                    </form>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Settings;