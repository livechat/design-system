import { ComponentCoreProps } from '../../utils/types';

export interface IFloatingPanelProps extends ComponentCoreProps {
  /**
   * Set the placement of the floating panel
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Set the visibility of the floating panel
   */
  isVisible?: boolean;
}
