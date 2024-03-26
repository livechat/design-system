export const AvatarSizes = [
  'xxxsmall',
  'xxsmall',
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
  'xxlarge',
  'xxxlarge',
];
export const AvatarStatuses = ['available', 'unavailable', 'unknown'];
export const AvatarTypes = ['image', 'text'];
export const AvatarShapes = ['circle', 'rounded-square'];

export type AvatarSize = (typeof AvatarSizes)[number];
export type AvatarStatus = (typeof AvatarStatuses)[number];
export type AvatarType = (typeof AvatarTypes)[number];
export type AvatarShape = (typeof AvatarShapes)[number];
