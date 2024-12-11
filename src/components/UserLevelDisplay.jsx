import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { 
  StarIcon, 
  SparklesIcon, 
  FireIcon, 
  SunIcon, 
  MoonIcon 
} from '@heroicons/react/24/solid';

function UserLevelDisplay({ level, size = 'sm' }) {
  const { settings } = useSettings();

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
  const sizeClasses = {
    sm: 'text-sm h-4 w-4',
    md: 'text-base h-5 w-5',
    lg: 'text-lg h-6 w-6'
  };

  return (
    <div className="flex items-center space-x-1">
      <span className={`font-bold ${levelColor} ${sizeClasses[size].split(' ')[0]}`}>
        {level}
      </span>
      <LevelIcon className={`${levelColor} ${sizeClasses[size].split(' ').slice(1).join(' ')}`} />
    </div>
  );
}

export default UserLevelDisplay;