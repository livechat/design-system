import { useEffect } from 'react';

export function useProductSwitcherShortcut(
  keySymbol: string,
  url: string
): void {
  const handleKeyPress = (event: KeyboardEvent): void => {
    if (event.key === keySymbol && event.ctrlKey) {
      event.preventDefault();

      window.open(url, '_blank');
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress);

    return () => {
      document.removeEventListener('keyup', handleKeyPress);
    };
  }, [handleKeyPress]);
}
