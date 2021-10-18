import * as React from 'react';

export enum IconSizeName {
  XSmall = 'xsmall',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  XLarge = 'xlarge',
}

export const IconSize = {
  [IconSizeName.XSmall]: {
    width: 12,
    height: 12,
  },
  [IconSizeName.Small]: {
    width: 16,
    height: 16,
  },
  [IconSizeName.Medium]: {
    width: 20,
    height: 20,
  },
  [IconSizeName.Large]: {
    width: 24,
    height: 24,
  },
  [IconSizeName.XLarge]: {
    width: 32,
    height: 32,
  },
};

export enum IconTypeName {
  Primary = 'primary',
  Subtle = 'subtle',
  Inverted = 'inverted',
  InvertedSubtle = 'inverted_subtle',
  Link = 'link',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export const IconColorMapper = {
  [IconTypeName.Primary]: '#424d57',
  [IconTypeName.Subtle]: '#677179',
  [IconTypeName.Inverted]: '#fff',
  [IconTypeName.InvertedSubtle]: '#c6cacd',
  [IconTypeName.Link]: '#4384f5',
  [IconTypeName.Success]: '#4bb678',
  [IconTypeName.Warning]: '#efa842',
  [IconTypeName.Error]: '#d64646',
};

export const IconColorDisabledMapper = {
  [IconTypeName.Primary]: '#686d72',
  [IconTypeName.Subtle]: '#a0a6ab',
  [IconTypeName.Inverted]: '#dbdbdb',
  [IconTypeName.InvertedSubtle]: '#a0a6ab',
  [IconTypeName.Link]: '#c3d7fa',
  [IconTypeName.Success]: '#4bb678',
  [IconTypeName.Warning]: '#efa842',
  [IconTypeName.Error]: '#d64646',
};

export interface IIconProps {
  source: React.FC<React.SVGProps<SVGSVGElement>> | string;
  size?: IconSizeName;
  iconType?: IconTypeName;
  disabled?: boolean;
  className?: string;
}

export const Icon: React.FC<IIconProps> = (props) => {
  const {
    source,
    size = IconSizeName.Medium,
    iconType = IconTypeName.Primary,
    disabled,
    className,
    ...restProps
  } = props;
  let filledColor = IconColorMapper[iconType];

  if (disabled) {
    filledColor = IconColorDisabledMapper[iconType];
  }

  const GeneratedIcon = React.createElement(source, {
    ...IconSize[size],
    color: filledColor,
  });

  return (
    <span {...restProps} className={className}>
      {GeneratedIcon}
    </span>
  );
};

export default Icon;
