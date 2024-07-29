import * as React from 'react';

interface UseAppFrameAnimationsProps {
  isVisible: boolean;
  elementRef: React.RefObject<HTMLDivElement>;
}

interface IUseAppFrameAnimations {
  isOpen: boolean;
  isMounted: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useAppFrameAnimations = ({
  isVisible,
  elementRef,
}: UseAppFrameAnimationsProps): IUseAppFrameAnimations => {
  const [isMounted, setisMounted] = React.useState(isVisible);
  const [isOpen, setIsOpen] = React.useState(isVisible);

  // The main part of the logic responsible for managing the states used to animate the side menu group opening/closing and mounting/unmounting the side menu elements
  React.useEffect(() => {
    const sideNavWrapper = elementRef.current;

    if (!isOpen && sideNavWrapper) {
      const handleTransitionEnd = () => setisMounted(false);

      sideNavWrapper.addEventListener('transitionend', handleTransitionEnd);

      return () => {
        sideNavWrapper.removeEventListener(
          'transitionend',
          handleTransitionEnd
        );
      };
    }

    if (isOpen) {
      setisMounted(true);
      requestAnimationFrame(() => setIsOpen(true));

      return;
    }

    return setIsOpen(false);
  }, [isOpen]);

  // Additional logic, dedicated to the side menu wrapper whose visibility is managed by the context
  React.useEffect(() => {
    if (isVisible) {
      setisMounted(true);
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
