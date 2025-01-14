import isChromatic from 'chromatic/isChromatic';

export const customHeightForChromatic = (height: string): string => {
  return isChromatic() ? height : 'auto';
};

export const customWidthForChromatic = (
  chromaticWidth: string,
  defaultWidth: string
): string => {
  return isChromatic() ? chromaticWidth : defaultWidth;
};
