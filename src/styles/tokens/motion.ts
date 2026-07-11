export const motion = {
  durations: {
    fast: 'var(--transition-fast-duration, 150ms)',
    normal: 'var(--transition-normal-duration, 300ms)',
    slow: 'var(--transition-slow-duration, 500ms)',
  },
  easings: {
    default: 'var(--transition-easing-default, cubic-bezier(0.4, 0, 0.2, 1))',
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;
