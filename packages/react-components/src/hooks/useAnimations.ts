import * as React from 'react';

interface UseAnimationsProps {
  isVisible: boolean;
  elementRef: React.RefObject<HTMLDivElement>;
}

interface IUseAnimations {
  isOpen: boolean;
  isMounted: boolean;
  setShouldBeVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useAnimations = ({
  isVisible,
  elementRef,
}: UseAnimationsProps): IUseAnimations => {
  const [isMounted, setIsMounted] = React.useState(isVisible);
  const [isOpen, setIsOpen] = React.useState(isVisible);
  const [shouldBeVisible, setShouldBeVisible] = React.useState(isVisible);
  const transitionTimeout = React.useRef<number | null>(null);

  // Handle transition end, unmounting the element
  const handleTransitionEnd = () => {
    setIsMounted(false);
    if (transitionTimeout.current) {
      clearTimeout(transitionTimeout.current); // Clear fallback if transition completes
    }
  };

  // Effect to add event listener for transitionend with a fallback timer
  React.useEffect(() => {
    const currentElement = elementRef.current;

    if (!shouldBeVisible && currentElement) {
      // Set isOpen to false for closing animation
      currentElement.addEventListener('transitionend', handleTransitionEnd);
      setIsOpen(false);

      // Fallback timer in case transitionend doesn’t fire due to sleep
      transitionTimeout.current = window.setTimeout(handleTransitionEnd, 300); // Adjust duration as needed

      return () => {
        clearTimeout(transitionTimeout.current as number);
        currentElement.removeEventListener(
          'transitionend',
          handleTransitionEnd
        );
      };
    }

    if (shouldBeVisible) {
      setIsMounted(true);
      requestAnimationFrame(() => setIsOpen(true)); // Trigger opening animation
    }
  }, [shouldBeVisible]);

  // Effect to listen for visibility changes (detecting sleep/wake scenarios)
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Reset the animation state when returning to the visible state
        setShouldBeVisible(isVisible);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isVisible]);

  // Synchronize shouldBeVisible with the isVisible prop
  React.useEffect(() => {
    setShouldBeVisible(isVisible);
  }, [isVisible]);

  return {
    isOpen,
    isMounted,
    setShouldBeVisible,
  };
};
