import { Pencil } from 'lucide-react';
import React from 'react';

import { Avatar, AvatarImage } from '@/app/components/shared/common/avatar';

/**
 *
 */
export default function ProfileImagePicker() {
  return (
    <div className='flex flex-col items-center w-48'>
      <div className='relative'>
        <Avatar className='w-24 h-24 border border-gray-200 rounded-full'>
          <AvatarImage 
            src='https://picsum.photos/id/64/96/96'
            alt='Profile' 
            className='object-cover rounded-full'/>
        </Avatar>
        <button className='absolute bottom-0 right-0 bg-[#1A1F36] text-white p-1.5 rounded-full w-8 h-8 flex items-center justify-center border-2 border-white'>
          <Pencil size={16} />
        </button>
      </div>
    </div>
  );
}