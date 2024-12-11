import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

function ContentCard({ children, className = '' }) {
  const { settings } = useSettings();

  return (
    <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export default ContentCard;