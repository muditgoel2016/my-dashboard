'use client'
import { useState } from 'react'
import TopBar from '@/components/layout/mobile/top-bar'
import MobileNav from '@/components/layout/mobile/nav'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Settings() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />
      <main className="px-4 py-6 pb-24">
        {/* Profile Settings */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-200 relative">
              <img 
                src="/placeholder.png" 
                alt="Profile" 
                className="rounded-full"
              />
              <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full">
                ✏️
              </button>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Your Name</label>
              <Input 
                type="text"
                placeholder="Charlene Reed"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input 
                type="email"
                placeholder="charlenereed@gmail.com"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input 
                type="password"
                placeholder="********"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Date of Birth</label>
              <Input 
                type="text"
                placeholder="25 January 1990"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Present Address</label>
              <Input 
                type="text"
                placeholder="San Jose, California, USA"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Permanent Address</label>
              <Input 
                type="text"
                placeholder="San Jose, California, USA"
                className="mt-1"
              />
            </div>

            <Button className="w-full">
              Save Changes
            </Button>
          </form>
        </div>
      </main>
      <MobileNav />
    </div>
  )
}