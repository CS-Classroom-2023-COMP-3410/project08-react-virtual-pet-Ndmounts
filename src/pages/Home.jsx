import React from 'react';
import usePet from '../hooks/usePet';

import PetDisplay from '../components/PetDisplay';
import StatusBar from '../components/StatusBar';
import ActionButton from '../components/ActionButton';
import AchievementToast from '../components/AchievementToast';

export default function Home() {
  const {
    petState,
    notification,
    feedPet,
    playWithPet,
    cleanPet,
    toggleSleep,
    resetPet
  } = usePet();

  const { stats, activity, growthStage, birthDate } = petState;
  const ageDays = Math.floor((Date.now() - birthDate) / 60000);
  const busy = activity && activity !== 'sleeping';
  const sleeping = activity === 'sleeping';

  return (
    <div className="home-layout">
      {notification && (
        <AchievementToast
          emoji={notification.emoji}
          title={notification.title}
          description={notification.description}
        />
      )}

      <section className="flex flex-col items-center">
        <PetDisplay growthStage={growthStage} activity={activity} />
        <span>
          Age <strong>{ageDays}</strong> day{ageDays === 1 ? '' : 's'}
        </span>
      </section>

      <section>
        {Object.entries(stats).map(([key, val]) => (
          <StatusBar
            key={key}
            label={key}
            value={val}
          />
        ))}
      </section>

      <section className="action-buttons">
        <ActionButton
          emoji="🍽️"
          label="Feed"
          onClick={feedPet}
          disabled={busy || sleeping}
        />
        <ActionButton
          emoji="🎮"
          label="Play"
          onClick={playWithPet}
          disabled={busy || sleeping}
        />
        <ActionButton
          emoji="🧹"
          label="Clean"
          onClick={cleanPet}
          disabled={busy || sleeping}
        />
        <ActionButton
          emoji="💤"
          label={sleeping ? 'Wake' : 'Sleep'}
          onClick={toggleSleep}
          disabled={busy && !sleeping}
        />
        <ActionButton
          emoji="🔄"
          label="Reset"
          onClick={resetPet}
          disabled={null}
        />
      </section>
    </div>
);
}
