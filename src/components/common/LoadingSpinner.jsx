import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';

function LoadingSpinner({ size = 'md' }) {
  const { settings } = useSettings();
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 ${
        settings.darkMode
          ? 'border-gray-600 border-t-blue-500'
          : 'border-gray-200 border-t-blue-600'
      }`}></div>
    </div>
  );
}

export default LoadingSpinner;