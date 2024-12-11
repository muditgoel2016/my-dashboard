'use client'
import React, { useState } from "react";
import TopBar from "@/components/layout/mobile/top-bar";
import MobileNav from "@/components/layout/mobile/nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileImagePicker from "@/components/settings/ProfileImagePicker";
import { ChevronDown } from "lucide-react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f7fa]">
      <TopBar title="Settings" onMenuClick={() => setIsMobileMenuOpen(true)} />
      <main className="pb-24">
        <div
          className="bg-white rounded-[15px] shadow-md mx-auto mt-6"
          style={{
            width: "90%", // Flexible width to adapt to screen
            maxWidth: "325px", // Aligns with the mockup
            padding: "4%",
          }}
        >
          <Tabs defaultValue="profile" className="w-full">
            {/* Tabs Header */}
            <div className="border-b border-gray-200 mb-4">
              <TabsList className="w-full flex justify-start px-4 border-0">
                <TabsTrigger
                  value="profile"
                  className="relative px-0 pb-3 text-base font-medium text-[#718EBF] data-[state=active]:text-[#1A1F36] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-[#4F46E5]"
                >
                  Edit Profile
                </TabsTrigger>
                <TabsTrigger
                  value="preferences"
                  className="relative px-0 pb-3 ml-8 text-base font-medium text-[#718EBF]"
                >
                  Preference
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="relative px-0 pb-3 ml-8 text-base font-medium text-[#718EBF]"
                >
                  Security
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Content */}
            <TabsContent value="profile">
              <div className="flex justify-center mb-6">
                <ProfileImagePicker />
              </div>

              <form className="space-y-4">
                {formFields.map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm text-[#1A1F36] mb-2">{field.label}</label>
                    <div className="relative">
                      <Input
                        defaultValue={field.defaultValue}
                        type={field.type}
                        className="border-gray-200 rounded-lg h-11 px-3 text-sm text-[#718EBF] focus:border-[#4F46E5] focus:ring-0 w-full bg-white"
                      />
                      {field.hasDropdown && (
                        <ChevronDown
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#718EBF]"
                          size={16}
                        />
                      )}
                    </div>
                  </div>
                ))}

                <Button className="w-full bg-[#1A1F36] h-[50px] rounded-[15px] mt-6">
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
