import { FC, useEffect, useRef, useState } from 'react';

import { IAnimatedTextContainerProps } from './types';

const TYPING_SPEED = 8;
const TYPING_DELAY = 100;

export const AnimatedTextContainer: FC<IAnimatedTextContainerProps> = ({
  text,
  typingAnimation = true,
  typingDelay = TYPING_DELAY,
  typingSpeed = TYPING_SPEED,
  onTypingEnd,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    if (!text) return;

    if (!typingAnimation && onTypingEnd) {
      return onTypingEnd();
    }

    const startTyping = () => {
      const interval = setInterval(() => {
        const currentIndex = indexRef.current;

        if (currentIndex < text.length) {
          setDisplayedText((prevText) => prevText + text[currentIndex]);

          indexRef.current = currentIndex + 1;
        } else {
          clearInterval(interval);
          onTypingEnd?.();
        }
      }, typingSpeed);
    };

    const timeout = setTimeout(startTyping, typingDelay);

    return () => {
      clearTimeout(timeout);
    };
  }, [text, typingAnimation]);

  return <>{typingAnimation ? displayedText : text}</>;
};
