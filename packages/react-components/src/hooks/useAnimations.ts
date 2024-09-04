import * as React from 'react';

interface UseAnimationsProps {
  isVisible: boolean;
  elementRef: React.RefObject<HTMLDivElement>;
}

interface IUseAnimations {
  isOpen: boolean;
  isMounted: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useAnimations = ({
  isVisible,
  elementRef,
}: UseAnimationsProps): IUseAnimations => {
  const [isMounted, setIsMounted] = React.useState(isVisible);
  const [isOpen, setIsOpen] = React.useState(isVisible);

  // The main part of the logic responsible for managing the states used to animate the container opening/closing and mounting/unmounting the container elements
  React.useEffect(() => {
    const currentElement = elementRef.current;

    if (!isOpen && currentElement) {
      const handleTransitionEnd = () => setIsMounted(false);

      currentElement.addEventListener('transitionend', handleTransitionEnd);

      return () => {
        currentElement.removeEventListener(
          'transitionend',
          handleTransitionEnd
        );
      };
    }

    if (isOpen) {
      setIsMounted(true);
      requestAnimationFrame(() => setIsOpen(true));

      return;
    }

    return setIsOpen(false);
  }, [isOpen]);

  // Additional logic, dedicated to the container wrapper whose visibility is managed by the context
  React.useEffect(() => {
    if (isVisible) {
      setIsMounted(true);
      requestAnimationFrame(() => setIsOpen(true));

      return;
    }

    return setIsOpen(false);
  }, [isVisible]);

  return {
    isOpen,
    isMounted,
    setIsOpen,
  };
};
