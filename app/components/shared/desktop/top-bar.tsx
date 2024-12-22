import { Search, Bell, Settings } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/shared/common/avatar';
import { Button } from '@/app/components/shared/common/button';
import { Input } from '@/app/components/shared/common/input';

const TopBar = ({ title = 'Overview' }) => {
  return (
    <header className='bg-white border-b border-gray-200'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          {/* Left Section: Title */}
          <div className='text-[#1A1F36] text-xl font-semibold'>{title}</div>

          {/* Right Section */}
          <div className='flex items-center gap-4'>
            {/* Search Bar */}
            <div className='relative flex-1 max-w-md'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <Input
                placeholder='Search for something'
                className='pl-10 pr-4 h-10 rounded-full bg-[#f6f7fa] text-sm text-gray-700 border-0 focus:ring-2 focus:ring-[#4F46E5]'/>
            </div>

            {/* Settings Icon */}
            <Button
              variant='ghost'
              size='icon'
              className='w-10 h-10 bg-[#f6f7fa] rounded-full flex items-center justify-center hover:bg-gray-200'>
              <Settings className='w-5 h-5 text-gray-600' />
            </Button>

            {/* Bell Icon */}
            <Button
              variant='ghost'
              size='icon'
              className='w-10 h-10 bg-[#f6f7fa] rounded-full flex items-center justify-center hover:bg-gray-200'>
              <Bell className='w-5 h-5 text-gray-600' />
            </Button>

            {/* Avatar */}
            <Avatar className='w-14 h-14'>
              <AvatarImage src='https://picsum.photos/id/64/96/96' alt='User avatar' />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
