import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

const themeColors = {
  'أزرق': {
    primary: 'rgb(37, 99, 235)',
    secondary: 'rgb(59, 130, 246)',
    hover: 'rgb(29, 78, 216)'
  },
  'أخضر': {
    primary: 'rgb(22, 163, 74)',
    secondary: 'rgb(34, 197, 94)',
    hover: 'rgb(21, 128, 61)'
  },
  'أرجواني': {
    primary: 'rgb(147, 51, 234)',
    secondary: 'rgb(168, 85, 247)',
    hover: 'rgb(126, 34, 206)'
  },
  'برتقالي': {
    primary: 'rgb(234, 88, 12)',
    secondary: 'rgb(249, 115, 22)',
    hover: 'rgb(194, 65, 12)'
  }
};

const defaultSettings = {
  // Theme Settings
  darkMode: false,
  theme: 'أزرق',
  fontSize: 'متوسط',
  language: 'العربية',
  
  // Chat Settings
  notifications: true,
  soundEffects: true,
  messagePreview: true,
  readReceipts: true,
  typingIndicator: true,
  autoPlayVoice: true,
  autoPlayVideo: false,
  
  // Privacy Settings
  profileVisibility: 'public',
  onlineStatus: true,
  lastSeen: true,
  profilePhoto: 'all',
  whoCanMessage: 'all',
  whoCanAddToGroups: 'contacts',
  
  // Security Settings
  twoFactorAuth: false,
  loginNotifications: true,
  securityAlerts: true,
  
  // Storage Settings
  autoDownload: {
    images: true,
    videos: false,
    documents: true,
    audio: true
  },
  
  // Accessibility Settings
  reduceMotion: false,
  highContrast: false,
  largeText: false,
  
  // Voice & Video Settings
  microphoneDevice: 'default',
  speakerDevice: 'default',
  noiseCancellation: true,
  echoCancellation: true,
  autoGainControl: true,
  
  // Room Settings
  defaultRoomSettings: {
    allowVoiceStage: true,
    autoApproveMembers: false,
    allowChat: true,
    allowFiles: true,
    allowLinks: true,
    moderation: 'auto',
    maxMembers: 500
  }
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('appSettings');
    return savedSettings ? { ...defaultSettings, ...JSON.parse(savedSettings) } : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    
    // Apply theme settings
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply theme color
    const colors = themeColors[settings.theme];
    if (colors) {
      document.documentElement.style.setProperty('--color-primary', colors.primary);
      document.documentElement.style.setProperty('--color-secondary', colors.secondary);
      document.documentElement.style.setProperty('--color-hover', colors.hover);
      
      // Update meta theme color
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) {
        metaTheme.setAttribute('content', colors.primary);
      }
    }

    // Apply font size
    const fontSizes = {
      'صغير': '14px',
      'متوسط': '16px',
      'كبير': '18px'
    };
    document.documentElement.style.fontSize = fontSizes[settings.fontSize];

    // Apply reduced motion
    if (settings.reduceMotion) {
      document.documentElement.style.setProperty('--transition-duration', '0s');
    } else {
      document.documentElement.style.removeProperty('--transition-duration');
    }

    // Apply high contrast
    if (settings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Apply large text
    if (settings.largeText) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }
  }, [settings]);

  const updateSettings = (key, value) => {
    setSettings(prev => {
      // Handle nested settings
      if (key.includes('.')) {
        const [parent, child] = key.split('.');
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        };
      }
      return { ...prev, [key]: value };
    });
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider value={{ 
      settings, 
      updateSettings,
      resetSettings,
      isDefault: JSON.stringify(settings) === JSON.stringify(defaultSettings),
      themeColors
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}