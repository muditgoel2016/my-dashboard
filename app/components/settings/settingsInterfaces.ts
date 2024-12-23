export interface ProfileImage {
  type: 'image';
  defaultValue: string;
  label: string;
}

export interface ProfileImagePickerProps {
  imageData?: ProfileImage;
  onImageChange?: (file: File | null) => void;
}
