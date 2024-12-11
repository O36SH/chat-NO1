import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import BackButton from './BackButton';

function PageHeader({ title, rightContent }) {
  const { settings } = useSettings();

  return (
    <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <BackButton />
            <h1 className={`text-xl font-bold mr-4 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
              {title}
            </h1>
          </div>
          {rightContent}
        </div>
      </div>
    </div>
  );
}

export default PageHeader;