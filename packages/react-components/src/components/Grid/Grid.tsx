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
   * Horizontal spacing between columns (in pixels)
   */
  horizontalSpacing?: number;
  /**
   * Vertical spacing between rows (in pixels)
   */
  verticalSpacing?: number;
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
  horizontalSpacing,
  verticalSpacing,
  align,
  justify,
  style,
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
    ...style,
    '--grid-h-spacing': horizontalSpacing ? `${horizontalSpacing}px` : null,
    '--grid-v-spacing': verticalSpacing ? `${verticalSpacing}px` : null,
  } as React.CSSProperties;

  return (
    <div className={gridClasses} style={gridStyle} {...rest}>
      {children}
    </div>
  );
};
