import React from 'react';
import Sidenav from '@/app/components/shared/desktop/nav';
import TopBar from '@/app/components/shared/desktop/top-bar';
import { Card, CardContent } from "@/app/components/shared/common/card";
import { Input } from "@/app/components/shared/common/input";
import { Button } from "@/app/components/shared/common/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/components/shared/common/tabs";
import { ChevronDown } from "lucide-react";
import ProfileImagePicker from '@/app/components/settings/ProfileImagePicker';

const formFields = [
  { label: "Your Name", defaultValue: "Charlene Reed", type: "text" },
  { label: "User Name", defaultValue: "Charlene Reed", type: "text" },
  { label: "Email", defaultValue: "charlenereed@gmail.com", type: "email" },
  { label: "Password", defaultValue: "********", type: "password" },
  { label: "Date of Birth", defaultValue: "25 January 1990", type: "text", hasDropdown: true },
  { label: "Present Address", defaultValue: "San Jose, California, USA", type: "text" },
  { label: "Permanent Address", defaultValue: "San Jose, California, USA", type: "text" },
  { label: "City", defaultValue: "San Jose", type: "text" },
  { label: "Postal Code", defaultValue: "45962", type: "text" },
  { label: "Country", defaultValue: "USA", type: "text" },
];

export default function Settings() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      <Sidenav />
      <div className="ml-64 flex-1">
        <TopBar title= "Settings"/>
        <main className="p-6">
          <Card className="mx-4 bg-white shadow-sm rounded-lg">
            <CardContent className="p-8">
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

                <TabsContent value="profile">
                  <div className="flex gap-8">
                    <ProfileImagePicker />

                    {/* Form Section */}
                    <form className="grid grid-cols-2 gap-x-8 gap-y-6 flex-1">
                      {formFields.map((field, index) => (
                        <div key={index}>
                          <label className="block text-sm text-[#1A1F36] mb-2">
                            {field.label}
                          </label>
                          <div className="relative">
                            <Input 
                              defaultValue={field.defaultValue}
                              type={field.type}
                              className="border-gray-200 rounded-lg h-11 px-3 text-sm text-[#718EBF] focus:border-[#4F46E5] focus:ring-0 w-full bg-white" 
                            />
                            {field.hasDropdown && (
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#718EBF]" size={16} />
                            )}
                          </div>
                        </div>
                      ))}

                      <div className="col-span-2 flex justify-end mt-6">
                        <Button className="bg-[#1A1F36] hover:bg-[#1A1F36]/90 text-white w-[190px] h-[50px] rounded-[15px] text-sm font-medium">
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