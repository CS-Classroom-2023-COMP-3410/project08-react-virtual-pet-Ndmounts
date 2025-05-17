import React from 'react';

export default function AchievementList({ achievements }) {
  return (
    <div className="achievement-list">
      {achievements.map(a => (
        <div
          key={a.id}
          className={`achievement-card ${
            a.unlocked ? 'achievement-card--unlocked' : ''
          }`}
        >
          <span className="achievement-card__emoji">
            {a.unlocked ? a.emoji : '❔'}
          </span>
          <div className="achievement-card__info">
            <h5>{a.title}</h5>
            <p>{a.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
