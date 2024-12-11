import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { FaceSmileIcon, PhotoIcon } from '@heroicons/react/24/outline';

function StatusUpdate({ currentStatus, onUpdateStatus }) {
  const { settings } = useSettings();
  const [status, setStatus] = useState(currentStatus || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(status);
    setIsEditing(false);
  };

  return (
    <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4`}>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="ما الذي يدور في ذهنك؟"
            className={`w-full p-3 rounded-lg resize-none border ${
              settings.darkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            rows="3"
            maxLength={280}
          />
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <button
                type="button"
                className={`p-2 rounded-full ${
                  settings.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <FaceSmileIcon className="h-6 w-6 text-gray-500" />
              </button>
              <button
                type="button"
                className={`p-2 rounded-full ${
                  settings.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <PhotoIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className={`px-4 py-2 rounded-md ${
                  settings.darkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                تحديث
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-500 text-left">
            {280 - status.length} حرف متبقي
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {currentStatus ? (
            <p className={`${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentStatus}
            </p>
          ) : (
            <p className="text-gray-500">لا يوجد حالة...</p>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className={`text-sm ${
              settings.darkMode ? 'text-blue-400' : 'text-blue-600'
            } hover:underline`}
          >
            {currentStatus ? 'تحديث الحالة' : 'إضافة حالة'}
          </button>
        </div>
      )}
    </div>
  );
}

export default StatusUpdate;