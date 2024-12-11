import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, ChatBubbleLeftRightIcon, UserGroupIcon as RoomIcon, NewspaperIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, UserGroupIcon as UserGroupIconSolid, ChatBubbleLeftRightIcon as ChatIconSolid, UserGroupIcon as RoomIconSolid, NewspaperIcon as NewsIconSolid } from '@heroicons/react/24/solid';
import { useSettings } from '../contexts/SettingsContext';
import { cn } from '../utils/styles';

function Navbar() {
  const location = useLocation();
  const { settings } = useSettings();

  // Hide navbar in chat and room pages
  const shouldHideNavbar = location.pathname.match(/\/(chats|rooms)\/[^/]+/);
  if (shouldHideNavbar) return null;

  const navItems = [
    { path: '/', label: 'الرئيسية', Icon: HomeIcon, ActiveIcon: HomeIconSolid },
    { path: '/friends', label: 'الأصدقاء', Icon: UserGroupIcon, ActiveIcon: UserGroupIconSolid },
    { path: '/chats', label: 'المحادثات', Icon: ChatBubbleLeftRightIcon, ActiveIcon: ChatIconSolid },
    { path: '/rooms', label: 'الغرف', Icon: RoomIcon, ActiveIcon: RoomIconSolid },
    { path: '/posts', label: 'المنشورات', Icon: NewspaperIcon, ActiveIcon: NewsIconSolid },
  ];

  return (
    <nav className={cn(
      'fixed bottom-0 right-0 left-0 z-50',
      settings.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
      'shadow-lg border-t',
      'pb-[env(safe-area-inset-bottom)]'
    )}>
      <div className="flex justify-around items-center h-16 max-w-screen-xl mx-auto px-safe-left px-safe-right">
        {navItems.map(({ path, label, Icon, ActiveIcon }) => {
          const isActive = location.pathname === path;
          const IconComponent = isActive ? ActiveIcon : Icon;
          
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                'flex flex-col items-center px-3 py-2 rounded-lg transition-colors',
                isActive 
                  ? settings.darkMode
                    ? 'text-blue-400'
                    : 'text-blue-600'
                  : settings.darkMode 
                    ? 'text-gray-400 hover:text-gray-200' 
                    : 'text-gray-600 hover:text-gray-900'
              )}
            >
              <IconComponent className="h-6 w-6" />
              <span className="text-xs mt-1 hidden xs:block">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;