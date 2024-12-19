import { useState, useLayoutEffect, useCallback, RefObject } from 'react';

import debounce from 'lodash.debounce';

import { resizeCallback } from './helpers';

export const useIsOverflow = <T extends HTMLElement>(
  ref: RefObject<T>
): boolean => {
  const [isOverflow, setIsOverflow] = useState(false);

  const checkOverflow = useCallback(() => {
    if (ref.current) {
      const isOverflowing =
        ref.current.scrollHeight > ref.current.offsetHeight ||
        ref.current.scrollWidth > ref.current.offsetWidth;
      setIsOverflow(isOverflowing);
    }
  }, [ref]);

  const checkOverflowDebounced = debounce(() => {
    checkOverflow();
  }, 100);

  useLayoutEffect(() => {
    checkOverflow();

    const node = ref.current;
    if (node) {
      resizeCallback(node, () => {
        checkOverflowDebounced();
      });
    }

    return () => {
      resizeCallback(null, () => {});
    };
  }, [ref, checkOverflowDebounced]);

  return isOverflow;
};
