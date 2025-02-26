import * as React from 'react';

import cx from 'clsx';

import styles from './Grid.module.scss';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Additional custom className
   */
  className?: string;
  /**
   * Child elements
   */
  children?: React.ReactNode;
}

export const Grid: React.FC<GridProps> = ({ className, children, ...rest }) => {
  const gridClasses = cx(styles.grid, className);

  return (
    <div className={gridClasses} {...rest}>
      {children}
    </div>
  );
};
