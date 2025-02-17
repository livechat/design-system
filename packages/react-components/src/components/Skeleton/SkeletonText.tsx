import * as React from 'react';

import cx from 'clsx';

import * as styles from './styles';

export interface ISkeletonText {
  /**
   * Specify the height of the element
   */
  height?: number;
  /**
   * Specify the width of the element
   */
  width?: number;
  /**
   * Specify if the animation is enabled
   */
  animated?: boolean;
}

export const SkeletonText: React.FC<ISkeletonText> = ({
  height = 13,
  width,
  animated,
}) => (
  <div
    className={cx(styles.skeletonText, animated && styles.animatedSkeleton)}
    style={{
      height,
      width,
    }}
  />
);
