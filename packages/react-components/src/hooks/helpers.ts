import { NODE } from './types';
import { useSharedResizeObserver } from './useSharedResizeObserver';

export const resizeCallback = (
  node: NODE,
  handler: (newSize: DOMRectReadOnly) => void
): void => {
  const hasIOSupport = !!window.ResizeObserver;
  if (!hasIOSupport) return;

  if (node !== null) {
    useSharedResizeObserver.observe(node, (newSize: DOMRectReadOnly) => {
      handler(newSize);
    });
  } else {
    useSharedResizeObserver.unobserve(node);
  }
};
