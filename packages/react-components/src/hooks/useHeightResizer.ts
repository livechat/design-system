import * as React from 'react';

import { resizeCallback } from './helpers';
import { IUseHeightResizer, NODE } from './types';

export const useHeightResizer = (): IUseHeightResizer => {
  const [size, setSize] = React.useState<number>(0);

  const handleResize = React.useCallback(
    (node: NODE) =>
      resizeCallback(node, (newSize: DOMRectReadOnly) =>
        setSize(newSize.height)
      ),
    []
  );

  return {
    size,
    handleResize,
  };
};
