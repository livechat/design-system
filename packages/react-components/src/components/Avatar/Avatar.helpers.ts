import { getContrast } from 'polished';

const colors = Array.from(
  { length: 10 },
  (_, i) => `--surface-avatar-${i + 1}`
);

export function getBackgroundColor(initials: string): string | undefined {
  if (!initials) {
    return;
  }

  const index = initials
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return `var(${colors[index % colors.length]})`;
}

export function getInitials(name = '', count = 2): string {
  return name
    .split(' ')
    .map((el) => el.charAt(0))
    .join('')
    .substring(0, count)
    .toUpperCase();
}

export function getFontColor(color: string): string {
  let actualColor = color;

  if (color.startsWith('var(--') && color.endsWith(')')) {
    const variableName = color.slice(4, -1);

    const rootStyles = window.getComputedStyle(document.documentElement);
    actualColor = rootStyles.getPropertyValue(variableName).trim();
  }

  if (!actualColor) {
    return 'var(--color-black)';
  }

  return getContrast(actualColor, '#FFFFFF') > 3
    ? 'var(--color-white)'
    : 'var(--color-black)';
}
