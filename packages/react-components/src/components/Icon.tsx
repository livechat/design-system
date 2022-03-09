import * as React from 'react';
import cx from 'classnames';

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
  [IconTypeName.Primary]: 'primary',
  [IconTypeName.Subtle]: 'subtle',
  [IconTypeName.Inverted]: 'inverted',
  [IconTypeName.InvertedSubtle]: 'inverted-subtle',
  [IconTypeName.Link]: 'link',
  [IconTypeName.Success]: 'success',
  [IconTypeName.Warning]: 'warning',
  [IconTypeName.Error]: 'error',
};

export const IconColorDisabledMapper = {
  [IconTypeName.Primary]: 'disabled--primary',
  [IconTypeName.Subtle]: 'disabled--subtle',
  [IconTypeName.Inverted]: 'disabled--inverted',
  [IconTypeName.InvertedSubtle]: 'disabled--inverted-subtle',
  [IconTypeName.Link]: 'disabled--link',
  [IconTypeName.Success]: 'disabled--success',
  [IconTypeName.Warning]: 'disabled--warning',
  [IconTypeName.Error]: 'disabled--error',
};

export interface IIconProps {
  source: React.FC<React.SVGProps<SVGSVGElement>> | string;
  size?: IconSizeName;
  iconType?: IconTypeName;
  disabled?: boolean;
  className?: string;
  customColor?: string;
}

const baseClass = 'lc-icon';

export const Icon: React.FC<IIconProps> = (props) => {
  const {
    source,
    size = IconSizeName.Medium,
    iconType = IconTypeName.Primary,
    disabled,
    className,
    customColor,
    ...restProps
  } = props;
  let filledColor = IconColorMapper[iconType];

  if (disabled) {
    filledColor = IconColorDisabledMapper[iconType];
  }

  const GeneratedIcon = React.createElement(source, {
    ...IconSize[size],
    color: customColor,
  });

  const mergedClassNames = cx(
    className,
    baseClass,
    `${baseClass}--${filledColor}`
  );

  return (
    <span {...restProps} className={mergedClassNames}>
      {GeneratedIcon}
    </span>
  );
};

export default Icon;
