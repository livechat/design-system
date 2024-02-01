import { ColorsTokens } from './constants';
import { ColorGroup, ColorShape } from './types';

export const getColorsByGroup = (group: ColorGroup): ColorShape[] => {
  return ColorsTokens.filter((color) => color.group === group).sort((a, b) =>
    a.enum.localeCompare(b.enum)
  );
};
