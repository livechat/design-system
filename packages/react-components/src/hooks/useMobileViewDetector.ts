import * as React from 'react';

import { resizeCallback } from './helpers';
import {
  IUseMobileViewDetector,
  IUseMobileViewDetectorProps,
  NODE,
} from './types';

export const useMobileViewDetector = ({
  mobileBreakpoint,
}: IUseMobileViewDetectorProps): IUseMobileViewDetector => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  const handleResize = React.useCallback(
    (node: NODE) =>
      resizeCallback(node, (newSize: DOMRectReadOnly) =>
        setIsMobile(newSize.width <= mobileBreakpoint)
      ),
    []
  );

  return {
    isMobile,
    handleResize,
  };
};
