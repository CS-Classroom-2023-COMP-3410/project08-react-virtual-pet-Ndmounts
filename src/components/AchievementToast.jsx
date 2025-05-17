import React, { useEffect, useState } from 'react';

export default function AchievementToast({
  emoji,
  title,
  description,
  duration = 4000
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(id);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="toast">
      <span className="toast__emoji">{emoji}</span>
      <div className="toast__text">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}
