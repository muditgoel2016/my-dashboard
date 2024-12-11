import React from 'react';
import Sidenav from '@/components/layout/side-nav';
import TopBar from '@/components/layout/top-bar';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
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

export default function DesktopSettings() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      <Sidenav />
      <div className="ml-64 flex-1">
        <TopBar />
        <main className="p-8">
          <section id="settings" className="p-6">
            <div className="max-w-[1000px] mx-auto">
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                {/* Tabs */}
                <div className="border-b border-gray-200 mb-8">
                  <div className="flex space-x-12">
                    <button className="relative px-0 pb-6 text-lg font-medium text-gray-900 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#4F46E5]">
                      Edit Profile
                    </button>
                    <button className="relative px-0 pb-6 text-lg font-medium text-gray-400 hover:text-gray-600">
                      Preferences
                    </button>
                    <button className="relative px-0 pb-6 text-lg font-medium text-gray-400 hover:text-gray-600">
                      Security
                    </button>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="flex gap-12">
                  {/* Profile Image Section */}
                  <div className="flex flex-col items-center w-1/3">
                    <div className="relative">
                      <Avatar className="w-32 h-32 border border-gray-200 rounded-full overflow-hidden">
                        <img 
                          src="https://avatar.iran.liara.run/public" 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      </Avatar>
                      <button className="absolute bottom-0 right-0 bg-gray-900/80 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center border border-white">
                        <Pencil size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Form Section */}
                  <form className="grid grid-cols-2 gap-x-12 gap-y-8 flex-1">
                    {formFields.map((field, index) => (
                      <div key={index}>
                        <label className="block text-[15px] text-gray-900 mb-3">
                          {field.label}
                        </label>
                        <div className="relative">
                          <Input 
                            defaultValue={field.defaultValue}
                            type={field.type}
                            className={`w-full border border-gray-200 rounded-xl h-14 px-4 ${field.hasDropdown ? 'pr-10' : ''} focus:border-[#4F46E5] focus:outline-none`} 
                          />
                          {field.hasDropdown && (
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          )}
                        </div>
                      </div>
                    ))}

                    <div className="col-span-2 flex justify-end mt-4">
                      <Button className="bg-gray-900 hover:bg-gray-800 text-white h-14 px-12 rounded-2xl">
                        Save
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
