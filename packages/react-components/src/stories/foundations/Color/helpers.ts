import { ColorsTokens } from './constants';
import { ColorGroup, ColorShape } from './types';

export const getColorsByGroup = (group: ColorGroup): ColorShape[] => {
  const collator = new Intl.Collator(undefined, { numeric: true });

  return ColorsTokens.filter((color) => color.group === group).sort((a, b) =>
    collator.compare(a.enum, b.enum)
  );
};
