import { ReactElement, ReactNode } from 'react';

export interface IUserGuideBubbleStepProps {
  /**
   * The message for the first bubble
   */
  headerMessage: string;
  /**
   * The optional icon for the first bubble
   */
  headerIcon?: ReactElement;
  /**
   * The message for the second bubble
   */
  message: string;
  /**
   * The cta for the third bubble
   */
  cta: ReactNode;
  /**
   * Set to true to show the completed state
   */
  isCompleted?: boolean;
  /**
   * The function to be called when the all bubbles animations complete
   */
  handleAnimationComplete?: () => void;
  /**
   * Set to true to disable typing animations
   */
  disableTypingAnimations?: boolean;
}
