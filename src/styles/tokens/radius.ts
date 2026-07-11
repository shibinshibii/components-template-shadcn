export const radius = {
  none: '0px',
  sm: 'calc(var(--radius) - 4px)',
  md: 'calc(var(--radius) - 2px)',
  default: 'var(--radius)',
  lg: 'calc(var(--radius) + 2px)',
  xl: 'calc(var(--radius) + 4px)',
  full: '9999px',
} as const;
