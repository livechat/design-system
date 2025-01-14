const isChromaticEnv = () => {
  return typeof process !== 'undefined' && process.env.CHROMATIC_ENV === 'true';
};

export const customHeightForChromatic = (height: string): string => {
  return isChromaticEnv() ? height : 'auto';
};

export const customWidthForChromatic = (
  chromaticWidth: string,
  defaultWidth: string
): string => {
  return isChromaticEnv() ? chromaticWidth : defaultWidth;
};
