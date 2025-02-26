import { FC, useState, useEffect } from 'react';

import { OneColored } from '@livechat/design-system-icons';
import cx from 'clsx';

import { AnimatedTextContainer } from '../../../AnimatedTextContainer';
import { Icon } from '../../../Icon';
import { Text } from '../../../Typography';

import { IUserGuideBubbleStepProps } from './types';

import styles from './UserGuideBubbleStep.module.scss';

const baseClass = 'user-guide-bubble-step';

export const UserGuideBubbleStep: FC<IUserGuideBubbleStepProps> = ({
  headerMessage,
  message,
  cta,
  isCompleted,
  handleAnimationComplete,
  disableTypingAnimations,
  className,
}) => {
  const [visibleBubbles, setVisibleBubbles] = useState<string[]>(['header']);
  const isHeaderVisible = visibleBubbles.includes('header');
  const isMessageVisible = visibleBubbles.includes('message');
  const isCtaVisisble = cta && visibleBubbles.includes('cta');

  useEffect(() => {
    if (visibleBubbles.length === 3) {
      handleAnimationComplete && handleAnimationComplete();
    }
  }, [visibleBubbles]);

  return (
    <div className={cx('lc-light-theme', styles[`${baseClass}`], className)}>
      {isHeaderVisible && (
        <div
          className={cx(styles[`${baseClass}__bubble-wrapper`], {
            [styles[`${baseClass}__bubble-wrapper--completed`]]: isCompleted,
          })}
        >
          <div
            className={cx(
              styles[`${baseClass}__bubble`],
              styles[`${baseClass}__bubble--header`],
              {
                [styles[`${baseClass}__bubble--next-msg`]]: isMessageVisible,
              }
            )}
          >
            <div className={styles[`${baseClass}__bubble__icon`]}>
              <Icon size="large" source={OneColored} />
            </div>
            <Text as="span">
              <AnimatedTextContainer
                text={headerMessage}
                typingAnimation={!disableTypingAnimations}
                onTypingEnd={() =>
                  setVisibleBubbles([...visibleBubbles, 'message'])
                }
              />
            </Text>
          </div>
        </div>
      )}
      {isMessageVisible && (
        <div
          className={cx(styles[`${baseClass}__bubble-wrapper`], {
            [styles[`${baseClass}__bubble-wrapper--completed`]]: isCompleted,
          })}
        >
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
                typingAnimation={!disableTypingAnimations}
                typingDelay={0}
                onTypingEnd={() =>
                  setVisibleBubbles([...visibleBubbles, 'cta'])
                }
              />
            </Text>
          </div>
        </div>
      )}
      {isCtaVisisble && (
        <div
          className={cx(styles[`${baseClass}__bubble-wrapper`], {
            [styles[`${baseClass}__bubble-wrapper--completed`]]: isCompleted,
          })}
        >
          <div
            className={cx(
              styles[`${baseClass}__bubble`],
              styles[`${baseClass}__bubble--cta`]
            )}
          >
            {cta}
          </div>
        </div>
      )}
    </div>
  );
};
