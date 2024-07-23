import { useEffect } from 'react';

export function useProductSwitcherShortcut(order: number, url: string): void {
  const handleKeyPress = (event: KeyboardEvent): void => {
    if (event.key === order.toString() && event.ctrlKey) {
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
