// src/hooks/useAchievements.js
import { useState, useEffect, useCallback } from 'react';
import { ACHIEVEMENTS } from '../utils/achievementsData';

/**
 * Found in src/utils/achievementsData.js
 * ACHIEVEMENTS must be an array of objects like so:
 * {
 *   id: 'firstMeal',                // unique string key
 *   title: 'First Meal',            // short label for toast
 *   description: 'Feed your pet',   // long description in list
 *   emoji: '🍽️',                    // shown in toast/list
 *   condition: (ctx) => boolean     // unlock test (pure function)
 * }
 *   where ctx = { stats, growthStage, ageMinutes, petState }
 *
 * Only the hook **stores** and **signals** unlocks; it never decides what
 * qualifies—that logic lives in ACHIEVEMENTS.condition.
 */

export default function useAchievements(petState) {
  const [achievements, setAchievements] = useState(() => {
    const unlockedArr = JSON.parse(localStorage.getItem('achievements') || '[]');
    return ACHIEVEMENTS.map(a => ({
      ...a,
      unlocked: unlockedArr.includes(a.id),
      unlockedAt: unlockedArr.includes(a.id)
        ? Number(localStorage.getItem(`achv:${a.id}:time`)) || Date.now()
        : null
    }));
  });

  const [notification, setNotification] = useState(null);

  // Unlock a single achievement and trigger toast
  const unlock = useCallback((id) => {
    setAchievements(prev =>
      prev.map(a =>
        a.id === id && !a.unlocked
          ? { ...a, unlocked: true, unlockedAt: Date.now() }
          : a
      )
    );
    const aObj = ACHIEVEMENTS.find(a => a.id === id);
    if (aObj) {
      setNotification(aObj);
      setTimeout(() => setNotification(null), 5000);
    }
  }, []);

  // Check all conditions against the latest petState
  const checkAchievements = useCallback(() => {
    const { stats, growthStage, birthDate } = petState;
    const ageMinutes = Math.floor((Date.now() - birthDate) / 60000);

    achievements.forEach(a => {
      if (!a.unlocked) {
        try {
          if (a.condition({ stats, growthStage, ageMinutes, petState })) {
            unlock(a.id);
          }
        } catch (err) {
          console.error(`Achievement condition error (${a.id}):`, err);
        }
      }
    });
  }, [achievements, petState, unlock]);

  // Automatically re-check when relevant petState fields change
  useEffect(() => {
    checkAchievements();
  }, [petState.activity, petState.stats, petState.growthStage, checkAchievements]);

  // Persist unlocked achievements
  useEffect(() => {
    const unlockedIDs = achievements.filter(a => a.unlocked).map(a => a.id);
    localStorage.setItem('achievements', JSON.stringify(unlockedIDs));
    achievements.forEach(a => {
      if (a.unlocked) {
        localStorage.setItem(`achv:${a.id}:time`, String(a.unlockedAt));
      }
    });
  }, [achievements]);

  // Reset achievements state & localStorage
  const resetAchievements = useCallback(() => {
    localStorage.removeItem('achievements');
    ACHIEVEMENTS.forEach(a => localStorage.removeItem(`achv:${a.id}:time`));
    setAchievements(
      ACHIEVEMENTS.map(a => ({ ...a, unlocked: false, unlockedAt: null }))
    );
  }, []);

  return {
    achievements,
    notification,
    checkAchievements,
    resetAchievements
  };
}
