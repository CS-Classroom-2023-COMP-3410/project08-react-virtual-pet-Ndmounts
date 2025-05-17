// src/utils/achievementsData.js
export const ACHIEVEMENTS = [
  {
    id: 'firstMeal',
    title: 'First Meal',
    description: 'Fed your pet for the first time',
    emoji: '🍽️',
    condition: ({ petState }) => petState.activity === 'eating'
  },
  {
    id: 'firstPlay',
    title: 'First Play',
    description: 'Played with your pet for the first time',
    emoji: '🎾',
    condition: ({ petState }) => petState.activity === 'playing'
  },
  {
    id: 'firstSleep',
    title: 'First Sleep',
    description: 'Your pet is sleeping for the first time',
    emoji: '💤',
    condition: ({ petState }) => petState.activity === 'sleeping'
  },
  {
    id: 'firstClean',
    title: 'First Clean',
    description: 'Your pet is clean for the first time',
    emoji: '🧼',
    condition: ({ petState }) => petState.activity === 'cleaning'
  },
  {
    id: 'petAgeChild',
    title: 'First Growth',
    description: 'Your pet has grown into a child',
    emoji: '👶',
    condition: ({ growthStage }) => growthStage === 'child'
  },
  {
    id: 'petAgeTeen',
    title: 'Second Growth',
    description: 'Your pet has grown into a teen',
    emoji: '🧑',
    condition: ({ growthStage }) => growthStage === 'teen'
  },
  {
    id: 'petAgeAdult',
    title: 'Third Growth',
    description: 'Your pet has grown into an adult',
    emoji: '👨',
    condition: ({ growthStage }) => growthStage === 'adult'
  },
  {
    id: 'bondedPet',
    title: 'Bonded',
    description: 'Your pet is fully bonded with you',
    emoji: '❤️',
    condition: ({ stats }) => stats.bond === 100
  },
  {
    id: 'hatredPet',
    title: 'Hated',
    description: 'Your pet hates you',
    emoji: '💔',
    condition: ({ stats }) => stats.bond === 0,
  }
];
