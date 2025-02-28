import { IFloatingPanelProps } from './types';

export const getFloatingStyles = (
  placement: IFloatingPanelProps['placement'],
  isOpen: boolean,
  panelHeight: number,
  panelWidth: number
) => {
  if (placement === 'bottom') {
    return {
      top: !isOpen ? '100%' : `calc(100% - ${panelHeight}px)`,
    };
  }

  if (placement === 'top') {
    return {
      bottom: !isOpen ? '100%' : `calc(100% - ${panelHeight}px)`,
    };
  }

  if (placement === 'right') {
    return {
      left: !isOpen ? '100%' : `calc(100% - ${panelWidth}px)`,
    };
  }

  if (placement === 'left') {
    return {
      right: !isOpen ? '100%' : `calc(100% - ${panelWidth}px)`,
    };
  }

  return {};
};
