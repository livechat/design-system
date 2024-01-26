import { DesignToken, DesignTokenKey } from '../../../themes/design-token';

import { ColorGroup, ColorShape } from './types';

export const ColorsTokens: ColorShape[] = Object.entries(DesignToken)
  .map(([key, value]) => ({
    enum: key as DesignTokenKey,
    value,
    desc: 'Temporary description',
    group: ColorGroup.Other,
  }))
  .sort((a, b) => a.enum.localeCompare(b.enum));
