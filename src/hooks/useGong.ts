import { useCallback, useState } from 'react';
import { audioUtils } from '../utils';

interface UseGongReturn {
  isAnimating: boolean;
  hitCount: number;
  playGongSound: () => void;
  resetCount: () => void;
}

export const useGong = (): UseGongReturn => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hitCount, setHitCount] = useState(() => {
    // Load hit count from localStorage
    const saved = localStorage.getItem('microsoft-word-gong-hits');
    return saved ? parseInt(saved, 10) : 0;
  });

  const playGongSound = useCallback(() => {
    // Start animation
    setIsAnimating(true);

    // Increment hit count
    const newCount = hitCount + 1;
    setHitCount(newCount);

    // Save to localStorage
    localStorage.setItem('microsoft-word-gong-hits', newCount.toString());

    // Play the realistic gong sound with higher volume
    audioUtils.playGong(0.9); // Increased volume for better impact

    // Stop animation after delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  }, [hitCount]);

  const resetCount = useCallback(() => {
    setHitCount(0);
    localStorage.removeItem('microsoft-word-gong-hits');
  }, []);

  return {
    isAnimating,
    hitCount,
    playGongSound,
    resetCount,
  };
};
