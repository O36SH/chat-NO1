import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/outline';
import UserAvatar from './UserAvatar';
import { cn } from '../utils/styles';
import { useScrollDirection } from '../hooks/useScrollDirection';

function OpenChatsDrawer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { settings } = useSettings();
  const [isExpanded, setIsExpanded] = useState(false);
  const isVisible = useScrollDirection();
  const [openChats] = useState([
    { id: '12345', name: 'أحمد', type: 'direct', unread: 2 },
    { id: '67890', name: 'غرفة التقنية', type: 'room', unread: 0 },
    { id: '11111', name: 'محمد', type: 'direct', unread: 1 },
  ]);

  // Hide drawer in chat and room pages
  const shouldHideDrawer = location.pathname.match(/\/(chats|rooms)\/[^/]+/);
  if (shouldHideDrawer || openChats.length === 0) return null;

  const handleChatClick = (chat) => {
    const path = chat.type === 'direct' ? `/chats/${chat.id}` : `/rooms/${chat.id}`;
    navigate(path);
  };

  const handleClose = (e, chatId) => {
    e.stopPropagation();
    // Handle closing chat
    console.log('Close chat:', chatId);
  };

  return (
    <div 
      className={cn(
        'fixed left-0 right-0 z-30',
        'transform transition-all duration-300 ease-in-out',
        'border-t shadow-lg',
        settings.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
        isVisible ? 'bottom-16' : '-bottom-full'
      )}
    >
      {/* Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'flex items-center justify-between px-4 py-2 cursor-pointer',
          settings.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
        )}
      >
        <span className={cn(
          'text-sm font-medium',
          settings.darkMode ? 'text-gray-200' : 'text-gray-700'
        )}>
          المحادثات المفتوحة ({openChats.length})
        </span>
        <ChevronUpIcon className={cn(
          'w-5 h-5 transition-transform',
          settings.darkMode ? 'text-gray-400' : 'text-gray-500',
          !isExpanded && 'rotate-180'
        )} />
      </div>

      {/* Chats List */}
      <div className={cn(
        'overflow-hidden transition-[max-height] duration-300 ease-in-out',
        isExpanded ? 'max-h-64' : 'max-h-0'
      )}>
        <div className="px-2 py-1 space-y-1">
          {openChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatClick(chat)}
              className={cn(
                'flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer',
                settings.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              )}
            >
              <div className="flex items-center space-x-3">
                <UserAvatar user={chat} size="sm" />
                <div className="flex flex-col">
                  <span className={cn(
                    'font-medium',
                    settings.darkMode ? 'text-white' : 'text-gray-900'
                  )}>
                    {chat.name}
                  </span>
                  <span className={cn(
                    'text-xs',
                    settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                  )}>
                    {chat.type === 'direct' ? 'محادثة خاصة' : 'غرفة'}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {chat.unread > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {chat.unread}
                  </span>
                )}
                <button
                  onClick={(e) => handleClose(e, chat.id)}
                  className={cn(
                    'p-1 rounded-full',
                    settings.darkMode 
                      ? 'hover:bg-gray-600 text-gray-400' 
                      : 'hover:bg-gray-200 text-gray-500'
                  )}
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OpenChatsDrawer;