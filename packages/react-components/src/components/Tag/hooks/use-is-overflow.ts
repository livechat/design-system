import { useState, MutableRefObject, useLayoutEffect } from 'react';

export const useIsOverflow = <T extends HTMLElement>(
  ref: MutableRefObject<T>
): boolean => {
  const [isOverflow, setIsOverflow] = useState(false);

  useLayoutEffect(() => {
    let resizeObserver: ResizeObserver | undefined;

    const checkOverflow = (): void => {
      const isOverflow =
        ref.current?.scrollHeight > ref.current?.offsetHeight ||
        ref.current?.scrollWidth > ref.current?.offsetWidth;

      setIsOverflow(isOverflow);
    };

    if (ref.current) {
      if (window.ResizeObserver) {
        resizeObserver = new ResizeObserver(checkOverflow);
        resizeObserver.observe(ref.current);
      }
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [ref]);

  return isOverflow;
};
