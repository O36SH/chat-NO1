import React, { useRef, useEffect } from 'react';
import { UserCircleIcon, ChatBubbleLeftRightIcon, UserPlusIcon, NoSymbolIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../contexts/SettingsContext';
import { formatUserId } from '../utils/idGenerator';

function UserProfilePreview({ user, onClose, onChat }) {
  const { settings } = useSettings();
  const previewRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (previewRef.current && !previewRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleAction = (action) => {
    switch (action) {
      case 'chat':
        onChat();
        onClose();
        break;
      case 'friend':
        // Handle friend request
        break;
      case 'block':
        // Handle block user
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={previewRef}
        className={`relative w-full max-w-sm mx-4 rounded-lg shadow-xl ${
          settings.darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-2 left-2 p-2 rounded-full ${
            settings.darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="p-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircleIcon className={`w-24 h-24 ${
                  settings.darkMode ? 'text-gray-600' : 'text-gray-400'
                }`} />
              )}
            </div>
            <h3 className={`text-xl font-bold ${
              settings.darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {user.name}
            </h3>
            <p className={`text-sm ${
              settings.darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {formatUserId(user.id)}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <button
              onClick={() => handleAction('chat')}
              className={`flex flex-col items-center p-3 rounded-lg ${
                settings.darkMode
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <ChatBubbleLeftRightIcon className="w-6 h-6 mb-1" />
              <span className="text-sm">محادثة</span>
            </button>
            <button
              onClick={() => handleAction('friend')}
              className={`flex flex-col items-center p-3 rounded-lg ${
                settings.darkMode
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <UserPlusIcon className="w-6 h-6 mb-1" />
              <span className="text-sm">إضافة صديق</span>
            </button>
            <button
              onClick={() => handleAction('block')}
              className={`flex flex-col items-center p-3 rounded-lg ${
                settings.darkMode
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <NoSymbolIcon className="w-6 h-6 mb-1" />
              <span className="text-sm">حظر</span>
            </button>
          </div>

          {user.bio && (
            <div className="mt-6">
              <p className={`text-sm ${
                settings.darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {user.bio}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfilePreview;