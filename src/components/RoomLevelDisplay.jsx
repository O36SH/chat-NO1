import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { getRoomLevel, getRequiredRoomXP } from '../utils/roomLevels';
import { cn } from '../utils/styles';

function RoomLevelDisplay({ room, size = 'md' }) {
  const { settings } = useSettings();
  const roomStats = getRoomLevel(room.xp);
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={cn(
      'flex flex-col',
      settings.darkMode ? 'text-gray-200' : 'text-gray-800'
    )}>
      <div className="flex items-center space-x-2">
        <span className={`${sizeClasses[size]} font-bold`} style={{ color: roomStats.badge.color }}>
          {roomStats.badge.icon} المستوى {roomStats.level}
        </span>
        <span className={`${sizeClasses[size]} text-gray-500`}>
          ({roomStats.badge.name})
        </span>
      </div>
      
      <div className="mt-2">
        <div className="flex justify-between text-xs mb-1">
          <span>{Math.floor(roomStats.currentXP).toLocaleString()} XP</span>
          <span>{Math.floor(roomStats.requiredXP).toLocaleString()} XP</span>
        </div>
        <div className={cn(
          'h-2 rounded-full overflow-hidden',
          settings.darkMode ? 'bg-gray-700' : 'bg-gray-200'
        )}>
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${roomStats.progress}%`,
              backgroundColor: roomStats.badge.color
            }}
          />
        </div>
      </div>

      <div className="mt-2 space-y-1">
        <div className="flex justify-between text-sm">
          <span>الحد الأقصى للأعضاء:</span>
          <span className="font-medium">
            {roomStats.memberLimit === 'unlimited' ? 'غير محدود' : roomStats.memberLimit.toLocaleString()}
          </span>
        </div>
        
        {roomStats.features.length > 0 && (
          <div className="text-sm">
            <span className="font-medium">الميزات المفعلة:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {roomStats.features.map(feature => (
                <span
                  key={feature}
                  className={cn(
                    'px-2 py-0.5 rounded-full text-xs',
                    settings.darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  )}
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomLevelDisplay;