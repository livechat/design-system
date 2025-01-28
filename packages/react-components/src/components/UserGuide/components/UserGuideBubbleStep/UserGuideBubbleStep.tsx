import { FC, useState, ReactElement, ReactNode } from 'react';

import cx from 'clsx';

import { Text } from '../../../Typography';
import { AnimatedTextContainer } from '../AnimatedTextContainer/AnimatedTextContainer';

import styles from './UserGuideBubbleStep.module.scss';

const baseClass = 'user-guide-bubble-step';

interface IUserGuideBubbleStepProps {
  headerMessage: string;
  headerIcon?: ReactElement;
  message: string;
  cta?: ReactNode;
}

export const UserGuideBubbleStep: FC<IUserGuideBubbleStepProps> = ({
  headerMessage,
  headerIcon,
  message,
  cta,
}) => {
  const [visibleBubbles, setVisibleBubbles] = useState<string[]>(['header']);

  return (
    <div className={styles[`${baseClass}`]}>
      {visibleBubbles.includes('header') && (
        <div
          className={cx(
            styles[`${baseClass}__bubble`],
            styles[`${baseClass}__bubble--header`]
          )}
        >
          {headerIcon && (
            <div className={styles[`${baseClass}__bubble__icon`]}>
              {headerIcon}
            </div>
          )}
          <Text as="span">
            <AnimatedTextContainer
              text={headerMessage}
              typingAnimation
              onTypingEnd={() =>
                setVisibleBubbles([...visibleBubbles, 'message'])
              }
            />
          </Text>
        </div>
      )}
      {visibleBubbles.includes('message') && (
        <div
          className={cx(
            styles[`${baseClass}__bubble`],
            styles[`${baseClass}__bubble--message`]
          )}
        >
          <Text as="span">
            <AnimatedTextContainer
              text={message}
              typingAnimation
              typingDelay={0}
              onTypingEnd={() => setVisibleBubbles([...visibleBubbles, 'cta'])}
            />
          </Text>
        </div>
      )}
      {cta && visibleBubbles.includes('cta') && (
        <div
          className={cx(
            styles[`${baseClass}__bubble`],
            styles[`${baseClass}__bubble--cta`]
          )}
        >
          {cta}
        </div>
      )}
    </div>
  );
};
