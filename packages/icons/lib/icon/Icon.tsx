import { HTMLAttributes, useMemo, Suspense, FC, createElement } from 'react';

import cx from 'clsx';

import { BASE_CLASS, IconSizeMap } from './constants';
import { icons } from './icons';
import { IconSize, IconKind, TablerIcon } from './types';

import styles from './Icon.module.scss';

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specify the icon set
   */
  set?: 'tabler';
  /**
   * Specify the icon name
   */
  name: TablerIcon;
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

export const Icon: FC<IconProps> = ({
  set = 'tabler',
  name,
  className,
  kind,
  disabled,
  size = 'medium',
  customColor,
  ...rest
}) => {
  const SvgIcon = useMemo(() => {
    return icons[set][name];
  }, [set, name]);

  if (!SvgIcon) return null;

  const mergedClassNames = cx(
    className,
    styles[BASE_CLASS],
    kind && styles[`${BASE_CLASS}--${disabled ? 'disabled--' : ''}${kind}`]
  );

  const GeneratedIcon = createElement(SvgIcon, {
    ...IconSizeMap[size],
    color: customColor,
  });

  return (
    <span {...rest} className={mergedClassNames}>
      <Suspense fallback={null}>{GeneratedIcon}</Suspense>
    </span>
  );
};
