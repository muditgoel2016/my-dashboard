import React from 'react';
import Sidenav from '@/components/layout/desktop/nav';
import TopBar from '@/components/layout/desktop/top-bar';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Pencil, ChevronDown } from "lucide-react";

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
        <TopBar />
        <main className="p-8">
          <h1 className="text-2xl font-semibold mb-6">Setting</h1>
          <Card className="max-w-[1000px] mx-auto bg-white shadow-sm rounded-2xl">
            <CardContent className="p-10">
              <Tabs defaultValue="profile" className="w-full">
                <div className="border-b border-gray-300 mb-10">
                  <TabsList className="space-x-12 border-0">
                    <TabsTrigger 
                      value="profile" 
                      className="relative px-0 pb-6 text-lg font-medium text-[#718EBF] data-[state=active]:text-[#1A1F36] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#4F46E5]"
                    >
                      Edit Profile
                    </TabsTrigger>
                    <TabsTrigger 
                      value="preferences" 
                      className="relative px-0 pb-6 text-lg font-medium text-[#718EBF] data-[state=active]:text-[#1A1F36] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#4F46E5]"
                    >
                      Preferences
                    </TabsTrigger>
                    <TabsTrigger 
                      value="security" 
                      className="relative px-0 pb-6 text-lg font-medium text-[#718EBF] data-[state=active]:text-[#1A1F36] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#4F46E5]"
                    >
                      Security
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="profile">
                  <div className="flex gap-12">
                    {/* Profile Image Section */}
                    <div className="flex flex-col items-center w-1/3">
                      <div className="relative">
                        <Avatar className="w-32 h-32 border border-gray-300 rounded-full">
                          <AvatarImage 
                            src="/api/placeholder/128/128" 
                            alt="Profile" 
                            className="object-cover rounded-full"
                          />
                        </Avatar>
                        <button className="absolute bottom-0 right-0 bg-black/80 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center border border-white">
                          <Pencil size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Form Section */}
                    <form className="grid grid-cols-2 gap-x-12 gap-y-8 flex-1">
                      {formFields.map((field, index) => (
                        <div key={index}>
                          <label className="block text-[15px] text-[#1A1F36] mb-3">
                            {field.label}
                          </label>
                          <div className="relative">
                            <Input 
                              defaultValue={field.defaultValue}
                              type={field.type}
                              className={`border-[#E5E7EB] rounded-xl h-14 px-4 ${field.hasDropdown ? 'pr-10' : ''} focus:border-[#4F46E5]`} 
                            />
                            {field.hasDropdown && (
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#718EBF]" size={20} />
                            )}
                          </div>
                        </div>
                      ))}

                      <div className="col-span-2 flex justify-end mt-4">
                        <Button className="bg-[#1A1F36] hover:bg-[#1A1F36]/90 text-white h-14 px-12 rounded-2xl">
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
