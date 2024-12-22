'use client';

import { ChevronDown, Loader2 } from 'lucide-react';
import React, { useState } from 'react';

import ProfileImagePicker from '@/app/components/settings/ProfileImagePicker';
import { Button } from '@/app/components/shared/common/button';
import { Input } from '@/app/components/shared/common/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/shared/common/tabs';
import MobileNav from '@/app/components/shared/mobile/nav';
import TopBar from '@/app/components/shared/mobile/top-bar';
import { useSettingsData } from '@/pages/settings/useSettingsData';
import { useToast } from '@/services/otherServices/useToast';

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
        role: 'alert'
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
        role: 'status'
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update settings',
        role: 'alert'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className='min-h-screen bg-[#f6f7fa]'
      role='application'
      aria-label='Settings page'>
      <TopBar 
        title='Settings' 
        onMenuClick={(): void => setIsMobileMenuOpen(true)}/>
      <main 
        className='pb-24'
        role='main'
        aria-label='Settings content'>
        <div
          className='bg-white rounded-[15px] shadow-md mx-auto mt-6'
          style={{
            width: '90%',
            maxWidth: '325px',
            padding: '4%',
          }}>
          <Tabs 
            defaultValue='profile' 
            className='w-full'
            orientation='horizontal'
            aria-label='Settings sections'>
            {/* Tabs Header */}
            <div className='border-b border-gray-200 mb-4'>
              <TabsList 
                className='w-full flex justify-start px-4 border-0'
                aria-label='Settings options'>
                <TabsTrigger 
                  value='profile' 
                  className='relative px-0 pb-3 text-base font-medium text-[#718EBF]'
                  aria-controls='profile-tab'>
                  Edit Profile
                </TabsTrigger>
                <TabsTrigger 
                  value='preferences' 
                  className='relative px-0 pb-3 ml-8 text-base font-medium text-[#718EBF]'
                  aria-controls='preferences-tab'>
                  Preference
                </TabsTrigger>
                <TabsTrigger 
                  value='security' 
                  className='relative px-0 pb-3 ml-8 text-base font-medium text-[#718EBF]'
                  aria-controls='security-tab'>
                  Security
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Content */}
            <TabsContent 
              value='profile'
              id='profile-tab'
              role='tabpanel'
              aria-label='Edit profile settings'>
              <div 
                className='flex justify-center mb-6'
                aria-label='Profile image section'>
                <ProfileImagePicker 
                  imageData={settingsData.profileImageData} 
                  onImageChange={handleProfileImageChange}/>
              </div>

              <form 
                className='space-y-4' 
                onSubmit={(e) => {
                  void handleSubmit(e);
                }} 
                noValidate
                aria-label='Profile settings form'>
                {settingsData.formFields.map((field, index) => (
                  <div key={index}>
                    <label 
                      htmlFor={field.name}
                      className='block text-sm text-[#1A1F36] mb-2'>
                      {field.label}
                    </label>
                    <div className='relative'>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={formValues[field.name] || ''}
                        type={field.type}
                        aria-invalid={!!formErrors[field.name]}
                        aria-describedby={formErrors[field.name] ? `${field.name}-error` : undefined}
                        required={field.required}
                        className={`border-gray-200 rounded-lg h-11 px-3 text-sm text-[#718EBF] focus:border-[#4F46E5] focus:ring-0 w-full bg-white ${
                          formErrors[field.name] ? 'border-red-500' : ''
                        }`}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        onBlur={() => validateField(field.name, formValues[field.name])}/>
                      {field.hasDropdown && (
                        <ChevronDown 
                          className='absolute right-3 top-1/2 -translate-y-1/2 text-[#718EBF]' 
                          size={16} 
                          aria-hidden='true'/>
                      )}
                    </div>
                    {formErrors[field.name] && (
                      <p 
                        id={`${field.name}-error`}
                        className='text-red-500 text-xs mt-1'
                        role='alert'>
                        {formErrors[field.name]}
                      </p>
                    )}
                  </div>
                ))}

                <Button 
                  type='submit' 
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                  aria-label={isSubmitting ? 'Saving changes' : 'Save changes'}
                  className='w-full bg-[#1A1F36] h-[50px] rounded-[15px] mt-6 text-white'>
                  {isSubmitting ? (
                    <>
                      <Loader2 
                        className='mr-2 h-4 w-4 animate-spin'
                        aria-hidden='true'/>
                      <span>Saving...</span>
                    </>
                  ) : 'Save'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <MobileNav 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}/>
    </div>
  );
};

export default Settings;