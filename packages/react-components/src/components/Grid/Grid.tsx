import * as React from 'react';

import cx from 'clsx';

import styles from './Grid.module.scss';

type Alignment = 'start' | 'center' | 'end' | 'stretch';
type JustifyContent =
  | 'start'
  | 'center'
  | 'end'
  | 'space-between'
  | 'space-around';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Additional custom className
   */
  className?: string;
  /**
   * Child elements
   */
  children?: React.ReactNode;
  /**
   * Vertical alignment of columns
   */
  align?: Alignment;
  /**
   * Horizontal alignment of columns
   */
  justify?: JustifyContent;
}

export const Grid: React.FC<GridProps> = ({
  className,
  children,
  align,
  justify,
  ...rest
}) => {
  const gridClasses = cx(
    styles.grid,
    {
      [styles[`align-${align}`]]: align,
      [styles[`justify-${justify}`]]: justify,
    },
    className
  );

  return (
    <div className={gridClasses} {...rest}>
      {children}
    </div>
  );
};
