'use client'
import { Menu, Search } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/shared/common/avatar'
import { Button } from '@/app/components/shared/common/button'
import { Input } from '@/app/components/shared/common/input'

interface TopBarProps {
  onMenuClick: () => void;
  title?: string;
}

const TopBar = ({ onMenuClick, title = 'Overview' }: TopBarProps) => {
  return (
    <div className='bg-white border-b px-6 py-4'>
      <div className='flex items-center justify-between'>
        {/* Left side: Menu and Title */}
        <div className='flex items-center gap-4'>
          <Button 
            variant='ghost' 
            size='icon' 
            onClick={onMenuClick}>
            <Menu className='h-6 w-6 text-gray-700' />
          </Button>
          <span className='text-lg font-semibold text-gray-900'>{title}</span>
        </div>

        {/* Right side: Avatar */}
        <Avatar className='w-8 h-8'>
          <AvatarImage src='https://picsum.photos/id/64/96/96' alt='User' />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>

      {/* Search bar */}
      <div className='mt-4'>
        <div className='relative bg-[#F6F7FA] rounded-full'>
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5' />
          <Input 
            placeholder='Search for something' 
            className='pl-12 pr-4 py-2.5 bg-transparent rounded-full text-sm text-gray-700 focus:ring-0 focus:outline-none'/>
        </div>
      </div>
    </div>
  )
}

export default TopBar;
