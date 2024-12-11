import React, { createContext, useContext, useState } from 'react';
import { useSettings } from './SettingsContext';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const { settings } = useSettings();
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    if (!settings.notifications) return;

    const newNotification = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Play sound if enabled
    if (settings.soundEffects) {
      const audio = new Audio('/notification.mp3');
      audio.play().catch(() => {});
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}