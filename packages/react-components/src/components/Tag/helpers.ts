import { getContrast } from 'polished';

export const getCustomTextClass = (customColor?: string): string => {
  if (!customColor) {
    return '';
  }

  return getContrast(customColor, '#FFFFFF') > 4.5
    ? 'text-white'
    : 'text-black';
};

export const isGradientKind = (kind: string): boolean =>
  kind.includes('gradient');

export const getGradientValue = (
  kind: string
): { start: string; stop: string } | undefined => {
  switch (kind) {
    case 'gradient01':
      return {
        start: 'var(--surface-gradient-01-start)',
        stop: 'var(--surface-gradient-01-stop)',
      };
    case 'gradient02':
      return {
        start: 'var(--surface-gradient-02-start)',
        stop: 'var(--surface-gradient-02-stop)',
      };
    case 'gradient03':
      return {
        start: 'var(--surface-gradient-03-start)',
        stop: 'var(--surface-gradient-03-stop)',
      };
    case 'gradient04':
      return {
        start: 'var(--surface-gradient-04-start)',
        stop: 'var(--surface-gradient-04-stop)',
      };
    case 'gradient05':
      return {
        start: 'var(--surface-gradient-05-start)',
        stop: 'var(--surface-gradient-05-stop)',
      };
    case 'gradient06':
      return {
        start: 'var(--surface-gradient-06-start)',
        stop: 'var(--surface-gradient-06-stop)',
      };
    case 'gradient07':
      return {
        start: 'var(--surface-gradient-07-start)',
        stop: 'var(--surface-gradient-07-stop)',
      };
    case 'gradient08':
      return {
        start: 'var(--surface-gradient-08-start)',
        stop: 'var(--surface-gradient-08-stop)',
      };
    case 'gradient09':
      return {
        start: 'var(--surface-gradient-09-start)',
        stop: 'var(--surface-gradient-09-stop)',
      };
    case 'gradient10':
      return {
        start: 'var(--surface-gradient-10-start)',
        stop: 'var(--surface-gradient-10-stop)',
      };
    case 'gradient11':
      return {
        start: 'var(--surface-gradient-11-start)',
        stop: 'var(--surface-gradient-11-stop)',
      };
    default:
      return;
  }
};
