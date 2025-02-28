import * as React from 'react';

import { useSleepWakeSync } from './useSleepWakeSync';

interface UseAnimationsProps {
  isVisible: boolean;
  elementRef: React.RefObject<HTMLDivElement>;
  includeSleepWakeScenario?: boolean;
  animationDuration?: number;
}

export interface IUseAnimations {
  isOpen: boolean;
  isMounted: boolean;
  setShouldBeVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useAnimations = ({
  isVisible,
  elementRef,
  includeSleepWakeScenario = false,
  animationDuration = 300,
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
      transitionTimeout.current = window.setTimeout(
        handleTransitionEnd,
        animationDuration
      ); // Adjust duration as needed

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

  // Synchronize shouldBeVisible with the isVisible prop
  React.useEffect(() => {
    setShouldBeVisible(isVisible);
  }, [isVisible]);

  // Effect to listen for visibility changes (detecting sleep/wake scenarios)
  useSleepWakeSync(
    () => setShouldBeVisible(isVisible),
    includeSleepWakeScenario
  );

  return {
    isOpen,
    isMounted,
    setShouldBeVisible,
  };
};
