import * as React from 'react';

import cx from 'clsx';

import styles from './Skeleton.module.scss';

const baseClass = 'skeleton-wrapper';

export interface ISkeletonWrapper extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The children elements to be wrapped by the skeleton wrapper
   */
  children: React.ReactNode;
  /**
   * Specify if the skeleton wrapper should display children elements vertically
   */
  vertical?: boolean;
  /**
   * Specify if the animation is enabled, it will be passed to the children skeleton components
   */
  animated?: boolean;
}

export const SkeletonWrapper: React.FC<
  React.PropsWithChildren<ISkeletonWrapper>
> = ({ children, vertical, animated, ...props }) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement, {
        animated,
      });
    }

    return child;
  });

  return (
    <div
      className={cx(styles[`${baseClass}`], {
        [styles[`${baseClass}--vertical`]]: vertical,
      })}
      {...props}
    >
      {childrenWithProps}
    </div>
  );
};
