import {
  SpacingToken,
  SpacingTokenKey,
} from '../../../foundations/spacing-token';

import { SpacingShape } from './types';

const SpacingDescription: Record<
  SpacingTokenKey,
  { desc: string; size: string }
> = {
  Spacing0: { desc: '', size: '' },
  Spacing05: { desc: '', size: '' },
  Spacing1: { desc: '', size: '' },
  Spacing10: { desc: '', size: '' },
  Spacing12: { desc: '', size: '' },
  Spacing14: { desc: '', size: '' },
  Spacing16: { desc: '', size: '' },
  Spacing18: { desc: '', size: '' },
  Spacing2: { desc: '', size: '' },
  Spacing20: { desc: '', size: '' },
  Spacing24: { desc: '', size: '' },
  Spacing3: { desc: '', size: '' },
  Spacing4: { desc: '', size: '' },
  Spacing5: { desc: '', size: '' },
  Spacing6: { desc: '', size: '' },
  Spacing8: { desc: '', size: '' },
};

export const SpacingTokens: SpacingShape[] = Object.entries(SpacingToken).map(
  ([key, value]) => ({
    enum: key as SpacingTokenKey,
    value,
    size: SpacingDescription[key as SpacingTokenKey]?.size,
    desc: SpacingDescription[key as SpacingTokenKey]?.desc,
  })
);
