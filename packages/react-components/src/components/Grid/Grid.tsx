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
   * Gutter spacing between grid items
   */
  gutter?: {
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
    '2xl'?: string | number;
  };
  /**
   * Margin spacing around the grid container
   */
  margin?: {
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
    '2xl'?: string | number;
  };
}

const getSpacingValue = (
  value: string | number | undefined,
  breakpoint: string,
  type: 'gutter' | 'margin'
): string => {
  if (!value) return `var(--grid-${type}-${breakpoint})`;
  return typeof value === 'number' ? `${value}px` : value;
};

export const Grid: React.FC<GridProps> = ({
  className,
  children,
  align,
  justify,
  gutter,
  margin,
  ...rest
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [currentBreakpoint, setCurrentBreakpoint] =
    React.useState<string>('sm');

  // Add resize observer to track current breakpoint
  React.useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      if (width >= 1584) setCurrentBreakpoint('max');
      else if (width >= 1312) setCurrentBreakpoint('xlg');
      else if (width >= 1024) setCurrentBreakpoint('lg');
      else if (width >= 672) setCurrentBreakpoint('md');
      else setCurrentBreakpoint('sm');
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const gridClasses = cx(
    styles.grid,
    {
      [styles[`align-${align}`]]: align,
      [styles[`justify-${justify}`]]: justify,
    },
    className
  );

  const style = {
    '--grid-gutter': getSpacingValue(
      gutter?.[currentBreakpoint as keyof typeof gutter],
      currentBreakpoint,
      'gutter'
    ),
    '--grid-margin': getSpacingValue(
      margin?.[currentBreakpoint as keyof typeof margin],
      currentBreakpoint,
      'margin'
    ),
  } as React.CSSProperties;

  return (
    <div ref={containerRef} className={gridClasses} {...rest} style={style}>
      {children}
    </div>
  );
};
