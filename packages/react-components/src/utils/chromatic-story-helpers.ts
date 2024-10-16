import isChromatic from 'chromatic/isChromatic';

export const customHeightForChromatic = (height: string): string => {
  return isChromatic() ? height : 'auto';
};
