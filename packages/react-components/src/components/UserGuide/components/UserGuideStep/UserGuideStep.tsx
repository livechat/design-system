import { FC, useEffect, useState } from 'react';

import { OneColored } from '@livechat/design-system-icons';
import cx from 'clsx';

import { AnimatedTextContainer } from '../../../AnimatedTextContainer';
import { Button } from '../../../Button';
import { Icon } from '../../../Icon';
import { Text } from '../../../Typography';

import { IUserGuideStepProps } from './types';

import styles from './UserGuideStep.module.scss';

const baseClass = 'user-guide-step';

export const UserGuideStep: FC<IUserGuideStepProps> = ({
  header,
  text,
  image,
  video,
  currentStep,
  stepMax,
  typingAnimation = false,
  handleCloseAction,
  handleClickPrimary,
}) => {
  const [isTypingEnd, setIsTypingEnd] = useState(false);

  useEffect(() => {
    if (handleCloseAction) {
      document.addEventListener('keydown', handleCloseAction);

      return () => {
        document.removeEventListener('keydown', handleCloseAction);
      };
    }
  }, [handleCloseAction]);

  return (
    <div className={cx('lc-light-theme', styles[`${baseClass}`])}>
      <span className={styles[`${baseClass}__heading`]}>
        <Icon size="large" source={OneColored} />
        <Text size="lg" bold as="span">
          {header}
        </Text>
      </span>
      {image && (
        <div className={styles[`${baseClass}__media-wrapper`]}>
          <img
            className={styles[`${baseClass}__media`]}
            src={image.src}
            alt={image.alt}
          />
        </div>
      )}
      {video && !image && (
        <div className={styles[`${baseClass}__media-wrapper`]}>
          <video
            className={styles[`${baseClass}__media`]}
            data-testid="user-guide-step-video"
            src={video.src}
            playsInline={video.playsInline}
            autoPlay={video.autoPlay}
            muted={video.muted}
            loop={video.loop}
            controls={video.controls}
          />
        </div>
      )}
      <Text
        id="user-guide-step-typed-text"
        as="span"
        className={styles[`${baseClass}__content`]}
      >
        <AnimatedTextContainer
          text={text}
          typingAnimation={typingAnimation}
          onTypingEnd={() => setIsTypingEnd(true)}
        />
      </Text>
      {isTypingEnd && (
        <div className={styles[`${baseClass}__footer`]}>
          <Button
            kind="high-contrast"
            size="large"
            onClick={handleClickPrimary}
            className={styles[`${baseClass}__footer__button-primary`]}
          >
            {currentStep === stepMax ? 'Finish' : 'Next'}
          </Button>
          <span>
            {handleCloseAction && (
              <Button
                kind="plain"
                size="large"
                onClick={handleCloseAction}
                className={styles[`${baseClass}__footer__button-close`]}
              >
                Skip all
              </Button>
            )}
            <Text
              as="span"
              className={styles[`${baseClass}__footer__step-counter`]}
            >
              <span
                className={
                  styles[`${baseClass}__footer__step-counter__current-step`]
                }
              >
                {currentStep}
              </span>{' '}
              / {stepMax} steps
            </Text>
          </span>
        </div>
      )}
    </div>
  );
};
