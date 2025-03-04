import * as React from 'react';

import styles from './GridVisualizer.module.scss';

interface GridVisualizerProps {
  children: React.ReactNode;
  showGrid?: boolean;
}

const getColumnCount = (
  width: number
): { count: number; breakpoint: string } => {
  if (width < 672) return { count: 4, breakpoint: 'sm' };
  if (width < 1024) return { count: 8, breakpoint: 'md' };
  return { count: 16, breakpoint: 'lg' };
};

export const GridVisualizer: React.FC<GridVisualizerProps> = ({
  children,
  showGrid = false,
}) => {
  const [gridInfo, setGridInfo] = React.useState({
    count: 16,
    breakpoint: 'lg',
  });

  React.useEffect(() => {
    const updateGridInfo = () => {
      setGridInfo(getColumnCount(window.innerWidth));
    };

    updateGridInfo();
    window.addEventListener('resize', updateGridInfo);

    return () => window.removeEventListener('resize', updateGridInfo);
  }, []);

  return (
    <div className={styles.wrapper}>
      {showGrid && (
        <>
          <div className={styles.gridOverlay}>
            <div className={styles.gridContainer}>
              {Array.from({ length: gridInfo.count }).map((_, i) => (
                <div key={i} className={styles.gridColumn}>
                  <div className={styles.gridColumnInner} />
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.gridInfo}>
            Current grid: {gridInfo.count} columns ({gridInfo.breakpoint})
          </div>
        </>
      )}
      {children}
    </div>
  );
};
