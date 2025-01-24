import { CSSProperties } from 'react';

import { Placement } from '@floating-ui/react';

export type CursorTiming = 'fast1' | 'fast2' | 'moderate1' | 'moderate2';

export interface IUserGuide {
  /**
   * The class name for the floating container
   */
  className?: string;
  /**
   * The CSS properties for the highlighted element
   */
  elementStyles?: CSSProperties;
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
   * The custom z-index value for the overlay
   */
  zIndex?: number;
}
