import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { XMarkIcon, CalendarIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { formatRoomId } from '../utils/roomGenerator';
import UserAvatar from './UserAvatar';

function RoomInfo({ room, onClose }) {
  const { settings } = useSettings();
  const [isJoined, setIsJoined] = React.useState(false);

  const handleJoinRoom = () => {
    setIsJoined(true);
    // Here you would typically make an API call to join the room
  };

  const handleLeaveRoom = () => {
    setIsJoined(false);
    // Here you would typically make an API call to leave the room
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
          <div className="flex flex-col items-center">
            <div className={`w-24 h-24 rounded-lg overflow-hidden ${
              settings.darkMode ? 'bg-gray-700' : 'bg-gray-200'
            } flex items-center justify-center mb-4`}>
              {room.image ? (
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircleIcon className={`w-16 h-16 ${
                  settings.darkMode ? 'text-gray-600' : 'text-gray-400'
                }`} />
              )}
            </div>
            <h3 className={`text-xl font-bold ${
              settings.darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {room.name}
            </h3>
            <p className={`text-sm ${
              settings.darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {formatRoomId(room.id)}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <h4 className={`text-sm font-medium mb-2 ${
                settings.darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                وصف الغرفة
              </h4>
              <p className={`text-sm ${
                settings.darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {room.description}
              </p>
            </div>

            <div>
              <h4 className={`text-sm font-medium mb-2 ${
                settings.darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                مالك الغرفة
              </h4>
              <div className="flex items-center space-x-3">
                <UserAvatar user={room.owner} />
                <div>
                  <p className={`font-medium ${
                    settings.darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {room.owner.name}
                  </p>
                  <p className={`text-sm ${
                    room.owner.isOnline ? 'text-green-500' : 'text-gray-500'
                  }`}>
                    {room.owner.isOnline ? 'متصل' : 'غير متصل'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <CalendarIcon className={`w-5 h-5 ${
                settings.darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <span className={`text-sm ${
                settings.darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                تم الإنشاء في {new Date(room.createdAt).toLocaleDateString('ar-SA')}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center text-sm ${
                room.isActive ? 'text-green-500' : 'text-gray-500'
              }`}>
                <span className={`w-2 h-2 rounded-full mr-1 ${
                  room.isActive ? 'bg-green-500' : 'bg-gray-500'
                }`}></span>
                {room.isActive ? 'نشط' : 'غير نشط'}
              </span>
              <span className={`mx-2 text-sm ${
                settings.darkMode ? 'text-gray-600' : 'text-gray-300'
              }`}>•</span>
              <span className={`text-sm ${
                settings.darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {room.members} عضو
              </span>
            </div>

            <div className="mt-6 flex justify-center">
              {!isJoined ? (
                <button
                  onClick={handleJoinRoom}
                  className={`w-full py-2 px-4 rounded-lg ${
                    settings.darkMode
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white font-medium transition-colors`}
                >
                  انضم إلى الغرفة
                </button>
              ) : (
                <button
                  onClick={handleLeaveRoom}
                  className={`w-full py-2 px-4 rounded-lg ${
                    settings.darkMode
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-red-500 hover:bg-red-600'
                  } text-white font-medium transition-colors`}
                >
                  مغادرة الغرفة
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomInfo;