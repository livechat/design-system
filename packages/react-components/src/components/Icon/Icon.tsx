import * as React from 'react';

import cx from 'clsx';

import { IconSource } from './types';

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
  | 'error'
  | 'negative'
  | 'positive'
  | 'action-primary'
  | 'action-negative'
  | 'action-positive'
  | 'action-warning'
  | 'action-neutral'
  | 'lock-black';

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

export interface IconProps {
  /**
   * Specify the source of svg element
   */
  source: IconSource;
  /**
   * Specify the icon size
   */
  size?: IconSize;
  /**
   * Specify the icon kind
   */
  kind?: IconKind;
  /**
   * Specify whether the icon should be disabled
   */
  disabled?: boolean;
  /**
   * The CSS class for icon
   */
  className?: string;
  /**
   * Set the icon custom color
   */
  customColor?: string;
}

const baseClass = 'icon';

export const Icon: React.FC<React.PropsWithChildren<IconProps>> = (props) => {
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
    ...(customColor ? { color: customColor } : {}),
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
