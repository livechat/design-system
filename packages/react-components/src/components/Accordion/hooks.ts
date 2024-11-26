import * as React from 'react';

interface UseAccordionProps {
  isControlled: boolean;
  isExpanded: boolean;
  setShouldBeVisible: (isVisible: boolean) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

interface IUseAccordion {
  handleExpandChange: (isExpanded: boolean) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

export const useAccordion = ({
  isControlled,
  isExpanded,
  setShouldBeVisible,
  onOpen,
  onClose,
}: UseAccordionProps): IUseAccordion => {
  const handleExpandChange = (isExpanded: boolean) => {
    if (isExpanded) {
      onClose?.();
    } else {
      onOpen?.();
    }
    !isControlled && setShouldBeVisible(!isExpanded);
  };

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (
        (!isExpanded && (event.key === 'Enter' || event.key === ' ')) ||
        (isExpanded && event.key === 'Escape')
      ) {
        handleExpandChange(isExpanded);
      }
    },
    [isExpanded, handleExpandChange]
  );

  return {
    handleExpandChange,
    handleKeyDown,
  };
};
