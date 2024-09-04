import * as React from 'react';

interface IUseResizer {
  size: number;
  handleResize: (node: HTMLDivElement) => void;
}

export const useHeightResizer = (): IUseResizer => {
  const [size, setSize] = React.useState(0);
  const previousSizeRef = React.useRef(size);

  const handleResize = React.useCallback((node) => {
    if (node !== null) {
      const hasIOSupport = !!window.ResizeObserver;

      if (hasIOSupport) {
        const resizeObserver = new ResizeObserver((entries) => {
          const entry = entries[0];
          if (!entry) return;

          const newSize = entry.contentRect.height;

          if (previousSizeRef.current !== newSize) {
            setSize(newSize);
            previousSizeRef.current = newSize;
          }
        });

        resizeObserver.observe(node);

        return () => resizeObserver.disconnect();
      }
    }
  }, []);

  return {
    size,
    handleResize,
  };
};
