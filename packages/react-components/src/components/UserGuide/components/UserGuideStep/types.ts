import { MouseEvent } from 'react';

export interface IUserGuideStepProps {
  /**
   * The header of the step
   */
  header: string;
  /**
   * The text of the step
   */
  text: string;
  /**
   * The cta of the step
   */
  cta?: string;
  /**
   * Set to enable typing animation for the text
   */
  typingAnimation?: boolean;
  /**
   * The image of the step
   */
  image?: {
    src: string;
    alt: string;
  };
  /**
   * The video of the step. It will be rendered if there is no image
   */
  video?: {
    src: string;
    playsInline?: boolean;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    controls?: boolean;
  };
  /**
   * The current step number
   */
  currentStep: number;
  /**
   * The maximum number of steps
   */
  stepMax: number;
  /**
   * The function to be called when the primary button is clicked
   */
  handleClickPrimary: () => void;
  /**
   * The function to be called when the the skip button is clicked
   */
  handleCloseAction?: (ev: KeyboardEvent | MouseEvent) => void;
  /**
   * Additional CSS class name to apply to the step container
   */
  className?: string;
  /**
   * Typing animation speed
   */
  typingSpeed?: number;
  /**
   * Delay before typing starts
   */
  typingDelay?: number;
}
