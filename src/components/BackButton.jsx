import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../contexts/SettingsContext';

function BackButton() {
  const navigate = useNavigate();
  const { settings } = useSettings();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`p-2 rounded-full ${
        settings.darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-800'
      }`}
    >
      <ChevronLeftIcon className="h-6 w-6" />
    </button>
  );
}

export default BackButton;