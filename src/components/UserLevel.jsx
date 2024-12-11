import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { 
  StarIcon, 
  SparklesIcon, 
  FireIcon, 
  SunIcon, 
  MoonIcon 
} from '@heroicons/react/24/solid';
import UserAvatar from './UserAvatar';

function UserLevel({ user }) {
  const { settings } = useSettings();
  const level = 5; // This would come from the user's data
  const currentXP = 750; // Current XP
  const nextLevelXP = 1000; // XP needed for next level
  const progress = (currentXP / nextLevelXP) * 100;

  const getLevelIcon = (level) => {
    if (level < 5) return StarIcon;
    if (level < 10) return SparklesIcon;
    if (level < 15) return FireIcon;
    if (level < 20) return SunIcon;
    return MoonIcon;
  };

  const getLevelColor = (level) => {
    if (level < 5) return 'text-yellow-400';
    if (level < 10) return 'text-blue-400';
    if (level < 15) return 'text-red-400';
    if (level < 20) return 'text-orange-400';
    return 'text-purple-400';
  };

  const LevelIcon = getLevelIcon(level);
  const levelColor = getLevelColor(level);

  return (
    <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <UserAvatar user={user} size="lg" />
          <div className="flex items-center mr-4">
            <span className={`text-xl font-bold ${levelColor} ml-2`}>
              {level}
            </span>
            <LevelIcon className={`w-6 h-6 ${levelColor} ml-2`} />
            <h3 className={`text-lg font-bold ${
              settings.darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {user.name}
            </h3>
          </div>
        </div>
        <div className={`text-sm ${
          settings.darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {currentXP} / {nextLevelXP} XP
        </div>
      </div>

      <div className="relative pt-1">
        <div className={`overflow-hidden h-2 text-xs flex rounded-full ${
          settings.darkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          <div
            style={{ width: `${progress}%` }}
            className={`animate-pulse shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-${levelColor.split('-')[1]}-500 to-${levelColor.split('-')[1]}-600`}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className={`text-xs font-semibold ${
            settings.darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            المستوى {level}
          </span>
          <span className={`text-xs font-semibold ${
            settings.darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            المستوى {level + 1}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserLevel;