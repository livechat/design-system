const isChromaticEnv = () => {
  return typeof process !== 'undefined' && process.env.CHROMATIC_ENV === 'true';
};

export const customHeightForChromatic = (height: string): string => {
  const isChromatic = isChromaticEnv();

  return isChromatic ? height : 'auto';
};

export const customWidthForChromatic = (
  chromaticWidth: string,
  defaultWidth: string
): string => {
  const isChromatic = isChromaticEnv();

  return isChromatic ? chromaticWidth : defaultWidth;
};
