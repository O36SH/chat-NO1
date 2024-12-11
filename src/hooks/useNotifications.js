import { useState, useCallback } from 'react';
import { useSettings } from '../contexts/SettingsContext';

export function useNotifications() {
  const { settings } = useSettings();
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
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

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  }, [settings]);

  const clearNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return {
    notifications,
    addNotification,
    clearNotification
  };
}