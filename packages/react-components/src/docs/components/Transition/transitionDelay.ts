import { TransitionDelayToken } from '../../../foundations/transition-token';

export const delayEntries = Object.entries(TransitionDelayToken);
export const delayUseCases = new Map([
  [
    TransitionDelayToken.Instant,
    {
      title: 'Immediate Feedback',
      description:
        'When tooltips provide instant feedback or brief contextual information that users need right away. For example, tooltip feedback show/hide on button hover.',
      value: 50,
    },
  ],
  [
    TransitionDelayToken.Moderate,
    {
      title: 'Balanced Interaction (default)',
      description:
        'Tooltip for elements that provide more information or context but still require a relatively quick response. Useful for tooltips on form inputs or icons indicating actions.',
      value: 400,
    },
  ],
  [
    TransitionDelayToken.Slow,
    {
      title: 'Deliberate Exploration',
      description:
        'Tooltips for elements where users are likely to take their time exploring additional details. Suitable for tooltips on complex charts, maps, or educational content.',
      value: 800,
    },
  ],
]);
