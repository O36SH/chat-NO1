import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

function PointsDisplay({ points }) {
  const { settings } = useSettings();

  return (
    <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-4 mt-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CurrencyDollarIcon className="h-6 w-6 text-yellow-500" />
          <span className={`text-lg font-bold ${
            settings.darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            النقاط
          </span>
        </div>
        <span className="text-2xl font-bold text-yellow-500">
          {points.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default PointsDisplay;