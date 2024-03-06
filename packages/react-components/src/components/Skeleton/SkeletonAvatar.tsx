import * as React from 'react';

import cx from 'clsx';

import styles from './Skeleton.module.scss';

const baseClass = 'skeleton-avatar';

export interface ISkeletonAvatar {
  /**
   * Specify if the element is square shape
   */
  square?: boolean;
  /**
   * Specify the size of the element (wdith and height in px)
   */
  size?: number;
  /**
   * Specify if the animation is enabled
   */
  animated?: boolean;
}

export const SkeletonAvatar: React.FC<ISkeletonAvatar> = ({
  square = false,
  size = 16,
  animated,
}) => (
  <div
    className={cx(styles[`${baseClass}`], {
      [styles[`${baseClass}--square`]]: square,
      [styles[`${baseClass}--animated`]]: animated,
    })}
    style={{
      width: size,
      height: size,
    }}
  />
);
