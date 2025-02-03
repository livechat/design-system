export interface IAnimatedTextContainerProps {
  /**
   * Simple text to display
   */
  text: string;
  /**
   * Should the text typing be animated
   */
  typingAnimation?: boolean;
  /**
   * Delay before typing starts
   */
  typingDelay?: number;
  /**
   * Typing animation speed
   */
  typingSpeed?: number;
  /**
   * Callback when typing animation ends
   */
  onTypingEnd?: () => void;
}
