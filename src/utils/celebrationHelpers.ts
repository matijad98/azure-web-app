/**
 * Helper utilities for Microsoft Word feature celebrations
 */

interface CelebrationMessage {
  title: string;
  message: string;
  emoji: string;
}

interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
}

/**
 * Get a random celebration message based on hit count
 */
function getCelebrationMessage(hitCount: number): CelebrationMessage {
  const messages: CelebrationMessage[] = [
    // First few celebrations
    { title: 'First Strike!', message: 'Welcome to the Word team celebration tradition!', emoji: '🎯' },
    { title: 'Getting Started', message: 'The gong resonates with your success!', emoji: '🎵' },
    { title: 'Building Momentum', message: 'Each feature makes Word better for millions!', emoji: '🚀' },

    // Regular celebrations
    { title: 'Feature Shipped!', message: 'Another step forward for Microsoft Word!', emoji: '📝' },
    { title: 'Team Success!', message: 'Collaboration makes us stronger!', emoji: '👥' },
    { title: 'Innovation Delivered', message: 'Pushing the boundaries of productivity!', emoji: '💡' },
    { title: 'User Impact', message: 'Making work easier for everyone!', emoji: '🌟' },
    { title: 'Quality Release', message: 'Excellence in every line of code!', emoji: '✨' },

    // Milestone celebrations
    { title: 'Milestone Achieved!', message: 'Your dedication shows in every release!', emoji: '🏆' },
    { title: 'Word Wizard', message: "You're becoming a true Word expert!", emoji: '🧙‍♂️' },
    { title: 'Office Champion', message: 'Leading the way in productivity innovation!', emoji: '👑' },
    { title: 'Feature Master', message: 'Your features are changing how people work!', emoji: '🎭' },
  ];

  if (hitCount === 1) return messages[0];
  if (hitCount === 2) return messages[1];
  if (hitCount === 3) return messages[2];
  if (hitCount % 10 === 0) return messages[8]; // Milestone every 10

  // Random message for regular celebrations
  const regularMessages = messages.slice(3, 8);
  return regularMessages[hitCount % regularMessages.length];
}

/**
 * Get encouragement based on current streak or achievement
 */
function getEncouragement(hitCount: number): string {
  if (hitCount === 0) return 'Ready to celebrate your first Word feature? Strike the gong!';
  if (hitCount < 5) return 'Great start! Keep shipping amazing features! 🚀';
  if (hitCount < 10) return "You're building momentum! Every feature counts! 💪";
  if (hitCount < 25) return 'Impressive dedication to Word excellence! 🔥';
  if (hitCount < 50) return "You're a Word team superstar! ⭐";
  if (hitCount < 100) return 'Legendary contributor to Microsoft Word! 🏆';
  return 'Word team legend! Your impact is immeasurable! 👑';
}

/**
 * Calculate celebration statistics
 */
function getStats(hitCount: number) {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const dayOfMonth = today.getDate();

  return {
    total: hitCount,
    thisMonth: Math.floor(hitCount * (dayOfMonth / daysInMonth)), // Estimate
    average: hitCount > 0 ? (hitCount / Math.max(dayOfMonth, 1)).toFixed(1) : '0',
    streak: hitCount > 0 ? Math.min(hitCount, 7) : 0, // Simple streak calculation
  };
}

/**
 * Get platform-specific celebration details
 */
function getPlatformCelebration(platform: string) {
  const celebrations = {
    Web: {
      icon: '🌐',
      color: 'bg-blue-100 text-blue-800',
      message: 'Bringing Word to the web!',
    },
    Desktop: {
      icon: '💻',
      color: 'bg-green-100 text-green-800',
      message: 'Powering productivity on desktop!',
    },
    Mobile: {
      icon: '📱',
      color: 'bg-purple-100 text-purple-800',
      message: 'Word on-the-go excellence!',
    },
    All: {
      icon: '🎯',
      color: 'bg-orange-100 text-orange-800',
      message: 'Cross-platform Word harmony!',
    },
  };

  return celebrations[platform as keyof typeof celebrations] || celebrations.All;
}

/**
 * Generate a celebration announcement
 */
function createCelebrationAnnouncement(featureName: string, teamMember: string, platform: string): string {
  const platformInfo = getPlatformCelebration(platform);
  return `🎉 ${teamMember} just shipped "${featureName}" for ${platform}! ${platformInfo.message}`;
}

/**
 * Get time-based greeting
 */
function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();

  if (hour < 12) return 'Good morning, Word team! ☀️';
  if (hour < 17) return 'Good afternoon, Word team! 🌤️';
  return 'Good evening, Word team! 🌙';
}

/**
 * Format date for display
 */
function formatCelebrationDate(date: string): string {
  const celebrationDate = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - celebrationDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'Today';
  if (diffDays === 2) return 'Yesterday';
  if (diffDays <= 7) return `${diffDays - 1} days ago`;

  return celebrationDate.toLocaleDateString();
}

export const celebrationHelpers = {
  getCelebrationMessage,
  getEncouragement,
  getStats,
  getPlatformCelebration,
  createCelebrationAnnouncement,
  getTimeBasedGreeting,
  formatCelebrationDate,

  /**
   * Microsoft-specific team messages
   */
  getMicrosoftMessage: () => {
    const messages = [
      'Empowering every person and organization on the planet to achieve more! 🌍',
      'Innovation that makes a difference in how people work! 💡',
      'Building the future of productivity, one feature at a time! 🚀',
      'Microsoft Word: Where great ideas come to life! ✨',
      'Connecting the world through better collaboration tools! 🤝',
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  },

  /**
   * Generate team celebration emoji sequence
   */
  getTeamEmojis: () => '🎉 📝 🏆 ⭐ 🚀 💪 ✨ 🎯',

  /**
   * Office Word specific achievements
   */
  getWordAchievements: () => [
    { threshold: 1, title: 'First Document', emoji: '📄' },
    { threshold: 5, title: 'Word Apprentice', emoji: '📝' },
    { threshold: 10, title: 'Document Master', emoji: '📚' },
    { threshold: 25, title: 'Word Wizard', emoji: '🧙‍♂️' },
    { threshold: 50, title: 'Office Champion', emoji: '🏆' },
    { threshold: 100, title: 'Word Legend', emoji: '👑' },
  ],
};
