import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

function AddFriendModal({ onClose }) {
  const { settings } = useSettings();
  const [friendId, setFriendId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!friendId.match(/^\d{8}$/)) {
      setError('يجب أن يتكون معرف المستخدم من 8 أرقام');
      return;
    }
    // Here you would typically make an API call to add the friend
    console.log('Adding friend with ID:', friendId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`relative w-full max-w-md mx-4 rounded-lg shadow-xl ${
        settings.darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-4 left-4 p-2 rounded-full ${
            settings.darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="p-6">
          <h3 className={`text-xl font-bold mb-6 ${
            settings.darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            إضافة صديق
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="friendId"
                className={`block text-sm font-medium mb-2 ${
                  settings.darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                معرف المستخدم
              </label>
              <input
                type="text"
                id="friendId"
                value={friendId}
                onChange={(e) => {
                  setFriendId(e.target.value);
                  setError('');
                }}
                placeholder="أدخل معرف المستخدم (8 أرقام)"
                className={`w-full px-4 py-2 rounded-lg border ${
                  settings.darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500`}
              />
              {error && (
                <p className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 rounded-lg ${
                  settings.darkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                إلغاء
              </button>
              <button
                type="submit"
                className={`px-4 py-2 rounded-lg ${
                  settings.darkMode
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                إضافة
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddFriendModal;