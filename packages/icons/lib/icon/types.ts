import { icons } from './icons';

export type IconSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type IconKind =
  | 'primary'
  | 'subtle'
  | 'inverted'
  | 'inverted-subtle'
  | 'link'
  | 'success'
  | 'warning'
  | 'error'
  | 'negative'
  | 'positive'
  | 'action-primary'
  | 'action-negative'
  | 'action-positive'
  | 'action-warning'
  | 'action-neutral';
export type Tabler = keyof (typeof icons)['tabler'];
export type Material = keyof (typeof icons)['material'];
