import { CALLBACK, NODE } from './types';

// The useSharedResizeObserver is a singleton pattern that holds a single ResizeObserver instance.
// It maps nodes to their callbacks using a Map, ensuring that each observed node has its own callback.
export const useSharedResizeObserver = (() => {
  let resizeObserver: ResizeObserver | null = null;
  const callbacks = new Map<HTMLElement, CALLBACK>();

  // The observe function checks if the ResizeObserver already exists. If not, it creates one and starts observing the node.
  // The node's callback is stored in the callbacks map.
  // When the ResizeObserver triggers, it loops through each observed entry and calls the respective callback associated with that node.
  const observe = (node: NODE, callback: CALLBACK) => {
    if (!resizeObserver) {
      resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const observedNode = entry.target;
          const nodeCallback = callbacks.get(observedNode as HTMLElement);

          if (nodeCallback) {
            nodeCallback(entry.contentRect);
          }
        });
      });
    }

    if (node) {
      callbacks.set(node, callback);
      resizeObserver.observe(node);
    }
  };

  // The unobserve function stops observing the node and removes its callback from the map.
  // If no more nodes are being observed, the ResizeObserver is disconnected and set to null.
  const unobserve = (node: NODE) => {
    if (resizeObserver && node) {
      resizeObserver.unobserve(node);
      callbacks.delete(node);

      if (callbacks.size === 0) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
    }
  };

  return {
    observe,
    unobserve,
  };
})();
