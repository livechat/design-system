import { DesignToken, DesignTokenKey } from '../../../foundations/design-token';

import { ColorGroup, ColorShape } from './types';

const ColorBaseVariants = Object.entries(DesignToken).map(([key, value]) => ({
  enum: key as DesignTokenKey,
  value,
}));

// TODO: change group and desc to match the design system
export const ColorsTokens: ColorShape[] = ColorBaseVariants.map((color) => ({
  ...color,
  desc: 'Temporary description',
  group: ColorGroup.Other,
})).sort((a, b) => a.enum.localeCompare(b.enum));
