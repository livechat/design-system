import { RefObject, useCallback, useEffect } from 'react';

type TUseClickOutside = (
  refObject: RefObject<HTMLDivElement>,
  onClose: () => void,
  preventClose?: (node: Node, ref: RefObject<HTMLDivElement>) => boolean
) => void;

export const useClickOutside: TUseClickOutside = (
  refObject,
  onClose,
  preventClose
) => {
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      if (
        (refObject.current && refObject.current.contains(e.target as Node)) ||
        (preventClose && preventClose(e.target as Node, refObject))
      ) {
        return;
      }

      onClose();
    },
    [onClose, preventClose, refObject]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);
};
