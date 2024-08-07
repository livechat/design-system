import * as React from 'react';

import { Close } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { Heading } from '../../Typography';
import { getIconType } from '../Tooltip.helpers';
import styles from '../Tooltip.module.scss';
import { ITooltipInteractiveProps, TooltipTheme } from '../types';

const baseClass = 'tooltip';

export const Interactive: React.FC<ITooltipInteractiveProps> = ({
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

    if (theme === 'important') {
      return 'plain-lock-black';
    }

    return 'high-contrast';
  };

  const getDefaultSecondaryButtonKind = (theme?: TooltipTheme) => {
    if (theme === 'invert') {
      return 'link-inverted';
    }

    if (theme === 'important') {
      return 'text-lock-black';
    }

    return 'text';
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
          {...primaryButton}
          kind={primaryButton.kind || getDefaultPrimaryButtonKind(theme)}
          onClick={primaryButton.handleClick}
        >
          {primaryButton.label}
        </Button>

        {secondaryButton && (
          <Button
            {...secondaryButton}
            className={cx(
              styles[`${baseClass}-footer-secondary`],
              secondaryButton.className
            )}
            kind={secondaryButton.kind || getDefaultSecondaryButtonKind(theme)}
            onClick={secondaryButton.handleClick}
          >
            {secondaryButton.label}
          </Button>
        )}
      </div>
    </div>
  );
};
