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
] as const;
export const AvatarStatuses = ['available', 'unavailable', 'unknown'] as const;
export const AvatarTypes = ['image', 'text'] as const;
export const AvatarShapes = ['circle', 'rounded-square'] as const;

export type AvatarSize = (typeof AvatarSizes)[number];
export type AvatarStatus = (typeof AvatarStatuses)[number];
export type AvatarType = (typeof AvatarTypes)[number];
export type AvatarShape = (typeof AvatarShapes)[number];
