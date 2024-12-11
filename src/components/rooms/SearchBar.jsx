import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../../contexts/SettingsContext';

function SearchBar({ value, onChange }) {
  const { settings } = useSettings();

  return (
    <div className="relative mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ابحث عن غرفة..."
        className={`w-full px-4 py-3 pr-12 rounded-lg border ${
          settings.darkMode
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
        } focus:ring-2 focus:ring-blue-500`}
      />
      <MagnifyingGlassIcon className={`absolute left-4 top-3.5 h-5 w-5 ${
        settings.darkMode ? 'text-gray-400' : 'text-gray-500'
      }`} />
    </div>
  );
}

export default SearchBar;