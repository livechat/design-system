import * as React from 'react';

import { Close } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { Heading } from '../../Typography';
import { getIconType } from '../helpers';
import styles from '../Tooltip.module.scss';
import { TooltipButton, TooltipTheme } from '../types';

const baseClass = 'tooltip';

export const Interactive: React.FC<{
  header?: string;
  text: string;
  image?: {
    src: string;
    alt: string;
  };
  closeWithX?: boolean;
  theme?: TooltipTheme;
  handleCloseAction?: (ev: React.MouseEvent) => void;
  primaryButton: TooltipButton;
  secondaryButton: TooltipButton;
}> = ({
  header,
  text,
  image,
  closeWithX,
  theme,
  handleCloseAction,
  primaryButton,
  secondaryButton,
}) => {
  const getDefaultPrimaryButtonKind = (theme?: TooltipTheme) => {
    if (theme === 'invert') {
      return 'secondary';
    }

    return 'high-contrast';
  };

  return (
    <div className={styles[`${baseClass}__interactive`]}>
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
        <Heading as="div" size="xs" className={styles[`${baseClass}-header`]}>
          {header}
        </Heading>
      )}
      <div className={styles[`${baseClass}-text`]}>{text}</div>
      <div
        className={cx(
          styles[`${baseClass}-footer`],
          styles[`${baseClass}-footer--interactive`]
        )}
      >
        <Button
          kind={primaryButton.kind || getDefaultPrimaryButtonKind(theme)}
          onClick={primaryButton.handleClick}
        >
          {primaryButton.label}
        </Button>
        <Button
          className={cx(styles[`${baseClass}-footer-secondary`], {
            [styles[`${baseClass}-footer-secondary-invert`]]:
              theme === 'invert',
          })}
          kind={secondaryButton.kind || 'text'}
          onClick={secondaryButton.handleClick}
        >
          {secondaryButton.label}
        </Button>
      </div>
    </div>
  );
};
