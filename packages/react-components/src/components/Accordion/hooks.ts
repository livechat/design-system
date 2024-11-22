import * as React from 'react';

interface UseAccordionProps {
  isControlled: boolean;
  isExpanded: boolean;
  setShouldBeVisible: React.Dispatch<React.SetStateAction<boolean>>;
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
      !isControlled && setShouldBeVisible(false);
    } else {
      onOpen?.();
      !isControlled && setShouldBeVisible(true);
    }
  };

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isExpanded && (event.key === 'Enter' || event.key === ' ')) {
        handleExpandChange(isExpanded);
      }

      if (isExpanded && event.key === 'Escape') {
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
