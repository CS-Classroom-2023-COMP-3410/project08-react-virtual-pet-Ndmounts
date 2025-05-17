import React from 'react';

export default function ActionButton({ emoji, label, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="action-button"
    >
      <span className="text-2xl mb-1">{emoji}</span>
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}
