import { TransitionTimingToken } from '../../../foundations/transition-token';

export const timingEntries = Object.entries(TransitionTimingToken);
export const timingUseCases = new Map([
  [
    TransitionTimingToken.EaseOut,
    {
      description:
        'Ideal for gentle entrances, like fading in elements or expanding menus, expanding details panel',
      value: 'easy-out',
    },
  ],
  [
    TransitionTimingToken.EaseIn,
    {
      description:
        'Suited for subtle exits, like fading out elements or collapsing menus/details panel',
      value: 'easy-in',
    },
  ],
]);
