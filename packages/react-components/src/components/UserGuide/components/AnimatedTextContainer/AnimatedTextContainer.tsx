import { FC, useEffect, useState } from 'react';

const TYPING_SPEED = 10;
const TYPING_DELAY = 600;

interface IAnimatedTextContainerProps {
  text: string;
  typingAnimation?: boolean;
  typingDelay?: number;
  typingSpeed?: number;
  onTypingEnd?: () => void;
}

export const AnimatedTextContainer: FC<IAnimatedTextContainerProps> = ({
  text,
  typingAnimation = true,
  typingDelay = TYPING_DELAY,
  typingSpeed = TYPING_SPEED,
  onTypingEnd,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [_, setIndex] = useState(0);

  useEffect(() => {
    if (!text || !typingAnimation) return;

    const startTyping = () => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => {
          if (prevIndex < text.length) {
            setDisplayedText((prevText) => prevText + text[prevIndex]);

            return prevIndex + 1;
          } else {
            clearInterval(interval);
            onTypingEnd && onTypingEnd();

            return prevIndex;
          }
        });
      }, typingSpeed);
    };

    const timeout = setTimeout(startTyping, typingDelay);

    return () => {
      clearTimeout(timeout);
    };
  }, [text]);

  return <>{typingAnimation ? displayedText : text}</>;
};
