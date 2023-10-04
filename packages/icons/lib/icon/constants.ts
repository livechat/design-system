import { IconSize } from './types';

export const BASE_CLASS = 'icon';

export const IconSizeMap: Record<IconSize, { width: number; height: number }> =
  {
    xsmall: {
      width: 12,
      height: 12,
    },
    small: {
      width: 16,
      height: 16,
    },
    medium: {
      width: 20,
      height: 20,
    },
    large: {
      width: 24,
      height: 24,
    },
    xlarge: {
      width: 32,
      height: 32,
    },
  };
