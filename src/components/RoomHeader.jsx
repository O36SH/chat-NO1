import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { formatRoomId } from '../utils/roomGenerator';

function RoomHeader({ room }) {
  const { settings } = useSettings();

  return (
    <div className={`p-4 border-b ${
      settings.darkMode ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-lg overflow-hidden ${
          settings.darkMode ? 'bg-gray-700' : 'bg-gray-200'
        } flex items-center justify-center`}>
          {room.image ? (
            <img 
              src={room.image} 
              alt={room.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <UserGroupIcon className={`w-8 h-8 ${
              settings.darkMode ? 'text-gray-500' : 'text-gray-400'
            }`} />
          )}
        </div>
        <div className="flex-1">
          <h2 className={`font-semibold ${
            settings.darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {room.name}
          </h2>
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${
              settings.darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {formatRoomId(room.id)}
            </span>
            <span className="text-sm text-gray-400">•</span>
            <span className={`text-sm flex items-center ${
              room.isActive ? 'text-green-500' : 'text-gray-500'
            }`}>
              <span className={`w-2 h-2 rounded-full mr-1 ${
                room.isActive ? 'bg-green-500' : 'bg-gray-500'
              }`}></span>
              {room.isActive ? 'نشط' : 'غير نشط'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomHeader;