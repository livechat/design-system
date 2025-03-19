import * as React from 'react';

import cx from 'clsx';

import styles from './Grid.module.scss';

type Alignment = 'start' | 'center' | 'end';
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
  /**
   * Gap between columns and rows
   */
  gutter?: number;
}

export const Grid: React.FC<GridProps> = ({
  className,
  children,
  align,
  justify,
  gutter = 0,
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

  const gridStyle = {
    '--grid-gutter': gutter ? `${gutter}px` : undefined,
  } as React.CSSProperties;

  return (
    <div className={gridClasses} {...rest} style={gridStyle}>
      {children}
    </div>
  );
};
