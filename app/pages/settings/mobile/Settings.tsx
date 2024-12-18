'use client';
import { ChevronDown } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import ProfileImagePicker from '@/app/components/settings/ProfileImagePicker';
import { Button } from '@/app/components/shared/common/button';
import { Input } from '@/app/components/shared/common/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/shared/common/tabs';
import MobileNav from '@/app/components/shared/mobile/nav';
import TopBar from '@/app/components/shared/mobile/top-bar';

// Service Imports
import { settingsDataService } from '@/app/services/dataServices/settings/settingsDataService';

/**
 *
 */
export default function Settings() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [settingsData, setSettingsData] = useState(null);

  // =============== Data Fetching ===============
  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const data = await settingsDataService.getSettingsData();
        setSettingsData(data);

        // Initialize form with default values
        const initialValues = data.formFields.reduce((acc, field) => {
          acc[field.name] = field.defaultValue || '';
          return acc;
        }, {});
        setFormValues(initialValues);
      } catch (error) {
        console.error('Error fetching settings data:', error);
      }
    };

    fetchSettingsData();
  }, []);

  // =============== Form Validation ===============
  const validateField = (name, value) => {
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

  const validateForm = () => {
    const errors = {};
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
  const handleInputChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    validateField(name, value); // Real-time validation
  };

  const handleSubmit = (event) => {
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
      <TopBar title='Settings' onMenuClick={() => setIsMobileMenuOpen(true)} />
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
                <ProfileImagePicker />
              </div>

              <form className='space-y-4' onSubmit={handleSubmit} noValidate>
                {settingsData.formFields.map((field, index) => (
                  <div key={index}>
                    <label className='block text-sm text-[#1A1F36] mb-2'>{field.label}</label>
                    <div className='relative'>
                      <Input
                        value={formValues[field.name] || ''}
                        type={field.type} // Includes "date" type for dateOfBirth
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

                <Button type='submit' className='w-full bg-[#1A1F36] h-[50px] rounded-[15px] mt-6 text-white'>
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
}
