import { HTMLAttributes, useMemo, Suspense, FC, createElement } from 'react';

import cx from 'clsx';

import { BASE_CLASS, IconSizeMap } from './constants';
import { icons } from './icons';
import { IconSize, IconKind } from './types';

import styles from './Icon.module.scss';

export type IconSet = keyof typeof icons;
export type IconName = keyof (typeof icons)[IconSet];

interface Props extends HTMLAttributes<HTMLDivElement> {
  set?: IconSet;
  icon: IconName;
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

export const Icon: FC<Props> = ({
  set = 'tabler',
  icon,
  className,
  kind,
  disabled,
  size = 'medium',
  customColor,
  ...rest
}: Props) => {
  const SvgIcon = useMemo(() => icons[set][icon], [set, icon]);
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
      <Suspense fallback={<div>icon is loading...</div>}>
        {GeneratedIcon}
      </Suspense>
    </span>
  );
};
