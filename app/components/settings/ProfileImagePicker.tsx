import { Pencil } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Reset preview when imageData changes
  useEffect(() => {
    setPreviewUrl(null);
  }, [imageData]);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      // Clean up previous preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      // Create new preview URL
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
    } else {
      setPreviewUrl(null);
    }
    onImageChange?.(file);
  };

  // Use preview URL if available, otherwise fall back to imageData default
  const displayUrl = previewUrl || imageData?.defaultValue;

  return (
    <div className='flex flex-col items-center w-48'>
      <div className='relative'>
        <Avatar className='w-24 h-24 border border-gray-200 rounded-full'>
          <AvatarImage 
            src={displayUrl}
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