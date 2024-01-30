import { TransitionDurationToken } from '../../../foundations/transition-token';

export const durationEntries = Object.entries(TransitionDurationToken);
export const durationUseCases = new Map([
  [
    TransitionDurationToken.Fast1,
    {
      description:
        'Swift and immediate transitions, ideal for UI elements and quick mouse-out animations.',
      value: 100,
    },
  ],
  [
    TransitionDurationToken.Fast2,
    {
      description:
        'Swift transitions for UI elements, useful for panels and user-initiated show/hide actions. (Navigation side bar, details panel)',
      value: 200,
    },
  ],
  [
    TransitionDurationToken.Moderate1,
    {
      description:
        'Balanced and noticeable animations for fading in/out elements, transitions, hover effects, and button presses. Provides visual feedback without noticeable delay.',
      value: 300,
    },
  ],
]);
