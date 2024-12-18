import React, { useState, useEffect } from "react";

// UI Component Imports
import Sidenav from "@/app/components/shared/desktop/nav";
import TopBar from "@/app/components/shared/desktop/top-bar";
import { Card, CardContent } from "@/app/components/shared/common/card";
import { Input } from "@/app/components/shared/common/input";
import { Button } from "@/app/components/shared/common/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/components/shared/common/tabs";
import { ChevronDown } from "lucide-react";
import ProfileImagePicker from "@/app/components/settings/ProfileImagePicker";

// Service Imports
import { settingsDataService } from '@/app/services/dataServices/settings/settingsDataService';

export default function Settings() {
  // =============== State Management ===============
  const [formValues, setFormValues] = useState({});     // Stores current form values
  const [formErrors, setFormErrors] = useState({});     // Stores validation errors
  const [settingsData, setSettingsData] = useState(null);  // Stores API response data

  // =============== Data Fetching ===============
  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const data = await settingsDataService.getSettingsData();
        setSettingsData(data);
        
        // Initialize form with default values from API
        const initialValues = data.formFields.reduce((acc, field) => {
          acc[field.name] = field.defaultValue || "";
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
    let error = "";
    
    // Validation rules for specific fields
    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email format.";
        }
        break;
        
      case "password":
        if (!value) {
          error = "Password is required.";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters.";
        }
        break;
        
      case "postalCode":
        if (!value) {
          error = "Postal code is required.";
        } else if (!/^\d{5}$/.test(value)) {
          error = "Postal code must be 5 digits.";
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

  // Validates entire form before submission
  const validateForm = () => {
    const errors = {};
    let valid = true;

    settingsData.formFields.forEach((field) => {
      const error = validateField(field.name, formValues[field.name]);
      if (error) valid = false;
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      try {
        // TODO: Implement API update
        // await settingsDataService.updateSettings(formValues);
        console.log("Form submitted successfully:", formValues);
        alert("Form submitted successfully!");
      } catch (error) {
        console.error('Error updating settings:', error);
        alert("Failed to update settings. Please try again.");
      }
    } else {
      console.log("Validation failed.");
    }
  };

  // Show loading state while fetching data
  if (!settingsData) return <div>Loading...</div>;

  // =============== Component Render ===============
  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      {/* Layout Components */}
      <Sidenav />
      <div className="ml-64 flex-1">
        <TopBar title="Settings" />
        
        {/* Main Content */}
        <main className="p-6">
          <Card className="mx-4 bg-white shadow-sm rounded-lg">
            <CardContent className="p-8">
              {/* Tab Navigation */}
              <Tabs defaultValue="profile" className="w-full">
                <div className="border-b border-gray-200 mb-8">
                  <TabsList className="space-x-8 border-0">
                    <TabsTrigger 
                      value="profile" 
                      className="relative px-0 pb-4 text-base font-medium text-[#718EBF] data-[state=active]:text-[#1A1F36] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-[#4F46E5]"
                    >
                      Edit Profile
                    </TabsTrigger>
                    <TabsTrigger 
                      value="preferences" 
                      className="relative px-0 pb-4 text-base font-medium text-[#718EBF]"
                    >
                      Preferences
                    </TabsTrigger>
                    <TabsTrigger 
                      value="security" 
                      className="relative px-0 pb-4 text-base font-medium text-[#718EBF]"
                    >
                      Security
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Profile Tab Content */}
                <TabsContent value="profile">
                  <div className="flex gap-8">
                    {/* Profile Image Section */}
                    <ProfileImagePicker imageData={settingsData.profileImage} />

                    {/* Form Section */}
                    <form className="grid grid-cols-2 gap-x-8 gap-y-6 flex-1" onSubmit={handleSubmit} noValidate>
                      {/* Form Fields */}
                      {settingsData.formFields.map((field, index) => (
                        <div key={index}>
                          <label className="block text-sm text-[#1A1F36] mb-2">
                            {field.label}
                          </label>
                          <div className="relative">
                            <Input
                              value={formValues[field.name] || ""}
                              type={field.type}
                              className={`border-gray-200 rounded-lg h-11 px-3 text-sm text-[#718EBF] focus:border-[#4F46E5] focus:ring-0 w-full bg-white ${
                                formErrors[field.name] ? "border-red-500" : ""
                              }`}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              onBlur={() => validateField(field.name, formValues[field.name])}
                            />
                            {field.hasDropdown && (
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#718EBF]" size={16} />
                            )}
                          </div>
                          {/* Error Messages */}
                          {formErrors[field.name] && (
                            <p className="text-red-500 text-xs mt-1">{formErrors[field.name]}</p>
                          )}
                        </div>
                      ))}

                      {/* Submit Button */}
                      <div className="col-span-2 flex justify-end mt-6">
                        <Button
                          type="submit"
                          className="bg-[#1A1F36] hover:bg-[#1A1F36]/90 text-white w-[190px] h-[50px] rounded-[15px] text-sm font-medium"
                        >
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
}