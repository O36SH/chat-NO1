// Room level configuration
export const ROOM_LEVELS = {
  // Base XP needed for first level
  baseXP: 2000,
  // XP multiplier for each level (increases by 2x)
  xpMultiplier: 2,
  // Maximum room level
  maxLevel: 100,
  
  // XP rewards for different activities
  rewards: {
    message: 5, // Regular message
    voiceMinute: 10, // Per minute in voice chat
    fileShare: 15, // Sharing files
    reaction: 2, // Reacting to messages
    dailyActivity: 100, // Daily room activity
    newMember: 50, // New member joins
    eventParticipation: 200, // Participating in room events
    pollCreation: 30, // Creating polls
    pollVote: 5, // Voting in polls
    stagePresentation: 150, // Presenting in voice stage
  },

  // Level-based features unlock
  features: {
    5: ['customEmojis', 'increaseMembers'],
    10: ['voiceStage', 'polls'],
    15: ['fileSharing', 'customRoles'],
    20: ['screenSharing', 'threadedReplies'],
    25: ['customBots', 'advancedModeration'],
    30: ['multipleVoiceChannels', 'memberAnalytics'],
    40: ['customThemes', 'welcomeScreen'],
    50: ['verifiedBadge', 'discoveryBoost'],
    75: ['customDomain', 'apiAccess'],
    100: ['unlimitedHistory', 'prioritySupport']
  },

  // Member capacity increases with level
  memberLimits: {
    1: 100,
    5: 250,
    10: 500,
    15: 1000,
    20: 2000,
    25: 3000,
    30: 5000,
    40: 7500,
    50: 10000,
    75: 15000,
    100: 'unlimited'
  },

  // Level badges and colors
  badges: {
    1: { icon: '🌱', color: '#4ade80', name: 'جديدة' },
    5: { icon: '🌿', color: '#22c55e', name: 'نامية' },
    10: { icon: '🌲', color: '#16a34a', name: 'متطورة' },
    15: { icon: '⭐', color: '#eab308', name: 'نجمة' },
    20: { icon: '🌟', color: '#f59e0b', name: 'متألقة' },
    25: { icon: '💫', color: '#d97706', name: 'مميزة' },
    30: { icon: '🔥', color: '#ef4444', name: 'نشطة' },
    40: { icon: '⚡', color: '#f97316', name: 'قوية' },
    50: { icon: '💎', color: '#3b82f6', name: 'ماسية' },
    75: { icon: '👑', color: '#8b5cf6', name: 'ملكية' },
    100: { icon: '🏆', color: '#6366f1', name: 'أسطورية' }
  }
};

// Calculate XP required for next level
export function getRequiredRoomXP(level) {
  return Math.floor(ROOM_LEVELS.baseXP * Math.pow(ROOM_LEVELS.xpMultiplier, level - 1));
}

// Get room level from total XP
export function getRoomLevel(totalXP) {
  let level = 1;
  let xpRequired = ROOM_LEVELS.baseXP;
  
  while (totalXP >= xpRequired && level < ROOM_LEVELS.maxLevel) {
    totalXP -= xpRequired;
    level++;
    xpRequired = getRequiredRoomXP(level);
  }
  
  return {
    level,
    currentXP: totalXP,
    requiredXP: xpRequired,
    progress: (totalXP / xpRequired) * 100,
    badge: getRoomBadge(level),
    features: getUnlockedFeatures(level),
    memberLimit: getMemberLimit(level)
  };
}

// Get room badge for level
export function getRoomBadge(level) {
  const badges = Object.entries(ROOM_LEVELS.badges)
    .sort(([a], [b]) => Number(b) - Number(a));
  
  for (const [badgeLevel, badge] of badges) {
    if (level >= Number(badgeLevel)) {
      return badge;
    }
  }
  return ROOM_LEVELS.badges[1];
}

// Get unlocked features for level
export function getUnlockedFeatures(level) {
  const features = [];
  Object.entries(ROOM_LEVELS.features).forEach(([featureLevel, featureList]) => {
    if (level >= Number(featureLevel)) {
      features.push(...featureList);
    }
  });
  return features;
}

// Get member limit for level
export function getMemberLimit(level) {
  const limits = Object.entries(ROOM_LEVELS.memberLimits)
    .sort(([a], [b]) => Number(b) - Number(a));
  
  for (const [limitLevel, limit] of limits) {
    if (level >= Number(limitLevel)) {
      return limit;
    }
  }
  return ROOM_LEVELS.memberLimits[1];
}

// Calculate XP reward with bonuses
export function calculateRoomXPReward(action, roomStats) {
  const baseXP = ROOM_LEVELS.rewards[action] || 0;
  let multiplier = 1;

  // Activity bonus (more active rooms get more XP)
  if (roomStats.dailyActiveUsers > 50) multiplier *= 1.2;
  if (roomStats.dailyActiveUsers > 100) multiplier *= 1.5;
  
  // Engagement bonus
  if (roomStats.messageRate > 100) multiplier *= 1.3;
  
  // Voice activity bonus
  if (roomStats.voiceMinutes > 300) multiplier *= 1.4;
  
  // Event bonus
  if (roomStats.weeklyEvents > 5) multiplier *= 1.25;
  
  // Quality bonus (based on moderation actions)
  if (roomStats.moderationScore > 0.8) multiplier *= 1.2;

  return Math.floor(baseXP * multiplier);
}