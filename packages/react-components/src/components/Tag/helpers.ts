import { getContrast } from 'polished';

export const getCustomColorStyles = (
  customColor?: string,
  outline?: boolean
) => {
  if (!customColor) {
    return {};
  }
  if (outline) {
    return {
      style: {
        backgroundColor: 'transparent',
        color: customColor,
        borderColor: customColor,
      },
    };
  }

  return { style: { backgroundColor: customColor } };
};

export const getIconCustomColor = (
  customColor?: string,
  outline?: boolean
): string | undefined => {
  if (!customColor) {
    return undefined;
  }
  if (outline) {
    return customColor;
  }

  return getContrast(customColor, '#FFFFFF') > 4.5 ? '#FFFFFF' : '#000000';
};

export const getCustomTextClass = (customColor?: string): string => {
  if (!customColor) {
    return '';
  }

  return getContrast(customColor, '#FFFFFF') > 4.5
    ? 'text-white'
    : 'text-black';
};
