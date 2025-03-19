import * as React from 'react';

import styles from './GridVisualizer.module.scss';

interface GridVisualizerProps {
  children: React.ReactNode;
  showGrid?: boolean;
  gutter?: string | number;
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
  gutter = 0,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState<number>(0);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
          if (entry.contentBoxSize) {
            const boxSize: ResizeObserverSize = Array.isArray(
              entry.contentBoxSize
            )
              ? entry.contentBoxSize[0]
              : entry.contentBoxSize;
            setContainerWidth(Number(boxSize.inlineSize));
          } else {
            setContainerWidth(Number(entry.contentRect.width));
          }
        }
      }
    );

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      {showGrid && (
        <>
          <div className={styles.gridOverlay}>
            <div className={styles.gridContainer} style={{ gap: gutter }}>
              {Array.from({ length: GRID_COLUMNS }).map((_, i) => (
                <div key={i} className={styles.gridColumn}>
                  <div className={styles.gridColumnInner} />
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.gridInfo}>
            Current grid: {GRID_COLUMNS} columns (
            {getBreakpoint(containerWidth)} - {containerWidth}px)
          </div>
        </>
      )}
      {children}
    </div>
  );
};
