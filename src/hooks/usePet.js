// src/hooks/usePet.js
import { useState, useEffect, useCallback } from 'react';
import { minutesElapsedSince, clamp } from '../utils/timeHelpers';
import { GROWTH_STAGES } from '../utils/growthStages';
import useAchievements from './useAchievements';

const DEFAULT_STATS = {
  hunger: 80,
  energy: 75,
  happiness: 90,
  health: 85,
  cleanliness: 70,
  bond: 25
};

const DEFAULT_PET_STATE = {
  stats: DEFAULT_STATS,
  activity: null,
  growthStage: 'baby',
  birthDate: Date.now(),
  lastInteraction: Date.now(),
  lastVisited: Date.now()
};

export default function usePet() {
  const [petState, setPetState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('petState')) || DEFAULT_PET_STATE;
    } catch {
      return DEFAULT_PET_STATE;
    }
  });

   const {
   achievements,
   notification,
   checkAchievements,
   resetAchievements
 } = useAchievements(petState)

  const save = useCallback((update) => {
    setPetState(update);
    localStorage.setItem('petState', JSON.stringify(update));
    checkAchievements();
  }, [checkAchievements]);

  // Restore pet state to defaults
  const resetPet = () => {
    setPetState(DEFAULT_PET_STATE);
    localStorage.setItem('petState', JSON.stringify(DEFAULT_PET_STATE));
    resetAchievements();
  };

  // Interactions, clamp used to ensure stats stay within bounds
  const feedPet = () => {
    if (petState.activity === 'sleeping') return;
    const now = Date.now();
    const newStats = {
      ...petState.stats,
      hunger: clamp(petState.stats.hunger + 20),
      energy: clamp(petState.stats.energy + 5),
      health: clamp(petState.stats.health + 15)
    };
    // Persistence and signal activity for achievements and button behavior
    save({ ...petState, stats: newStats, activity: 'eating', lastInteraction: now });
    setTimeout(() => save({ ...petState, stats: newStats, activity: null }), 100);
  };

  const playWithPet = () => {
    if (petState.activity === 'sleeping') return;
    const now = Date.now();
    const s = petState.stats;
    const newStats = {
      ...s,
      happiness: clamp(s.happiness + 20),
      bond: clamp(s.bond + 5),
      energy: clamp(s.energy - 15),
      cleanliness: clamp(s.cleanliness - 30),
      health: clamp(s.health + 5)
    };
    save({ ...petState, stats: newStats, activity: 'playing', lastInteraction: now });
    setTimeout(() => save({ ...petState, stats: newStats, activity: null }), 100);
  };

  const cleanPet = () => {
    if (petState.activity === 'sleeping') return;
    const now = Date.now();
    const s = petState.stats;
    const newStats = {
      ...s,
      cleanliness: clamp(s.cleanliness + 50),
      energy: clamp(s.energy - 10),
      happiness: clamp(s.happiness - 20),
      bond: clamp(s.bond - 5)
    };
    save({ ...petState, stats: newStats, activity: 'cleaning', lastInteraction: now });
    setTimeout(() => save({ ...petState, stats: newStats, activity: null }), 100);
  };

  const toggleSleep = () => {
    const now = Date.now();
    if (petState.activity === 'sleeping') {
      save({ ...petState, activity: null, lastInteraction: now });
    } else if (!petState.activity) {
      save({ ...petState, activity: 'sleeping', lastInteraction: now });
    }
  };

  // decay tick 
  useEffect(() => {
    const id = setInterval(() => {
      const elapsed = minutesElapsedSince(petState.lastVisited);

      // Stats decay by time elapsed,
      const rates = { hunger: 7, energy: 3, cleanliness: 8, happiness: 2, health: 2 };
      const stats = { ...petState.stats };
      Object.entries(rates).forEach(([k, r]) => {
        stats[k] = clamp(stats[k] - r * .1);
      });

      if (petState.activity === 'sleeping') {
        stats.energy = clamp(stats.energy + 10);
      }

      const ageMin = minutesElapsedSince(petState.birthDate);
      const stage = Object.keys(GROWTH_STAGES).find(
        key => ageMin >= GROWTH_STAGES[key].min && ageMin <= GROWTH_STAGES[key].max
      );

      save({
        ...petState,
        stats,
        growthStage: stage || petState.growthStage,
        lastVisited: Date.now()
      });
    }, 250); // Interval of stat decay

    return () => clearInterval(id);
  }, [petState, save]);

  return {
    petState,
    achievements,
    notification,
    feedPet,
    playWithPet,
    cleanPet,
    toggleSleep,
    resetPet
  };
}
