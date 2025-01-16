import { FC, MouseEvent, useEffect } from 'react';

import { Close } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { getIconType } from '../Tooltip/Tooltip.helpers';
import { TooltipTheme } from '../Tooltip/types';
import { Heading } from '../Typography';

import styles from './UserGuide.module.scss';

const baseClass = 'user-guide';

export const UserGuideStep: FC<{
  header: string;
  text: string;
  image?: {
    src: string;
    alt: string;
  };
  currentStep: number;
  stepMax: number;
  closeWithX?: boolean;
  theme?: TooltipTheme;
  handleClickPrimary: () => void;
  handleCloseAction?: (ev: KeyboardEvent | MouseEvent) => void;
}> = ({
  header,
  text,
  image,
  currentStep,
  stepMax,
  closeWithX,
  theme,
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
  }, []);

  return (
    <div className={styles[`${baseClass}__user-guide-step`]}>
      {closeWithX && (
        <button
          type="button"
          aria-label="Close tooltip"
          className={styles[`${baseClass}-close`]}
          onClick={handleCloseAction}
        >
          <Icon source={Close} kind={theme ? getIconType(theme) : 'primary'} />
        </button>
      )}
      {image && (
        <div className={styles[`${baseClass}-image-container`]}>
          <img
            className={styles[`${baseClass}-image`]}
            src={image.src}
            alt={image.alt}
          />
        </div>
      )}
      {header && (
        <Heading size="xs" as="div" className={styles[`${baseClass}-header`]}>
          {header}
        </Heading>
      )}
      <div className={styles[`${baseClass}-text`]}>{text}</div>
      <div
        className={cx(
          styles[`${baseClass}-footer`],
          styles[`${baseClass}-footer--user-guide-step`]
        )}
      >
        <span className={styles[`${baseClass}-step`]}>
          Step {currentStep} of {stepMax}
        </span>
        <Button kind="high-contrast" onClick={handleClickPrimary}>
          {currentStep === stepMax ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
};
