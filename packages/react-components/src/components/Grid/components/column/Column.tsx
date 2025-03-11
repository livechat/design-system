import * as React from 'react';

import cx from 'clsx';

import styles from './Column.module.scss';

interface BaseColumnProps {
  children?: React.ReactNode;
  className?: string;
}

interface BreakpointProps {
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xlg?: number | 'auto';
  max?: number | 'auto';
  // Ensure width props can't be used with breakpoints
  width?: never;
  minWidth?: never;
  maxWidth?: never;
}

interface FixedWidthProps {
  width: string;
  // Ensure other width controls and breakpoints can't be used with fixed width
  minWidth?: never;
  maxWidth?: never;
  sm?: never;
  md?: never;
  lg?: never;
  xlg?: never;
  max?: never;
}

interface MinMaxWidthProps {
  minWidth?: string;
  maxWidth?: string;
  // Ensure fixed width and breakpoints can't be used with min/max controls
  width?: never;
  sm?: never;
  md?: never;
  lg?: never;
  xlg?: never;
  max?: never;
}

export type ColumnProps = BaseColumnProps &
  (BreakpointProps | FixedWidthProps | MinMaxWidthProps);

export const Column: React.FC<ColumnProps> = ({
  children,
  className,
  sm,
  md,
  lg,
  xlg,
  max,
  width,
  minWidth,
  maxWidth,
}) => {
  const columnClasses = cx(
    styles.column,
    {
      [styles[`columnSm${sm}`]]: sm && typeof sm === 'number',
      [styles[`columnMd${md}`]]: md && typeof md === 'number',
      [styles[`columnLg${lg}`]]: lg && typeof lg === 'number',
      [styles[`columnXlg${xlg}`]]: xlg && typeof xlg === 'number',
      [styles[`columnMax${max}`]]: max && typeof max === 'number',
      [styles.columnSmAuto]: sm === 'auto',
      [styles.columnMdAuto]: md === 'auto',
      [styles.columnLgAuto]: lg === 'auto',
      [styles.columnXlgAuto]: xlg === 'auto',
      [styles.columnMaxAuto]: max === 'auto',
      [styles.columnFixedWidth]: width,
      [styles.columnMinWidth]: minWidth,
      [styles.columnMaxWidth]: maxWidth,
    },
    className
  );

  // Create CSS custom properties for dynamic values
  const style = {
    ...(width && { '--column-width': width }),
    ...(minWidth && { '--column-min-width': minWidth }),
    ...(maxWidth && { '--column-max-width': maxWidth }),
  } as React.CSSProperties;

  return (
    <div className={columnClasses} style={style}>
      {children}
    </div>
  );
};
