import React, { useRef } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

function ImageUpload({ 
  currentImage, 
  onImageChange, 
  onImageRemove,
  size = 'md',
  shape = 'square',
  className = '' 
}) {
  const { settings } = useSettings();
  const fileInputRef = useRef(null);

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40'
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />
      
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={`${sizeClasses[size]} ${
          shape === 'round' ? 'rounded-full' : 'rounded-lg'
        } ${
          settings.darkMode ? 'bg-gray-700' : 'bg-gray-100'
        } flex items-center justify-center hover:opacity-80 transition-opacity ${className}`}
      >
        {currentImage ? (
          <img 
            src={currentImage} 
            alt="Selected" 
            className={`w-full h-full object-cover ${
              shape === 'round' ? 'rounded-full' : 'rounded-lg'
            }`}
          />
        ) : (
          <PhotoIcon className={`w-12 h-12 ${
            settings.darkMode ? 'text-gray-500' : 'text-gray-400'
          }`} />
        )}
      </button>

      {currentImage && onImageRemove && (
        <button
          type="button"
          onClick={onImageRemove}
          className="absolute -top-1 -right-1 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default ImageUpload;