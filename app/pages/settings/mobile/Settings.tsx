'use client';

import React, { useState } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useToast } from '@/services/otherServices/useToast';

import ProfileImagePicker from '@/app/components/settings/ProfileImagePicker';
import { Button } from '@/app/components/shared/common/button';
import { Input } from '@/app/components/shared/common/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/shared/common/tabs';
import MobileNav from '@/app/components/shared/mobile/nav';
import TopBar from '@/app/components/shared/mobile/top-bar';
import { useSettingsData } from '@/pages/settings/useSettingsData';

const Settings: React.FC<{ initialSettingsData: any }> = ({ initialSettingsData }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const { toast } = useToast();
  const {
    formValues,
    formErrors,
    settingsData,
    setFormValues,
    validateField,
    validateForm,
  } = useSettingsData(initialSettingsData);

  // =============== Event Handlers ===============
  const handleInputChange = (name: string, value: string): void => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleProfileImageChange = (file: File | null) => {
    setProfileImage(file);
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (!validateForm()) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Please check the form for errors.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      const response = await fetch('/api/settings', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          Object.entries(data.errors).forEach(([field, error]) => {
            validateField(field, formValues[field], error as string);
          });
          throw new Error('Please check the form for errors.');
        }
        throw new Error(data.error || 'Failed to update settings');
      }

      toast({
        variant: 'success',
        title: 'Success',
        description: 'Settings updated successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update settings',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // =============== Component Render ===============
  return (
    <div className='min-h-screen bg-[#f6f7fa]'>
      <TopBar 
        title='Settings' 
        onMenuClick={(): void => setIsMobileMenuOpen(true)}
      />
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
                <ProfileImagePicker 
                  imageData={settingsData.profileImageData} 
                  onImageChange={handleProfileImageChange}
                />
              </div>

              <form 
                className='space-y-4' 
                onSubmit={(e) => {
                  void handleSubmit(e);
                }} 
                noValidate>
                {settingsData?.formFields.map((field, index) => (
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
                  disabled={isSubmitting}
                  className='w-full bg-[#1A1F36] h-[50px] rounded-[15px] mt-6 text-white'>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : 'Save'}
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