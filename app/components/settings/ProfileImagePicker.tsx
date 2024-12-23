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
  const [isDragging, setIsDragging] = useState(false);

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
    fileInputRef.current.click();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleEditClick();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0] || null;
    handleNewFile(file);
  };

  const handleNewFile = (file: File | null) => {
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
    onImageChange(file);
  };

  // Handle drag and drop
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files[0] || null;
    if (file.type.startsWith('image/')) {
      handleNewFile(file);
    }
  };

  // Use preview URL if available, otherwise fall back to imageData default
  const displayUrl = previewUrl || imageData?.defaultValue;
  const imageLabel = imageData?.label || 'Profile picture';

  return (
    <div 
      className='flex flex-col items-center w-48'
      role='region'
      aria-label='Profile image uploader'>
      <div 
        className={`relative ${isDragging ? 'ring-2 ring-blue-500' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        aria-dropeffect='copy'>
        <Avatar 
          className='w-24 h-24 border border-gray-200 rounded-full'
          role='img'
          aria-label={`Current ${imageLabel.toLowerCase()}`}>
          <AvatarImage 
            src={displayUrl}
            alt={imageLabel} 
            className='object-cover rounded-full'/>
        </Avatar>
        <button 
          onClick={handleEditClick}
          onKeyDown={handleKeyDown}
          type='button'
          aria-label={`Change ${imageLabel.toLowerCase()}`}
          className={`absolute bottom-0 right-0 bg-[#1A1F36] hover:bg-[#1A1F36]/90 
                     text-white p-1.5 rounded-full w-8 h-8 flex items-center justify-center 
                     border-2 border-white transition-colors focus:outline-none 
                     focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
          <Pencil size={16} aria-hidden='true' />
        </button>
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          className='hidden'
          aria-label={`Upload new ${imageLabel.toLowerCase()}`}
          tabIndex={-1}/>
      </div>
      {imageData?.label && (
        <span 
          className='text-sm text-gray-500 mt-2'
          id='profile-image-description'>
          {imageData?.label}
        </span>
      )}
      <div className='sr-only' aria-live='polite'>
        {previewUrl ? 'New image selected' : ''}
      </div>
      <div className='sr-only' role='status'>
        {isDragging ? 'Drop image to upload' : ''}
      </div>
    </div>
  );
};

export default ProfileImagePicker;