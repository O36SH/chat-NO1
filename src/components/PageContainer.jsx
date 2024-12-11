import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

function PageContainer({ children }) {
  const { settings } = useSettings();

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {children}
    </div>
  );
}

export default PageContainer;