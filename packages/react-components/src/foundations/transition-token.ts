export const TransitionDurationToken = {
  Fast1: '--transition-duration-fast-1',
  Fast2: '--transition-duration-fast-2',
  Moderate1: '--transition-duration-moderate-1',
};

export type TransitionDurationTokenKey = keyof typeof TransitionDurationToken;

export const TransitionTimingToken = {
  EaseIn: '--transition-timing-ease-in',
  EaseOut: '--transition-timing-ease-out',
};

export type TransitionTimingTokenKey = keyof typeof TransitionTimingToken;

export const TransitionDelayToken = {
  Instant: '--delay-instant',
  Moderate: '--delay-moderate',
  Slow: '--delay-slow',
};

export type TransitionDelayTokenKey = keyof typeof TransitionDelayToken;
