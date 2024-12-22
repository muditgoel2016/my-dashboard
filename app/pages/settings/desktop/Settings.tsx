'use client';

import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';

import ProfileImagePicker from '@/app/components/settings/ProfileImagePicker';
import { Button } from '@/app/components/shared/common/button';
import { Card, CardContent } from '@/app/components/shared/common/card';
import { Input } from '@/app/components/shared/common/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/shared/common/tabs';
import Sidenav from '@/app/components/shared/desktop/nav';
import TopBar from '@/app/components/shared/desktop/top-bar';
import { useSettingsData } from '@/pages/settings/useSettingsData';
import { useToast } from '@/services/otherServices/useToast';

const Settings: React.FC<{ initialSettingsData: any }> = ({ initialSettingsData }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  
  const {
    formValues,
    formErrors,
    settingsData,
    setFormValues,
    validateField,
    validateForm,
  } = useSettingsData(initialSettingsData);

  // Event Handlers
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
        description: 'Settings updated successfully',
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
      className='min-h-screen bg-[#F7F9FC] flex'
      role='application'
      aria-label='Settings page'>
      <Sidenav />
      <div className='ml-64 flex-1'>
        <TopBar title='Settings' />
        
        <main 
          className='p-6'
          role='main'
          aria-label='Settings content'>
          <Card className='mx-4 bg-white shadow-sm rounded-lg'>
            <CardContent className='p-8'>
              <Tabs 
                defaultValue='profile' 
                className='w-full'
                orientation='horizontal'
                aria-label='Settings tabs'>
                <div className='border-b border-gray-200 mb-8'>
                  <TabsList 
                    className='space-x-8 border-0'
                    aria-label='Settings sections'>
                    <TabsTrigger 
                      value='profile' 
                      aria-controls='profile-tab'>
                      Edit Profile
                    </TabsTrigger>
                    <TabsTrigger 
                      value='preferences' 
                      aria-controls='preferences-tab'>
                      Preferences
                    </TabsTrigger>
                    <TabsTrigger 
                      value='security' 
                      aria-controls='security-tab'>
                      Security
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent 
                  value='profile'
                  id='profile-tab'
                  role='tabpanel'
                  aria-label='Edit profile settings'>
                  <div className='flex gap-8'>
                    <ProfileImagePicker 
                      imageData={settingsData.profileImageData} 
                      onImageChange={handleProfileImageChange}/>

                    <form 
                      className='grid grid-cols-2 gap-x-8 gap-y-6 flex-1' 
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
                              className={`border-gray-200 rounded-lg h-11 px-3 text-sm text-[#718EBF] focus:border-[#4F46E5] focus:ring-0 w-full bg-white ${
                                formErrors[field.name] ? 'border-red-500' : ''
                              }`}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              onBlur={() => validateField(field.name, formValues[field.name])}
                              aria-invalid={!!formErrors[field.name]}
                              aria-describedby={formErrors[field.name] ? `${field.name}-error` : undefined}
                              required={field.required}/>
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

                      <div className='col-span-2 flex justify-end mt-6'>
                        <Button
                          type='submit'
                          disabled={isSubmitting}
                          aria-disabled={isSubmitting}
                          aria-label={isSubmitting ? 'Saving changes' : 'Save changes'}
                          className='bg-[#1A1F36] hover:bg-[#1A1F36]/90 text-white w-[190px] h-[50px] rounded-[15px] text-sm font-medium transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed'>
                          {isSubmitting ? (
                            <>
                              <Loader2 
                                className='mr-2 h-4 w-4 animate-spin'
                                aria-hidden='true'/>
                              <span>Saving...</span>
                            </>
                          ) : 'Save'}
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