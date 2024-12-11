import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { formatMessageTime } from '../utils/messageGenerator';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import UserAvatar from './UserAvatar';
import UserLink from './UserLink';
import { cn } from '../utils/styles';

function ChatMessage({ message, isOwnMessage, user }) {
  const { settings } = useSettings();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const renderContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <img 
            src={message.content} 
            alt="Shared" 
            className="max-w-sm rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => window.open(message.content, '_blank')}
          />
        );
      case 'audio':
        return (
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePlayPause}
              className={cn(
                'p-2 rounded-full',
                settings.darkMode ? 'bg-gray-600' : 'bg-gray-200',
                'hover:opacity-80 transition-opacity'
              )}
            >
              {isPlaying ? (
                <PauseIcon className="h-5 w-5 text-gray-100" />
              ) : (
                <PlayIcon className="h-5 w-5 text-gray-100" />
              )}
            </button>
            <audio
              ref={audioRef}
              src={message.content}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
            <div className={cn(
              'text-sm',
              settings.darkMode ? 'text-gray-300' : 'text-gray-600'
            )}>
              رسالة صوتية
            </div>
          </div>
        );
      default:
        return <p className="text-sm">{message.content}</p>;
    }
  };

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} items-start max-w-[70%]`}>
        <div className={`${isOwnMessage ? 'mr-2' : 'ml-2'} flex-shrink-0`}>
          <UserAvatar user={isOwnMessage ? { id: message.senderId } : user} size="sm" showPreview={!isOwnMessage} />
        </div>
        <div className="flex flex-col">
          <div className={`flex items-center ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} mb-1`}>
            {isOwnMessage ? (
              <span className={cn(
                'text-xs',
                settings.darkMode ? 'text-gray-400' : 'text-gray-600'
              )}>
                أنت
              </span>
            ) : (
              <UserLink
                userId={user.id}
                name={user.name}
                className={cn(
                  'text-xs',
                  settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                )}
              />
            )}
          </div>
          <div className={cn(
            'rounded-lg px-4 py-2',
            isOwnMessage
              ? 'bg-blue-600 text-white'
              : settings.darkMode
              ? 'bg-gray-700 text-white'
              : 'bg-gray-100 text-gray-900'
          )}>
            {renderContent()}
            <span className={cn(
              'text-xs block text-left mt-1',
              isOwnMessage 
                ? 'text-blue-100' 
                : settings.darkMode 
                ? 'text-gray-400' 
                : 'text-gray-500'
            )}>
              {formatMessageTime(message.timestamp)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;