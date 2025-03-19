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
  // TODO rename to gutter
  /**
   * Spacing props
   */
  spacing?: {
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xlg?: string | number;
    max?: string | number;
  };
}

const getSpacingValue = (
  spacing: string | number | undefined,
  breakpoint: string
): string => {
  if (!spacing) return `var(--grid-spacing-${breakpoint})`;
  return typeof spacing === 'number' ? `${spacing}px` : spacing;
};

export const Grid: React.FC<GridProps> = ({
  className,
  children,
  align,
  justify,
  spacing,
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

  // Calculate the current spacing
  const style = {
    '--grid-gutter': getSpacingValue(
      spacing?.[currentBreakpoint as keyof typeof spacing],
      currentBreakpoint
    ),
  } as React.CSSProperties;

  return (
    <div ref={containerRef} className={gridClasses} {...rest} style={style}>
      {children}
    </div>
  );
};
