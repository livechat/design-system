import * as React from 'react';

import cx from 'clsx';

import * as styles from './styles';

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
    className={cx(
      styles.skeletonAvatar(square),
      animated && styles.animatedSkeleton
    )}
    style={{
      width: size,
      height: size,
    }}
  />
);
