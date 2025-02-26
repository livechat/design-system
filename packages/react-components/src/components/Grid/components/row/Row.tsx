import * as React from 'react';

import cx from 'clsx';

import styles from './Row.module.scss';

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Additional custom className
   */
  className?: string;
  /**
   * Child elements
   */
  children?: React.ReactNode;
}

export const Row: React.FC<RowProps> = ({ className, children, ...rest }) => {
  const rowClasses = cx(styles.row, className);

  return (
    <div className={rowClasses} {...rest}>
      {children}
    </div>
  );
};
