// app/settings/DesktopSettings.tsx
import Sidenav from '@/components/layout/side-nav'
import TopBar from '@/components/layout/top-bar'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DesktopSettings() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidenav />
      <div className="ml-64 flex-1">
        <TopBar />
        <main className="p-8">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <Tabs defaultValue="profile">
                <TabsList>
                  <TabsTrigger value="profile">Edit Profile</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex justify-center mb-8">
                <div className="relative">
                  <img 
                    src="/api/placeholder/96/96" 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full"
                  />
                  <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full">
                    ✏️
                  </button>
                </div>
              </div>

              <form className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Your Name</label>
                  <Input placeholder="Charlene Reed" className="mt-1" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">User Name</label>
                  <Input placeholder="Charlene Reed" className="mt-1" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input type="email" placeholder="charlenereed@gmail.com" className="mt-1" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <Input type="password" placeholder="********" className="mt-1" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                  <Input placeholder="25 January 1990" className="mt-1" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Present Address</label>
                  <Input placeholder="San Jose, California, USA" className="mt-1" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Permanent Address</label>
                  <Input placeholder="San Jose, California, USA" className="mt-1" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <Input placeholder="San Jose" className="mt-1" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Postal Code</label>
                  <Input placeholder="45962" className="mt-1" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Country</label>
                  <Input placeholder="USA" className="mt-1" />
                </div>

                <div className="col-span-2">
                  <Button className="w-full">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}