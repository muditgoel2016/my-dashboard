import React from 'react';
import Sidenav from '@/components/layout/side-nav';
import TopBar from '@/components/layout/top-bar';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Pencil, ChevronDown } from "lucide-react";

export default function DesktopSettings() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidenav />
      <div className="ml-64 flex-1">
        <TopBar />
        <main className="p-8">
          <Card className="max-w-4xl mx-auto bg-white shadow-sm rounded-2xl">
            <CardContent className="p-8">
              <Tabs defaultValue="profile" className="w-full">
                <div className="border-b mb-8">
                  <TabsList className="space-x-8 border-0">
                    <TabsTrigger 
                      value="profile" 
                      className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4"
                    >
                      Edit Profile
                    </TabsTrigger>
                    <TabsTrigger 
                      value="preferences" 
                      className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 text-gray-500"
                    >
                      Preferences
                    </TabsTrigger>
                    <TabsTrigger 
                      value="security" 
                      className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 text-gray-500"
                    >
                      Security
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="profile">
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <Avatar className="w-24 h-24">
                        <AvatarImage 
                          src="/api/placeholder/96/96" 
                          alt="Profile" 
                          className="object-cover"
                        />
                      </Avatar>
                      <button className="absolute bottom-0 right-0 bg-gray-900 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
                        <Pencil size={16} />
                      </button>
                    </div>
                  </div>

                  <form className="grid grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <Input 
                        defaultValue="Charlene Reed"
                        className="bg-gray-50 border-gray-200 rounded-xl h-12" 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        User Name
                      </label>
                      <Input 
                        defaultValue="Charlene Reed"
                        className="bg-gray-50 border-gray-200 rounded-xl h-12" 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input 
                        type="email"
                        defaultValue="charlenereed@gmail.com"
                        className="bg-gray-50 border-gray-200 rounded-xl h-12" 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <Input 
                        type="password"
                        defaultValue="********"
                        className="bg-gray-50 border-gray-200 rounded-xl h-12" 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <Input 
                          defaultValue="25 January 1990"
                          className="bg-gray-50 border-gray-200 rounded-xl h-12 pr-10" 
                        />
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Present Address
                      </label>
                      <Input 
                        defaultValue="San Jose, California, USA"
                        className="bg-gray-50 border-gray-200 rounded-xl h-12" 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Permanent Address
                      </label>
                      <Input 
                        defaultValue="San Jose, California, USA"
                        className="bg-gray-50 border-gray-200 rounded-xl h-12" 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <Input 
                        defaultValue="San Jose"
                        className="bg-gray-50 border-gray-200 rounded-xl h-12" 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code
                      </label>
                      <Input 
                        defaultValue="45962"
                        className="bg-gray-50 border-gray-200 rounded-xl h-12" 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <Input 
                        defaultValue="USA"
                        className="bg-gray-50 border-gray-200 rounded-xl h-12" 
                      />
                    </div>

                    <div className="col-span-2 mt-4">
                      <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 rounded-xl">
                        Save
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}