// Level progression configuration
export const LEVEL_CONFIG = {
  baseXP: 1000, // Base XP needed for first level
  xpMultiplier: 1.8, // XP requirement increases by 80% each level
  maxLevel: 100,
  activityXP: {
    message: 5, // XP per message
    voiceMinute: 2, // XP per minute in voice chat
    dailyLogin: 50, // Daily login bonus
    roomCreation: 200, // Creating a room
    postCreation: 30, // Creating a post
    receivedLike: 10, // Getting a like on post/comment
    receivedComment: 15, // Getting a comment
    eventParticipation: 100, // Participating in events
    challengeCompletion: 500, // Completing challenges
  },
  penalties: {
    spamThreshold: 5, // messages per minute
    spamPenalty: -20, // XP penalty for spamming
    inactivityThreshold: 30, // days
    inactivityPenalty: 0.9, // 10% XP reduction after inactivity
  },
  bonuses: {
    streak: {
      3: 1.1, // 10% bonus after 3 days streak
      7: 1.2, // 20% bonus after 7 days streak
      30: 1.5, // 50% bonus after 30 days streak
    },
    quality: {
      engagement: 1.2, // 20% bonus for high engagement
      helpfulness: 1.3, // 30% bonus for being helpful
    }
  }
};

// Calculate XP required for next level
export function getRequiredXP(level) {
  return Math.floor(LEVEL_CONFIG.baseXP * Math.pow(LEVEL_CONFIG.xpMultiplier, level - 1));
}

// Calculate total XP from all previous levels
export function getTotalXPForLevel(level) {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += getRequiredXP(i);
  }
  return total;
}

// Calculate current level progress
export function calculateProgress(currentXP) {
  let level = 1;
  let totalXP = 0;
  
  while (totalXP + getRequiredXP(level) <= currentXP && level < LEVEL_CONFIG.maxLevel) {
    totalXP += getRequiredXP(level);
    level++;
  }

  const currentLevelXP = currentXP - totalXP;
  const requiredXP = getRequiredXP(level);
  const progress = (currentLevelXP / requiredXP) * 100;

  return {
    level,
    currentLevelXP,
    requiredXP,
    progress: Math.min(100, Math.max(0, progress)),
    totalXP: currentXP
  };
}

// Calculate XP reward with bonuses and penalties
export function calculateXPReward(action, userStats) {
  const baseXP = LEVEL_CONFIG.activityXP[action] || 0;
  let multiplier = 1;

  // Apply streak bonuses
  const streakDays = userStats.streakDays || 0;
  Object.entries(LEVEL_CONFIG.bonuses.streak).forEach(([days, bonus]) => {
    if (streakDays >= parseInt(days)) {
      multiplier *= bonus;
    }
  });

  // Apply quality bonuses
  if (userStats.engagementRate > 0.8) {
    multiplier *= LEVEL_CONFIG.bonuses.quality.engagement;
  }
  if (userStats.helpfulnessScore > 0.7) {
    multiplier *= LEVEL_CONFIG.bonuses.quality.helpfulness;
  }

  // Apply penalties
  if (userStats.messagesPerMinute > LEVEL_CONFIG.penalties.spamThreshold) {
    return LEVEL_CONFIG.penalties.spamPenalty;
  }

  if (userStats.daysInactive > LEVEL_CONFIG.penalties.inactivityThreshold) {
    multiplier *= LEVEL_CONFIG.penalties.inactivityPenalty;
  }

  return Math.floor(baseXP * multiplier);
}

// Get level icon and color based on level
export function getLevelStyle(level) {
  if (level < 5) return { icon: 'StarIcon', color: 'yellow' };
  if (level < 15) return { icon: 'SparklesIcon', color: 'blue' };
  if (level < 30) return { icon: 'FireIcon', color: 'red' };
  if (level < 50) return { icon: 'SunIcon', color: 'orange' };
  if (level < 75) return { icon: 'MoonIcon', color: 'purple' };
  return { icon: 'BoltIcon', color: 'emerald' };
}