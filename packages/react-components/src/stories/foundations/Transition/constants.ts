import {
  TransitionDelayToken,
  TransitionDelayTokenKey,
  TransitionDurationToken,
  TransitionDurationTokenKey,
  TransitionTimingToken,
  TransitionTimingTokenKey,
} from '../../../foundations/transition-token';

import {
  TransitionDelayShape,
  TransitionDurationShape,
  TransitionTimingShape,
} from './types';

interface DescriptionBody {
  desc: string;
  value: string;
}

const TransitionDurationDescription: Record<
  TransitionDurationTokenKey,
  DescriptionBody
> = {
  Fast1: {
    desc: 'Swift and immediate transitions, ideal for UI elements and quick mouse-out animations.',
    value: '100ms',
  },
  Fast2: {
    desc: 'Swift transitions for UI elements, useful for panels and user-initiated show/hide actions. (Navigation side bar, details panel)',
    value: '200ms',
  },
  Moderate1: {
    desc: 'Balanced and noticeable animations for fading in/out elements, transitions, hover effects, and button presses. Provides visual feedback without noticeable delay.',
    value: '300ms',
  },
};

const TransitionTimingDescription: Record<
  TransitionTimingTokenKey,
  DescriptionBody
> = {
  EaseIn: {
    desc: 'Show/hide side panels, details panels, navigation panels. Ideal for gentle entrances, like fading in elements or expanding menus, expanding details panel',
    value: 'ease-in',
  },
  EaseOut: {
    desc: 'Suited for subtle exits, like fading out elements or collapsing menus/details panel',
    value: 'ease-out',
  },
};

const TransitionDelayDescription: Record<
  TransitionDelayTokenKey,
  DescriptionBody
> = {
  Instant: {
    desc: 'Immediate Feedback. When tooltips provide instant feedback or brief contextual information that users need right away. For example, tooltip feedback show/hide on button hover.',
    value: '50ms',
  },
  Moderate: {
    desc: 'Balanced Interaction (default). Tooltip for elements that provide more information or context but still require a relatively quick response. Useful for tooltips on form inputs or icons indicating actions.',
    value: '400ms',
  },
  Slow: {
    desc: 'Deliberate Exploration. Tooltips for elements where users are likely to take their time exploring additional details. Suitable for tooltips on complex charts, maps, or educational content.',
    value: '800ms',
  },
};

export const TransitionDurationTokens: TransitionDurationShape[] =
  Object.entries(TransitionDurationToken).map(([key, token]) => ({
    enum: key as TransitionDurationTokenKey,
    token,
    value:
      TransitionDurationDescription[key as TransitionDurationTokenKey].value,
    desc: TransitionDurationDescription[key as TransitionDurationTokenKey].desc,
  }));

export const TransitionTimingTokens: TransitionTimingShape[] = Object.entries(
  TransitionTimingToken
).map(([key, token]) => ({
  enum: key as TransitionTimingTokenKey,
  token,
  value: TransitionTimingDescription[key as TransitionTimingTokenKey].value,
  desc: TransitionTimingDescription[key as TransitionTimingTokenKey].desc,
}));

export const TransitionDelayTokens: TransitionDelayShape[] = Object.entries(
  TransitionDelayToken
).map(([key, token]) => ({
  enum: key as TransitionDelayTokenKey,
  token,
  value: TransitionDelayDescription[key as TransitionDelayTokenKey].value,
  desc: TransitionDelayDescription[key as TransitionDelayTokenKey].desc,
}));
