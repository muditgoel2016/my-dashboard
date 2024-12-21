'use client';

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/services/otherServices/useToast';

import ProfileImagePicker from '@/app/components/settings/ProfileImagePicker';
import { Button } from '@/app/components/shared/common/button';
import { Card, CardContent } from '@/app/components/shared/common/card';
import { Input } from '@/app/components/shared/common/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/shared/common/tabs';
import Sidenav from '@/app/components/shared/desktop/nav';
import TopBar from '@/app/components/shared/desktop/top-bar';
import { useSettingsData } from '@/pages/settings/useSettingsData';

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
        variant: "destructive",
        title: "Validation Error",
        description: "Please check the form for errors."
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData instance
      const formData = new FormData();
      
      // Add all form fields
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Add profile image if exists
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
          // Handle validation errors
          Object.entries(data.errors).forEach(([field, error]) => {
            validateField(field, formValues[field], error as string);
          });
          throw new Error('Please check the form for errors.');
        }
        throw new Error(data.error || 'Failed to update settings');
      }

      toast({
        variant: "success",
        title: "Success",
        description: "Settings updated successfully"
      });

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to update settings'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                    <ProfileImagePicker 
                      imageData={settingsData?.profileImageData} 
                      onImageChange={handleProfileImageChange}
                    />

                    <form 
                      className='grid grid-cols-2 gap-x-8 gap-y-6 flex-1' 
                      onSubmit={(e) => {
                        void handleSubmit(e);
                      }} 
                      noValidate>
                      {settingsData?.formFields.map((field, index) => (
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
                              onBlur={() => validateField(field.name, formValues[field.name])}
                            />
                          </div>
                          {formErrors[field.name] && (
                            <p className='text-red-500 text-xs mt-1'>{formErrors[field.name]}</p>
                          )}
                        </div>
                      ))}

                      <div className='col-span-2 flex justify-end mt-6'>
                        <Button
                          type='submit'
                          disabled={isSubmitting}
                          className='bg-[#1A1F36] hover:bg-[#1A1F36]/90 text-white w-[190px] h-[50px] rounded-[15px] text-sm font-medium transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed'>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
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