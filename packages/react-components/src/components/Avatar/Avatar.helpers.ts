import { getContrast } from 'polished';

const colors = Array.from(
  { length: 10 },
  (_, i) => `--surface-avatar-${i + 1}`
);

export function getBackgroundColor(text?: string): string | undefined {
  if (!text) {
    return;
  }

  const index = text
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return `var(${colors[index % colors.length]})`;
}

export function getInitials(name = '', count = 2): string {
  const nameArray = name.split(/\s+/);

  if (count < 1) return '';

  // If the name has fewer words than count, return initials for all the words
  if (nameArray.length <= count) {
    return nameArray
      .map((el) => el.charAt(0))
      .join('')
      .toUpperCase();
  }

  // Take the first initial from the first name
  const initials = [nameArray[0].charAt(0)];

  // Take the remaining initials from the last (count - 1) names
  for (let i = nameArray.length - count + 1; i < nameArray.length; i++) {
    initials.push(nameArray[i].charAt(0));
  }

  return initials.join('').toUpperCase();
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
