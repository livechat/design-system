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
  xl: 1312,
  '2xl': 1584,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

const getBreakpoint = (width: number): Breakpoint => {
  if (width < BREAKPOINTS.md) return 'sm';
  if (width < BREAKPOINTS.lg) return 'md';
  if (width < BREAKPOINTS.xl) return 'lg';
  if (width < BREAKPOINTS['2xl']) return 'xl';
  return '2xl';
};

/**
 * GridVisualizer is a component that displays a grid overlay on the screen.
 * It is used ONLY in the storybook to visualize the grid system and the columns.
 */
export const GridVisualizer: React.FC<GridVisualizerProps> = ({
  children,
  showGrid = false,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState<number>(0);
  const [currentBreakpoint, setCurrentBreakpoint] =
    React.useState<Breakpoint>('sm');

  React.useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
          let width: number;
          if (entry.contentBoxSize) {
            const boxSize: ResizeObserverSize = Array.isArray(
              entry.contentBoxSize
            )
              ? entry.contentBoxSize[0]
              : entry.contentBoxSize;
            width = Number(boxSize.inlineSize);
          } else {
            width = Number(entry.contentRect.width);
          }
          setContainerWidth(width);
          setCurrentBreakpoint(getBreakpoint(width));
        }
      }
    );

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const gutterValue = `var(--grid-gutter-${currentBreakpoint})`;
  const marginValue = `var(--grid-margin-${currentBreakpoint})`;

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      {showGrid && (
        <>
          <div className={styles.gridOverlay}>
            <div
              className={styles.gridContainer}
              style={{
                gap: gutterValue,
                margin: marginValue,
              }}
            >
              {Array.from({ length: GRID_COLUMNS }).map((_, i) => (
                <div key={i} className={styles.gridColumn}>
                  <div className={styles.gridColumnInner} />
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.gridInfo}>
            Current grid: {GRID_COLUMNS} columns ({currentBreakpoint} -{' '}
            {Math.round(containerWidth)}px)
            <br />
            Margin: {marginValue}, Gutter: {gutterValue}
          </div>
        </>
      )}
      {children}
    </div>
  );
};
