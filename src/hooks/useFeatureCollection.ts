import { useCallback, useState } from 'react';

interface Feature {
  id: string;
  name: string;
  description: string;
  dateShipped: string;
  platform: 'Web' | 'Desktop' | 'Mobile' | 'All';
  teamMember: string;
}

interface UseFeatureCollectionReturn {
  features: Feature[];
  addFeature: (feature: Omit<Feature, 'id'>) => void;
  removeFeature: (id: string) => void;
  clearFeatures: () => void;
}

export const useFeatureCollection = (): UseFeatureCollectionReturn => {
  const [features, setFeatures] = useState<Feature[]>(() => {
    // Load features from localStorage
    const saved = localStorage.getItem('microsoft-word-features');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const saveFeatures = useCallback((newFeatures: Feature[]) => {
    localStorage.setItem('microsoft-word-features', JSON.stringify(newFeatures));
  }, []);

  const addFeature = useCallback(
    (featureData: Omit<Feature, 'id'>) => {
      const newFeature: Feature = {
        ...featureData,
        id: Date.now().toString(),
      };

      const updatedFeatures = [newFeature, ...features];
      setFeatures(updatedFeatures);
      saveFeatures(updatedFeatures);
    },
    [features, saveFeatures]
  );

  const removeFeature = useCallback(
    (id: string) => {
      const updatedFeatures = features.filter(feature => feature.id !== id);
      setFeatures(updatedFeatures);
      saveFeatures(updatedFeatures);
    },
    [features, saveFeatures]
  );

  const clearFeatures = useCallback(() => {
    setFeatures([]);
    localStorage.removeItem('microsoft-word-features');
  }, []);

  return {
    features,
    addFeature,
    removeFeature,
    clearFeatures,
  };
};
