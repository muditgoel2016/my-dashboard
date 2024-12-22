import { Search, Bell, Settings } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/shared/common/avatar';
import { Button } from '@/app/components/shared/common/button';
import { Input } from '@/app/components/shared/common/input';

const TopBar = ({ title = 'Overview' }) => {
  return (
    <header className='bg-white border-b border-gray-200'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-24'> 
          {/* Left Section: Title */}
          <div className='text-[#343c6a] text-2xl font-semibold'>{title}</div>

          {/* Right Section */}
          <div className='flex items-center gap-7'>
            {/* Search Bar */}
            <div className='relative flex-1 max-w-md'>
              <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8BA3CB] w-6 h-6' />
              <Input
                placeholder='Search for something'
                className='pl-12 pr-4 h-12 rounded-full bg-[#f6f7fa] text-sm text-gray-700 border-0 focus:ring-2 focus:ring-[#4F46E5] placeholder:text-[#8BA3CB]' />
            </div>

            {/* Settings Icon */}
            <Button
              variant='ghost'
              size='icon'
              className='w-12 h-12 bg-[#f6f7fa] rounded-full flex items-center justify-center hover:bg-gray-200'>
              <Settings className='w-6 h-6 text-[#718ebf]' style={{ width: '1.56rem', height: '1.56rem', flexShrink: 1 }} />
            </Button>

            {/* Bell Icon */}
            <Button
              variant='ghost'
              size='icon'
              className='w-12 h-12 bg-[#f6f7fa] rounded-full flex items-center justify-center hover:bg-gray-200' >
              <Bell className='w-6 h-6 text-[#396AFF]' style={{ width: '1.56rem', height: '1.56rem', flexShrink: 1 }} />
            </Button>

            {/* Avatar */}
            <Avatar className='w-[3.75rem] h-[3.75rem]'>
              <AvatarImage src='https://picsum.photos/id/64/128/128' alt='User avatar' />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
