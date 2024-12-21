import { Pencil } from 'lucide-react';
import React, { useRef } from 'react';

import { Avatar, AvatarImage } from '@/components/shared/common/avatar';

interface ProfileImage {
  type: 'image';
  defaultValue: string;
  label: string;
}

interface ProfileImagePickerProps {
  imageData?: ProfileImage;
  onImageChange?: (file: File | null) => void;
}

const ProfileImagePicker: React.FC<ProfileImagePickerProps> = ({
  imageData,
  onImageChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onImageChange?.(file);
  };

  return (
    <div className='flex flex-col items-center w-48'>
      <div className='relative'>
        <Avatar className='w-24 h-24 border border-gray-200 rounded-full'>
          <AvatarImage 
            src={imageData?.defaultValue}
            alt={imageData?.label || 'Profile'} 
            className='object-cover rounded-full'
          />
        </Avatar>
        <button 
          onClick={handleEditClick}
          type='button'
          className='absolute bottom-0 right-0 bg-[#1A1F36] hover:bg-[#1A1F36]/90 text-white p-1.5 rounded-full w-8 h-8 flex items-center justify-center border-2 border-white transition-colors'>
          <Pencil size={16} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload profile picture"
        />
      </div>
      {imageData?.label && (
        <span className="text-sm text-gray-500 mt-2">{imageData.label}</span>
      )}
    </div>
  );
};

export default ProfileImagePicker;