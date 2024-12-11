import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateXPReward } from '../utils/levelSystem';

const ActivityContext = createContext();

export function ActivityProvider({ children }) {
  const [userStats, setUserStats] = useState(() => {
    const savedStats = localStorage.getItem('userStats');
    return savedStats ? JSON.parse(savedStats) : {
      streakDays: 0,
      lastActive: new Date().toISOString(),
      messagesPerMinute: 0,
      engagementRate: 0,
      helpfulnessScore: 0,
      daysInactive: 0,
      totalXP: 0,
      level: 1
    };
  });

  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }, [userStats]);

  const recordActivity = (action) => {
    const xpReward = calculateXPReward(action, userStats);
    
    setUserStats(prev => ({
      ...prev,
      totalXP: prev.totalXP + xpReward,
      lastActive: new Date().toISOString()
    }));
  };

  const updateStats = (updates) => {
    setUserStats(prev => ({
      ...prev,
      ...updates
    }));
  };

  return (
    <ActivityContext.Provider value={{
      userStats,
      recordActivity,
      updateStats
    }}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
}