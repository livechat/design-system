import { RadiusToken, RadiusTokenKey } from '../../../foundations/radius-token';
import { sortDeprecated } from '../../helpers';

import { RadiusShape } from './types';

const RadiusDescription: Record<
  RadiusTokenKey,
  { desc: string; size: string; deprecated?: boolean }
> = {
  '0': {
    desc: 'Sharp corners, when component has no border radius: This suggests that certain components should have no rounded corners, meaning they should have sharp, square corners without any curvature.',
    size: '0px',
    deprecated: true,
  },
  '1': {
    desc: 'Nested tags. For nested component like tag inside input: This description indicates that a 4-pixel border radius is suitable for components like tags placed inside input elements, implying a slight curvature for these nested elements.',
    size: '4px',
    deprecated: true,
  },
  '2': {
    desc: 'Nested buttons, nested component like button in segmented control: Similarly, using a 6-pixel border radius for components like buttons within a segmented control. This slightly rounded edge can help visually distinguish nested components.',
    size: '6px',
    deprecated: true,
  },
  '3': {
    desc: 'Default border radius for all components: This specifies an 8-pixel border radius as the default for all components, indicating that most components should have a moderate level of rounding on their corners.',
    size: '8px',
    deprecated: true,
  },
  '4': { desc: '', size: '16px', deprecated: true },
  Radius0: {
    desc: 'Sharp corners, when component has no border radius: This suggests that certain components should have no rounded corners, meaning they should have sharp, square corners without any curvature.',
    size: '0px',
  },
  Radius1: {
    desc: 'Nested tags. For nested component like tag inside input: This description indicates that a 4-pixel border radius is suitable for components like tags placed inside input elements, implying a slight curvature for these nested elements.',
    size: '4px',
  },
  Radius2: {
    desc: 'Nested buttons, nested component like button in segmented control: Similarly, using a 6-pixel border radius for components like buttons within a segmented control. This slightly rounded edge can help visually distinguish nested components.',
    size: '6px',
  },
  Radius3: {
    desc: 'Default border radius for all components: This specifies an 8-pixel border radius as the default for all components, indicating that most components should have a moderate level of rounding on their corners.',
    size: '8px',
  },
  Radius4: { desc: '', size: '16px' },
};

export const RadiusTokens: RadiusShape[] = Object.entries(RadiusToken)
  .map(([key, token]) => ({
    enum: key as RadiusTokenKey,
    token,
    size: RadiusDescription[key as RadiusTokenKey]?.size,
    desc: RadiusDescription[key as RadiusTokenKey]?.desc,
    deprecated: RadiusDescription[key as RadiusTokenKey]?.deprecated,
  }))
  .sort(sortDeprecated);
