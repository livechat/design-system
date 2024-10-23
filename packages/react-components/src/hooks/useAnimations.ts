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

  const handleTransitionEnd = () => setIsMounted(false);

  // The main part of the logic responsible for managing the states used to animate the container opening/closing and mounting/unmounting the container elements
  React.useEffect(() => {
    const currentElement = elementRef.current;

    if (!shouldBeVisible && currentElement) {
      currentElement.addEventListener('transitionend', handleTransitionEnd);
      setIsOpen(false);

      return () => {
        currentElement.removeEventListener(
          'transitionend',
          handleTransitionEnd
        );
      };
    }

    if (shouldBeVisible) {
      setIsMounted(true);
      requestAnimationFrame(() => setIsOpen(true));

      return;
    }
  }, [shouldBeVisible]);

  // Additional logic, dedicated to the container wrapper whose visibility is managed by the context
  React.useEffect(() => {
    setShouldBeVisible(isVisible);
  }, [isVisible]);

  return {
    isOpen,
    isMounted,
    setShouldBeVisible,
  };
};
