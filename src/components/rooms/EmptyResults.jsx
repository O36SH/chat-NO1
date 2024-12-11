import React from 'react';
import { HashtagIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../../contexts/SettingsContext';

function EmptyResults() {
  const { settings } = useSettings();

  return (
    <div className={`text-center py-12 ${
      settings.darkMode ? 'text-gray-400' : 'text-gray-500'
    }`}>
      <HashtagIcon className="w-12 h-12 mx-auto mb-4" />
      <p className="text-lg font-medium">لم يتم العثور على غرف</p>
      <p className="mt-1">جرب البحث بكلمات مختلفة</p>
    </div>
  );
}

export default EmptyResults;