import * as React from 'react';

import cx from 'clsx';

import styles from './Column.module.scss';

type ColumnSpan = boolean | number;

export interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Specify column span for different breakpoints
   */
  sm?: ColumnSpan;
  md?: ColumnSpan;
  lg?: ColumnSpan;
  xlg?: ColumnSpan;
  max?: ColumnSpan;
  /**
   * Additional custom className
   */
  className?: string;
  /**
   * Child elements
   */
  children?: React.ReactNode;
}

export const Column: React.FC<ColumnProps> = ({
  sm,
  md,
  lg,
  xlg,
  max,
  className,
  children,
  ...rest
}) => {
  const columnClasses = cx(
    styles.column,
    {
      [styles[`columnSm${sm}`]]: sm && typeof sm === 'number',
      [styles[`columnMd${md}`]]: md && typeof md === 'number',
      [styles[`columnLg${lg}`]]: lg && typeof lg === 'number',
      [styles[`columnXlg${xlg}`]]: xlg && typeof xlg === 'number',
      [styles[`columnMax${max}`]]: max && typeof max === 'number',
      [styles.columnSmAuto]: sm === true,
      [styles.columnMdAuto]: md === true,
      [styles.columnLgAuto]: lg === true,
      [styles.columnXlgAuto]: xlg === true,
      [styles.columnMaxAuto]: max === true,
    },
    className
  );

  return (
    <div className={columnClasses} {...rest}>
      {children}
    </div>
  );
};
