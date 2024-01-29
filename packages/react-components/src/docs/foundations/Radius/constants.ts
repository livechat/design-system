import { RadiusToken, RadiusTokenKey } from '../../../foundations/radius-token';
import { sortDeprecated } from '../../helpers';

import { RadiusShape } from './types';

const RadiusDescription: Record<
  RadiusTokenKey,
  { desc: string; size: string; deprecated?: boolean }
> = {
  '0': { desc: '', size: '', deprecated: true },
  '1': { desc: '', size: '', deprecated: true },
  '2': { desc: '', size: '', deprecated: true },
  '3': { desc: '', size: '', deprecated: true },
  '4': { desc: '', size: '', deprecated: true },
  Radius0: { desc: '', size: '' },
  Radius1: { desc: '', size: '' },
  Radius2: { desc: '', size: '' },
  Radius3: { desc: '', size: '' },
  Radius4: { desc: '', size: '' },
};

export const RadiusTokens: RadiusShape[] = Object.entries(RadiusToken)
  .map(([key, value]) => ({
    enum: key as RadiusTokenKey,
    value,
    size: RadiusDescription[key as RadiusTokenKey]?.size,
    desc: RadiusDescription[key as RadiusTokenKey]?.desc,
    deprecated: RadiusDescription[key as RadiusTokenKey]?.deprecated,
  }))
  .sort(sortDeprecated);
