import { useState } from 'react';

interface Feature {
  id: string;
  name: string;
  description: string;
  dateShipped: string;
  platform: 'Web' | 'Desktop' | 'Mobile' | 'All';
  teamMember: string;
}

interface FeatureCelebrationProps {
  onAddFeature: (feature: Omit<Feature, 'id'>) => void;
  recentFeatures: Feature[];
}

export const FeatureCelebration = ({ onAddFeature, recentFeatures }: FeatureCelebrationProps) => {
  const [isAddingFeature, setIsAddingFeature] = useState(false);
  const [newFeature, setNewFeature] = useState({
    name: '',
    description: '',
    platform: 'Web' as const,
    teamMember: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFeature.name.trim()) {
      onAddFeature({
        ...newFeature,
        dateShipped: new Date().toLocaleDateString(),
      });
      setNewFeature({ name: '', description: '', platform: 'Web', teamMember: '' });
      setIsAddingFeature(false);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Web':
        return '🌐';
      case 'Desktop':
        return '💻';
      case 'Mobile':
        return '📱';
      case 'All':
        return '🎯';
      default:
        return '⚡';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Web':
        return 'bg-blue-100 text-blue-800';
      case 'Desktop':
        return 'bg-green-100 text-green-800';
      case 'Mobile':
        return 'bg-purple-100 text-purple-800';
      case 'All':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <div className="w-6 h-6 flex items-center justify-center font-bold">W</div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Recent Features</h3>
            <p className="text-sm text-gray-600">Office Word Team Releases</p>
          </div>
        </div>

        <button
          onClick={() => setIsAddingFeature(!isAddingFeature)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          {isAddingFeature ? 'Cancel' : '+ Add Feature'}
        </button>
      </div>

      {/* Add Feature Form */}
      {isAddingFeature && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Feature Name</label>
              <input
                type="text"
                value={newFeature.name}
                onChange={e => setNewFeature(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Real-time Collaboration, Smart Suggestions..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newFeature.description}
                onChange={e => setNewFeature(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description of the feature..."
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <select
                  value={newFeature.platform}
                  onChange={e => setNewFeature(prev => ({ ...prev, platform: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Web">Web</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Mobile">Mobile</option>
                  <option value="All">All Platforms</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team Member</label>
                <input
                  type="text"
                  value={newFeature.teamMember}
                  onChange={e => setNewFeature(prev => ({ ...prev, teamMember: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
            >
              🎉 Add & Celebrate Feature
            </button>
          </div>
        </form>
      )}

      {/* Recent Features List */}
      <div className="space-y-3">
        {recentFeatures.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🚀</div>
            <p>No features celebrated yet!</p>
            <p className="text-sm">Add your first feature and strike the gong!</p>
          </div>
        ) : (
          <>
            <h4 className="font-semibold text-gray-800 mb-3">Latest Celebrations ({recentFeatures.length})</h4>
            <div className="max-h-64 overflow-y-auto space-y-3">
              {recentFeatures.slice(0, 10).map(feature => (
                <div
                  key={feature.id}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-800">{feature.name}</h5>
                      {feature.description && <p className="text-sm text-gray-600 mt-1">{feature.description}</p>}
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(feature.platform)}`}
                        >
                          {getPlatformIcon(feature.platform)} {feature.platform}
                        </span>
                        <span className="text-xs text-gray-500">📅 {feature.dateShipped}</span>
                        {feature.teamMember && <span className="text-xs text-gray-500">👤 {feature.teamMember}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Microsoft Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
            <div className="bg-red-500 rounded-sm"></div>
            <div className="bg-green-500 rounded-sm"></div>
            <div className="bg-blue-500 rounded-sm"></div>
            <div className="bg-yellow-500 rounded-sm"></div>
          </div>
          <span>Every feature deserves celebration</span>
        </div>
      </div>
    </div>
  );
};
