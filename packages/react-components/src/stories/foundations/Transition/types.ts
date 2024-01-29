import {
  TransitionDelayTokenKey,
  TransitionDurationTokenKey,
  TransitionTimingTokenKey,
} from '../../../foundations/transition-token';

export type TransitionShape = {
  enum: string;
  token: string;
  value: string;
  desc: string;
};

export type TransitionDurationShape = TransitionShape & {
  enum: TransitionDurationTokenKey;
};

export type TransitionTimingShape = TransitionShape & {
  enum: TransitionTimingTokenKey;
};

export type TransitionDelayShape = TransitionShape & {
  enum: TransitionDelayTokenKey;
};
