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
        start: '#8609ff',
        stop: '#ee0007',
      };
    case 'gradient02':
      return {
        start: '#8609ff',
        stop: '#0059e1',
      };
    case 'gradient03':
      return {
        start: '#ca0005',
        stop: '#f3c600',
      };
    case 'gradient04':
      return {
        start: '#ffe9bc',
        stop: '#fffdf8',
      };
    case 'gradient05':
      return {
        start: '#daedff',
        stop: '#fbfdff',
      };
    case 'gradient06':
      return {
        start: '#eee8ff',
        stop: '#fdfdff',
      };
    case 'gradient07':
      return {
        start: '#d1f4d5',
        stop: '#e6f6ed',
      };
    case 'gradient08':
      return {
        start: '#ffe5e5',
        stop: '#fffcfc',
      };
    case 'gradient09':
      return {
        start: '#d1f4d5',
        stop: '#fff9ee',
      };
    case 'gradient10':
      return {
        start: '#eee8ff',
        stop: '#f4faff',
      };
    case 'gradient11':
      return {
        start: '#eee8ff',
        stop: '#fff4dd',
      };
    default:
      return;
  }
};
