import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../../contexts/SettingsContext';

function NotificationToast({ notification, onClose }) {
  const { settings } = useSettings();

  return (
    <div className={`fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
      settings.darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className={`font-medium ${
            settings.darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {notification.title}
          </h4>
          <p className={`text-sm mt-1 ${
            settings.darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {notification.message}
          </p>
        </div>
        <button
          onClick={onClose}
          className={`p-1 rounded-full ${
            settings.darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default NotificationToast;