export function minutesElapsedSince(timestamp) {
  return (Date.now() - timestamp) / 60000; // convert ms to minutes
}

// Forces all values to stay within 0, 100, this constant makes stat handling a lot cleaner
// since Math.max/min is ugly
export const clamp = (val, min = 0, max = 100) =>
  Math.max(min, Math.min(max, val));
