import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { ShoppingBagIcon, GiftIcon } from '@heroicons/react/24/outline';
import StoreModal from './StoreModal';
import EventsModal from './EventsModal';

function StoreSection() {
  const { settings } = useSettings();
  const [showStore, setShowStore] = useState(false);
  const [showEvents, setShowEvents] = useState(false);

  return (
    <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-4 mt-4`}>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setShowStore(true)}
          className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${
            settings.darkMode
              ? 'bg-gray-700 hover:bg-gray-600'
              : 'bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <ShoppingBagIcon className="h-8 w-8 text-blue-500 mb-2" />
          <span className={`text-sm font-medium ${
            settings.darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            المتجر
          </span>
        </button>

        <button
          onClick={() => setShowEvents(true)}
          className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${
            settings.darkMode
              ? 'bg-gray-700 hover:bg-gray-600'
              : 'bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <GiftIcon className="h-8 w-8 text-purple-500 mb-2" />
          <span className={`text-sm font-medium ${
            settings.darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            الأحداث
          </span>
        </button>
      </div>

      {showStore && <StoreModal onClose={() => setShowStore(false)} />}
      {showEvents && <EventsModal onClose={() => setShowEvents(false)} />}
    </div>
  );
}

export default StoreSection;