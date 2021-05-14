export var IconSize: {
  XSmall: 'xsmall',
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
  XLarge: 'xlarge'
};
export var IconType: {
  Primary: 'primary',
  Inverted: 'inverted',
  Link: 'link',
  Success: 'success',
  Warning: 'warning',
  Error: 'error'
};

export type IconSizeValue = typeof IconSize[keyof typeof IconSize];
export type IconTypeValue = typeof IconType[keyof typeof IconType];

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  source: string;
  size?: IconSizeValue;
  iconType?: IconTypeValue;
  disabled?: boolean;
  className?: string;
}

export var Icon: React.ComponentType<IconProps>;