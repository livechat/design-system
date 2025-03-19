import * as React from 'react';

import styles from './GridVisualizer.module.scss';

interface GridVisualizerProps {
  children: React.ReactNode;
  showGrid?: boolean;
}

const GRID_COLUMNS = 12;

const BREAKPOINTS = {
  sm: 320,
  md: 672,
  lg: 1024,
  xlg: 1312,
  max: 1584,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

const getBreakpoint = (width: number): Breakpoint => {
  if (width < BREAKPOINTS.md) return 'sm';
  if (width < BREAKPOINTS.lg) return 'md';
  if (width < BREAKPOINTS.xlg) return 'lg';
  if (width < BREAKPOINTS.max) return 'xlg';
  return 'max';
};

/**
 * GridVisualizer is a component that displays a grid overlay on the screen.
 * It is used ONLY in the storybook to visualize the grid system and the columns.
 */
export const GridVisualizer: React.FC<GridVisualizerProps> = ({
  children,
  showGrid = false,
}) => {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint>('lg');
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const currentWidth = window.innerWidth;
      setWidth(currentWidth);
      setBreakpoint(getBreakpoint(currentWidth));
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);

    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return (
    <div className={styles.wrapper}>
      {showGrid && (
        <>
          <div className={styles.gridOverlay}>
            <div className={styles.gridContainer}>
              {Array.from({ length: GRID_COLUMNS }).map((_, i) => (
                <div key={i} className={styles.gridColumn}>
                  <div className={styles.gridColumnInner} />
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.gridInfo}>
            Current grid: {GRID_COLUMNS} columns ({breakpoint} - {width}px)
          </div>
        </>
      )}
      {children}
    </div>
  );
};
