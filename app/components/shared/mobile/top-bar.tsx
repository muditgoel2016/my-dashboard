'use client'

import { Menu, Search } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/shared/common/avatar'
import { Button } from '@/app/components/shared/common/button'
import { Input } from '@/app/components/shared/common/input'

import type { TopBarProps } from '../sharedInterfaces'

const TopBar = ({ 
  onMenuClick, 
  title = 'Overview',
  userName = 'User'
}: TopBarProps) => {
  return (
    <header className='bg-white border-b px-6 py-4'>
      <div className='flex items-center justify-between'>
        {/* Left section: Hamburger menu */}
        <div className='flex-none'>
          <Button
            variant='ghost'
            size='icon'
            onClick={onMenuClick}
            aria-label='Toggle navigation menu'>
            <Menu 
              className='h-6 w-6 text-gray-700' 
              aria-hidden='true'/>
          </Button>
        </div>

        {/* Middle section: Title */}
        <div className='flex-1 text-center'>
          <h1 className='text-lg font-semibold text-[#343c6a]'>
            {title}
          </h1>
        </div>

        {/* Right section: Avatar */}
        <div className='flex-none'>
          <Avatar 
            className='w-9 h-9'
            aria-label={`${userName}'s profile`}>
            <AvatarImage 
              src='https://picsum.photos/id/64/96/96' 
              alt={`${userName}'s avatar`}/>
            <AvatarFallback aria-label={`${userName}'s initials`}>
              {userName[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Search bar */}
      <div className='mt-4'>
        <div className='relative bg-[#F6F7FA] rounded-full'>
          <label htmlFor='search-input' className='sr-only'>
            Search
          </label>
          <Search 
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 text-[#8BA3CB]' 
            aria-hidden='true'/>
          <Input
            id='search-input'
            type='search'
            placeholder='Search for something'
            className='pl-12 pr-4 py-2.5 bg-transparent rounded-full text-sm text-gray-700 focus:ring-0 focus:outline-none border-0 placeholder:text-[#8BA3CB]'/>
        </div>
      </div>
    </header>
  )
}

export default TopBar