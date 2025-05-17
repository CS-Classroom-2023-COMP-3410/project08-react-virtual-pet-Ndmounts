// src/components/StatusBar.jsx
import React from 'react';

export default function StatusBar({ label, value }) {
  const pct = Math.round(value);

  // color coding
  const colour =
    pct >= 70
      ? 'bg-green-500'
      : pct >= 30
        ? 'bg-yellow-400'
        : 'bg-red-500';

  return (
    <div classname="status-bar">
      <div className="status-bar__header">
        <span className="capitalize">{label}</span>
        <span>{pct}</span>
      </div>
      <div className="status-bar__track">
        <div
          className={`status-bar__fill ${pct >= 70 ? 'status-bar__fill--high'
              : pct >= 30 ? 'status-bar__fill--medium'
                : 'status-bar__fill--low'
            }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
