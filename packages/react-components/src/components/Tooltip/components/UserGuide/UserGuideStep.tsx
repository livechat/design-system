import * as React from 'react';

import { Close } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Button } from '../../../Button';
import { Icon } from '../../../Icon';
import { Heading } from '../../../Typography';
import { getIconType } from '../../Tooltip.helpers';
import styles from '../../Tooltip.module.scss';
import { TooltipTheme } from '../../types';

const baseClass = 'tooltip';

export const UserGuideStep: React.FC<{
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
  handleCloseAction?: (ev: KeyboardEvent | React.MouseEvent) => void;
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
  React.useEffect(() => {
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
          Primary button
        </Button>
      </div>
    </div>
  );
};
