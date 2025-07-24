interface GongStatsProps {
  hitCount: number;
  onReset: () => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  threshold: number;
  color: string;
}

const achievements: Achievement[] = [
  {
    id: 'first-strike',
    title: 'First Strike',
    description: 'Your first celebration!',
    icon: '🎯',
    threshold: 1,
    color: 'bg-green-100 text-green-800 border-green-200',
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: '5 feature celebrations',
    icon: '🚀',
    threshold: 5,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  {
    id: 'team-player',
    title: 'Team Player',
    description: '10 features shipped',
    icon: '👥',
    threshold: 10,
    color: 'bg-purple-100 text-purple-800 border-purple-200',
  },
  {
    id: 'productivity-master',
    title: 'Productivity Master',
    description: '25 Word features delivered',
    icon: '📝',
    threshold: 25,
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  },
  {
    id: 'office-champion',
    title: 'Office Champion',
    description: '50 celebrations strong!',
    icon: '🏆',
    threshold: 50,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  {
    id: 'word-wizard',
    title: 'Word Wizard',
    description: '100 feature launches',
    icon: '🧙‍♂️',
    threshold: 100,
    color: 'bg-orange-100 text-orange-800 border-orange-200',
  },
];

export const GongStats = ({ hitCount, onReset }: GongStatsProps) => {
  const unlockedAchievements = achievements.filter(achievement => hitCount >= achievement.threshold);
  const nextAchievement = achievements.find(achievement => hitCount < achievement.threshold);

  const getProgressToNext = () => {
    if (!nextAchievement) return 100;
    return (hitCount / nextAchievement.threshold) * 100;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md">
      {/* Header with Office Word Branding */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600 text-white p-2 rounded-lg">
          <div className="w-6 h-6 flex items-center justify-center font-bold">W</div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Feature Celebrations</h2>
          <p className="text-sm text-gray-600">Microsoft Office Word Team</p>
        </div>
      </div>

      {/* Hit Counter */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-blue-600 mb-1">{hitCount}</div>
        <p className="text-gray-600">Features Celebrated</p>
        <div className="text-sm text-gray-500 mt-1">
          {hitCount === 0 && 'Ready to celebrate your first feature!'}
          {hitCount === 1 && 'Great start! Keep shipping! 🚀'}
          {hitCount > 1 && hitCount < 10 && 'Building momentum! 💪'}
          {hitCount >= 10 && hitCount < 25 && "You're on fire! 🔥"}
          {hitCount >= 25 && hitCount < 50 && 'Word team superstar! ⭐'}
          {hitCount >= 50 && 'Legendary Word contributor! 🏆'}
        </div>
      </div>

      {/* Progress to Next Achievement */}
      {nextAchievement && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Next Goal</span>
            <span className="text-sm text-gray-500">
              {hitCount}/{nextAchievement.threshold}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${getProgressToNext()}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 mt-1">{nextAchievement.title}</p>
        </div>
      )}

      {/* Achievements */}
      {unlockedAchievements.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Achievements Unlocked</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {unlockedAchievements.map(achievement => (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg border ${achievement.color} transition-all duration-300`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{achievement.title}</h4>
                    <p className="text-xs opacity-80">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reset Button */}
      {hitCount > 0 && (
        <button
          onClick={onReset}
          className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-sm font-medium"
        >
          Reset Celebrations
        </button>
      )}

      {/* Microsoft Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
            <div className="bg-red-500 rounded-sm"></div>
            <div className="bg-green-500 rounded-sm"></div>
            <div className="bg-blue-500 rounded-sm"></div>
            <div className="bg-yellow-500 rounded-sm"></div>
          </div>
          <span>Microsoft Office Word</span>
        </div>
      </div>
    </div>
  );
};
