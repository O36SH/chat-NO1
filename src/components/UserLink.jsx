import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { formatUserId } from '../utils/idGenerator';

function UserLink({ userId, name, children, className = '' }) {
  const navigate = useNavigate();
  const { settings } = useSettings();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/chats/${userId}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`text-right ${
        settings.darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
      } ${className}`}
    >
      {children || (
        <div className="flex items-center space-x-2">
          <span>{name}</span>
          <span className="text-sm text-gray-500">{formatUserId(userId)}</span>
        </div>
      )}
    </button>
  );
}

export default UserLink;