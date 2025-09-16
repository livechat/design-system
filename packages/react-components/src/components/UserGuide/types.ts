import { Placement } from '@floating-ui/react';

export type CursorTiming = 'fast1' | 'fast2' | 'moderate1' | 'moderate2';

export interface IUserGuide {
  /**
   * The class name for the floating container
   */
  className?: string;
  /**
   * The class name for the highlighted element
   */
  elementClassName?: string;
  /**
   * The position for the floating element which sets the cursor position
   */
  cursorPosition?: Placement;
  /**
   * The timing for the floating element transition
   */
  cursorTiming?: CursorTiming;
  /**
   * The id of the element to highlight
   */
  parentElementName?: string;
  /**
   * The visibility of the user guide
   */
  isVisible?: boolean;
  /**
   * The visibility of the overlay
   */
  hideOverlay?: boolean;
  /**
   * The custom z-index value for the overlay
   */
  zIndex?: number;
  /**
   * The first step of the user guide, rendered on the center of the screen
   */
  isFirstStep?: boolean;
  /**
   * The last step of the user guide, rendered on the center of the screen
   */
  isLastStep?: boolean;
}
