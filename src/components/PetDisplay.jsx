import React from 'react';
import { GROWTH_STAGES } from '../utils/growthStages';

export default function PetDisplay({ growthStage, activity }) {
  const stageEmoji = GROWTH_STAGES[growthStage]?.emoji ?? '🐾';
  const activityEmojiMap = {
    eating: '🍗',
    playing: '🎾',
    cleaning: '🧼',
    sleeping: '💤'
  };
  const overlay = activity ? activityEmojiMap[activity] : null;

  return (
    <div className="pet-display">
      <span>{stageEmoji}</span>
      {overlay && (
        <span className="pet-display__overlay">
          {overlay}
        </span>
      )}
    </div>
  );
}
