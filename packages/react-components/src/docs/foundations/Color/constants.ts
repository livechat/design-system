import { DesignToken, DesignTokenKey } from '../../../themes/design-token';

import { ColorGroup, ColorShape } from './types';

const ColorBaseVariants = Object.entries(DesignToken).map(([key, value]) => ({
  enum: key as DesignTokenKey,
  value,
}));

export const ColorsTokens: ColorShape[] = ColorBaseVariants.map((color) => ({
  ...color,
  desc: 'Temporary description',
  group: ColorGroup.Other,
})).sort((a, b) => a.enum.localeCompare(b.enum));
