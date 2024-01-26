import { RadiusToken, RadiusTokenKey } from '../../../foundations/radius-token';

import { RadiusShape } from './types';

const RadiusDescription: Record<
  RadiusTokenKey,
  { desc: string; size: string }
> = {
  '0': { desc: '', size: '' },
  '1': { desc: '', size: '' },
  '2': { desc: '', size: '' },
  '3': { desc: '', size: '' },
  '4': { desc: '', size: '' },
  Radius0: { desc: '', size: '' },
  Radius1: { desc: '', size: '' },
  Radius2: { desc: '', size: '' },
  Radius3: { desc: '', size: '' },
  Radius4: { desc: '', size: '' },
};

export const RadiusTokens: RadiusShape[] = Object.entries(RadiusToken).map(
  ([key, value]) => ({
    enum: key as RadiusTokenKey,
    value,
    size: RadiusDescription[key as RadiusTokenKey]?.size,
    desc: RadiusDescription[key as RadiusTokenKey]?.desc,
  })
);
