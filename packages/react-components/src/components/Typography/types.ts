export type TTextSize = 'xs' | 'sm' | 'md' | 'lg';
export const HEADING_SIZES = [
  'xl',
  'lg',
  'md',
  'sm',
  'xs',
  '2xs',
  '3xs',
] as const;
export type THeadingSize = (typeof HEADING_SIZES)[number];
export type TDisplaySize = 'sm' | 'md' | 'lg' | 'max';
export type TTextAlign = 'left' | 'right' | 'center' | 'justify';
