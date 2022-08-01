import { getContrast } from 'polished';

export function getInitials(name = '', count = 2): string {
  return name
    .split(' ')
    .map((el) => el.charAt(0))
    .join('')
    .substring(0, count)
    .toUpperCase();
}

export function getFontColor(color: string): string {
  return getContrast(color, '#FFFFFF') > 4.5
    ? 'var(--content-white-locked)'
    : 'var(--content-subtle)';
}
