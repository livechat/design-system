import { HTMLAttributes, useMemo, Suspense, FC, createElement } from 'react';

import cx from 'clsx';

import { BASE_CLASS, IconSizeMap } from './constants';
import { icons } from './icons';
import { IconSize, IconKind, Tabler, Material } from './types';

import styles from './Icon.module.scss';

type IconSet =
  | {
      /**
       * Specify the icon set
       */
      set: 'tabler';
      /**
       * Specify the icon name
       */
      name: Tabler;
    }
  | {
      /**
       * Specify the icon set
       */
      set: 'material';
      /**
       * Specify the icon name
       */
      name: Material;
    };

interface OwnProps extends HTMLAttributes<HTMLDivElement> {
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

type Props = IconSet & OwnProps;

export const Icon: FC<Props> = ({
  set,
  name,
  className,
  kind,
  disabled,
  size = 'medium',
  customColor,
  ...rest
}: Props) => {
  const SvgIcon = useMemo(() => {
    switch (set) {
      case 'tabler':
        return icons[set][name];
      case 'material':
        return icons[set][name];
      default:
        return null;
    }
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
