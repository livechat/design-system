import {
  SpacingToken,
  SpacingTokenKey,
} from '../../../foundations/spacing-token';

import { SpacingShape } from './types';

const SpacingDescription: Record<
  SpacingTokenKey,
  { desc: string; size: string }
> = {
  Spacing0: { desc: 'When objects are not separated', size: '0px' },
  Spacing05: {
    desc: 'Use for really small spaces, where every pixel counts, Icon and label, content inside same component',
    size: '2px',
  },
  Spacing1: {
    desc: 'Use for really small spaces, where every pixel counts, Icon and label, content inside same component',
    size: '4px',
  },
  Spacing2: {
    desc: 'Use for really small spaces, where every pixel counts, Icon and label, content inside same component',
    size: '8px',
  },
  Spacing3: {
    desc: 'Use for inner paddings in smaller components, for example tooltips',
    size: '12px',
  },
  Spacing4: {
    desc: 'Use for inner paddings in medium components, for example cards or as margins on mobile devices',
    size: '16px',
  },
  Spacing5: {
    desc: 'Container spacing. Use for inner paddings in larger components, for example modals',
    size: '20px',
  },
  Spacing6: {
    desc: 'Container spacing. Use to separate the content, for examples sections in settings, or for margins on desktop',
    size: '24px',
  },
  Spacing7: {
    desc: 'Container spacing. Use to separate the content where space is not limiting you, or when you need more obvious distinction between components',
    size: '28px',
  },
  Spacing8: {
    desc: 'Between sections or blocks. Use to separate the content where space is not limiting you, or when you need more obvious distinction between components',
    size: '32px',
  },
  Spacing9: {
    desc: 'Use to separate the content where space is not limiting you, or when you need more obvious distinction between components',
    size: '36px',
  },
  Spacing10: {
    desc: 'Use to separate the content where space is not limiting you, or when you need more obvious distinction between components',
    size: '40px',
  },
  Spacing11: {
    desc: 'Use to separate the content where space is not limiting you, or when you need more obvious distinction between components',
    size: '44px',
  },
  Spacing12: {
    desc: 'Use for larger margins for example in empty states',
    size: '48px',
  },
  Spacing14: { desc: 'Use to represent additional data', size: '56px' },
  Spacing16: { desc: 'Use to represent additional data', size: '64px' },
  Spacing18: { desc: 'Use to represent additional data', size: '72px' },
  Spacing20: { desc: 'Use to represent additional data', size: '80px' },
  Spacing24: { desc: 'Use to represent additional data', size: '96px' },
};

export const SpacingTokens: SpacingShape[] = Object.entries(SpacingToken).map(
  ([key, token]) => ({
    enum: key as SpacingTokenKey,
    token: token,
    size: SpacingDescription[key as SpacingTokenKey]?.size,
    desc: SpacingDescription[key as SpacingTokenKey]?.desc,
  })
);
