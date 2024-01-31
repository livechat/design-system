import { DesignToken, DesignTokenKey } from '../../../foundations/design-token';

import { ColorsData } from './data';
import { ColorShape } from './types';

const ColorBaseVariants = Object.entries(DesignToken).map(([key, token]) => ({
  enum: key as DesignTokenKey,
  token,
}));

// TODO: change group and desc to match the design system
export const ColorsTokens: ColorShape[] = ColorBaseVariants.map((color) => ({
  ...color,
  desc: ColorsData[color.enum]?.desc ?? '',
  group: ColorsData[color.enum]?.group,
  deprecated: ColorsData[color.enum]?.deprecated,
})).sort((a, b) => a.enum.localeCompare(b.enum));
