import { FC, useEffect } from 'react';

import { Button } from '../../../Button';
import { Text } from '../../../Typography';
import { AnimatedTextContainer } from '../AnimatedTextContainer/AnimatedTextContainer';

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
  useEffect(() => {
    if (handleCloseAction) {
      document.addEventListener('keydown', handleCloseAction);

      return () => {
        document.removeEventListener('keydown', handleCloseAction);
      };
    }
  }, [handleCloseAction]);

  return (
    <div className={styles[`${baseClass}`]}>
      {header && (
        <Text
          size="lg"
          bold
          as="span"
          className={styles[`${baseClass}__heading`]}
        >
          {header}
        </Text>
      )}
      {image && (
        <div className={styles[`${baseClass}__image-wrapper`]}>
          <img
            className={styles[`${baseClass}-image`]}
            src={image.src}
            alt={image.alt}
          />
        </div>
      )}
      {video && !image && (
        <video
          src={video.src}
          playsInline={video.playsInline}
          autoPlay={video.autoPlay}
          muted={video.muted}
          loop={video.loop}
          controls={video.controls}
        />
      )}
      <Text
        id="user-guide-step-typed-text"
        as="span"
        className={styles[`${baseClass}__content`]}
      >
        <AnimatedTextContainer text={text} typingAnimation={typingAnimation} />
      </Text>
      <div className={styles[`${baseClass}__footer`]}>
        <Button
          kind="high-contrast"
          size="large"
          onClick={handleClickPrimary}
          className={styles[`${baseClass}__footer__button-primary`]}
        >
          {currentStep === stepMax ? 'Finish' : 'Next'}
        </Button>
        <Text
          as="span"
          className={styles[`${baseClass}__footer__step-counter`]}
        >
          Step {currentStep} of {stepMax}
        </Text>
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
      </div>
    </div>
  );
};
