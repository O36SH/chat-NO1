import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import UserAvatar from './UserAvatar';

function RoomMembersList({ isOpen, onClose, members }) {
  const { settings } = useSettings();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`relative w-full max-w-md mx-4 rounded-lg shadow-xl ${
        settings.darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className={`text-lg font-semibold ${
            settings.darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            أعضاء الغرفة
          </h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${
              settings.darkMode 
                ? 'hover:bg-gray-700 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            {members.map((member) => (
              <div
                key={member.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  settings.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <UserAvatar user={member} />
                  <div>
                    <h4 className={`font-medium ${
                      settings.darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {member.name}
                    </h4>
                    <p className={`text-sm ${
                      member.isOnline 
                        ? 'text-green-500' 
                        : settings.darkMode 
                        ? 'text-gray-400' 
                        : 'text-gray-500'
                    }`}>
                      {member.isOnline ? 'متصل' : 'غير متصل'}
                    </p>
                  </div>
                </div>
                {member.role && (
                  <span className={`text-sm px-2 py-1 rounded ${
                    member.role === 'admin' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {member.role === 'admin' ? 'مشرف' : 'عضو'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomMembersList;