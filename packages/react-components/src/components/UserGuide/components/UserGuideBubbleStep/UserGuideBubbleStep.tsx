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
  const isMessageVisible = visibleBubbles.includes('message');
  const isCtaVisisble = cta && visibleBubbles.includes('cta');

  return (
    <div className={styles[`${baseClass}`]}>
      {visibleBubbles.includes('header') && (
        <div
          className={cx(
            styles[`${baseClass}__bubble`],
            styles[`${baseClass}__bubble--header`],
            {
              [styles[`${baseClass}__bubble--next-msg`]]: isMessageVisible,
            }
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
      {isMessageVisible && (
        <div
          className={cx(
            styles[`${baseClass}__bubble`],
            styles[`${baseClass}__bubble--message`],
            {
              [styles[`${baseClass}__bubble--next-msg`]]: isCtaVisisble,
            }
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
      {isCtaVisisble && (
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
