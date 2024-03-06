import * as React from 'react';

import cx from 'clsx';

import styles from './Skeleton.module.scss';

const baseClass = 'skeleton-text';

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
    className={cx(styles[`${baseClass}`], {
      [styles[`${baseClass}--animated`]]: animated,
    })}
    style={{
      height,
      width,
    }}
  />
);
