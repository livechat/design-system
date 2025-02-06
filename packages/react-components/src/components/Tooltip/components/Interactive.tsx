import * as React from 'react';

import { Close } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { Heading } from '../../Typography';
import { getIconType } from '../Tooltip.helpers';
import styles from '../Tooltip.module.scss';
import {
  ITooltipInteractiveProps,
  TooltipButton,
  TooltipTheme,
} from '../types';

const baseClass = 'tooltip';

export const Interactive: React.FC<ITooltipInteractiveProps> = ({
  header,
  text,
  image,
  video,
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

  const renderButton = (
    button?: TooltipButton | React.ReactNode,
    isPrimary: boolean = true
  ) => {
    if (!button) return null;

    if (React.isValidElement(button)) {
      return button;
    }

    const tooltipButton = button as TooltipButton;
    const kind = isPrimary
      ? tooltipButton.kind || getDefaultPrimaryButtonKind(theme)
      : tooltipButton.kind || getDefaultSecondaryButtonKind(theme);

    return (
      <Button
        {...tooltipButton}
        kind={kind}
        onClick={tooltipButton.handleClick}
      >
        {tooltipButton.label}
      </Button>
    );
  };

  return (
    <div className={styles[`${baseClass}__interactive`]}>
      {(closeWithX || handleCloseAction) && (
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
        <div className={styles[`${baseClass}-media-container`]}>
          <img
            className={styles[`${baseClass}-media`]}
            src={image.src}
            alt={image.alt}
          />
        </div>
      )}
      {video && (
        <div className={styles[`${baseClass}-media-container`]}>
          <video
            className={styles[`${baseClass}-media`]}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          >
            <source src={video} />
          </video>
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
        {renderButton(primaryButton, true)}
        {renderButton(secondaryButton, false)}
      </div>
    </div>
  );
};
