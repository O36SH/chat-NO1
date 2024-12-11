import React from 'react';
import { UserGroupIcon, TagIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../contexts/SettingsContext';
import { formatRoomId } from '../utils/roomGenerator';
import RoomLevelDisplay from './RoomLevelDisplay';
import { cn } from '../utils/styles';

function RoomCard({ room, onJoin }) {
  const { settings } = useSettings();

  return (
    <div className={cn(
      'p-4 rounded-lg border',
      settings.darkMode
        ? 'bg-gray-700 border-gray-600'
        : 'bg-gray-50 border-gray-200',
      'hover:shadow-lg transition-shadow'
    )}>
      <div className="flex items-start space-x-4">
        <div className={cn(
          'w-16 h-16 rounded-lg flex-shrink-0',
          settings.darkMode ? 'bg-gray-600' : 'bg-gray-200',
          'flex items-center justify-center'
        )}>
          {room.image ? (
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <UserGroupIcon className={cn(
              'w-8 h-8',
              settings.darkMode ? 'text-gray-400' : 'text-gray-500'
            )} />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className={cn(
              'font-semibold',
              settings.darkMode ? 'text-white' : 'text-gray-900'
            )}>
              {room.name}
            </h4>
            <span className={cn(
              'text-sm',
              settings.darkMode ? 'text-gray-400' : 'text-gray-500'
            )}>
              {formatRoomId(room.id)}
            </span>
          </div>

          <RoomLevelDisplay room={room} size="sm" />
          
          <p className={cn(
            'text-sm mt-2',
            settings.darkMode ? 'text-gray-300' : 'text-gray-600'
          )}>
            {room.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {room.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  'inline-flex items-center px-2 py-1 rounded-full text-xs',
                  settings.darkMode
                    ? 'bg-gray-600 text-gray-300'
                    : 'bg-gray-200 text-gray-700'
                )}
              >
                <TagIcon className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <UserGroupIcon className={cn(
                'w-4 h-4',
                settings.darkMode ? 'text-gray-400' : 'text-gray-500'
              )} />
              <span className={cn(
                'text-sm mr-1',
                settings.darkMode ? 'text-gray-400' : 'text-gray-500'
              )}>
                {room.members}
              </span>
            </div>
            <button
              onClick={() => onJoin(room.id)}
              className={cn(
                'px-4 py-2 rounded-lg',
                settings.darkMode
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-500 hover:bg-blue-600',
                'text-white text-sm'
              )}
            >
              انضمام
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;