// components/layout/mobile/top-bar.tsx
'use client'
import { Menu, Search, Bell } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
  return (
    <div className="bg-white border-b px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side: Menu and Logo */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <span className="font-semibold">Overview</span>
        </div>

        {/* Right side: Avatar */}
        <Avatar>
          <AvatarImage src="/placeholder.png" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>

      {/* Search bar - Below header */}
      <div className="mt-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search for something" 
            className="pl-10"
          />
        </div>
      </div>
    </div>
  )
}

export default TopBar;