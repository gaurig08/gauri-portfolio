// Shared helpers for the background scenes.

export function isDark() {
  const t = document.documentElement.dataset.theme
  return t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches
}

export function prefersReducedMotion() {
  return matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Small seeded random generator, so the skyline keeps the same shapes when it is redrawn.
export function seeded(seed) {
  let s = seed | 0
  const next = () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  next.reset = () => { s = seed | 0 }
  return next
}
