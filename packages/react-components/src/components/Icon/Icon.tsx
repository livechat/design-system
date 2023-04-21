import * as React from 'react';
import cx from 'clsx';
import styles from './Icon.module.scss';

export type IconSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type IconKind =
  | 'primary'
  | 'subtle'
  | 'inverted'
  | 'inverted-subtle'
  | 'link'
  | 'success'
  | 'warning'
  | 'error';

const IconSizeMap: Record<IconSize, { width: number; height: number }> = {
  xsmall: {
    width: 12,
    height: 12,
  },
  small: {
    width: 16,
    height: 16,
  },
  medium: {
    width: 20,
    height: 20,
  },
  large: {
    width: 24,
    height: 24,
  },
  xlarge: {
    width: 32,
    height: 32,
  },
};

export type IconSource = React.FC<React.SVGProps<SVGSVGElement>> &
  React.ReactElement;
export interface IconProps {
  source: IconSource;
  size?: IconSize;
  kind?: IconKind;
  disabled?: boolean;
  className?: string;
  customColor?: string;
}

const baseClass = 'icon';

export const Icon: React.FC<IconProps> = (props) => {
  const {
    source,
    size = 'medium',
    kind,
    disabled,
    className,
    customColor,
    ...restProps
  } = props;

  const GeneratedIcon = React.createElement(source, {
    ...IconSizeMap[size],
    color: customColor,
  });

  const mergedClassNames = cx(
    className,
    styles[baseClass],
    kind && styles[`${baseClass}--${disabled ? 'disabled--' : ''}${kind}`]
  );

  return (
    <span {...restProps} className={mergedClassNames}>
      {GeneratedIcon}
    </span>
  );
};

export default Icon;
