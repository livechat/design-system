import * as React from 'react';

import { Close } from '@livechat/design-system-icons/react/material';
import cx from 'clsx';

import { Button, ButtonKind } from '../../Button';
import { Icon } from '../../Icon';
import { getIconType } from '../helpers';
import styles from '../Tooltip.module.scss';

const baseClass = 'tooltip';

export const Interactive: React.FC<{
  header?: string;
  text: string;
  image?: {
    src: string;
    alt: string;
  };
  closeWithX?: boolean;
  theme?: 'invert' | 'important';
  handleCloseAction?: (ev: React.MouseEvent) => void;
  primaryButton: {
    handleClick: () => void;
    label: string;
    kind?: ButtonKind;
  };
  secondaryButton: {
    handleClick: () => void;
    label: string;
    kind?: ButtonKind;
  };
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
  const getDefaultPrimaryButtonKind = (theme?: 'invert' | 'important') => {
    if (theme === 'invert') {
      return 'secondary';
    }

    return 'high-contrast';
  };

  return (
    <div className={styles[`${baseClass}__interactive`]}>
      {closeWithX && (
        <Button
          className={styles[`${baseClass}-close`]}
          size="compact"
          kind="plain"
          onClick={handleCloseAction}
          icon={
            <Icon
              source={Close}
              kind={theme ? getIconType(theme) : 'primary'}
            />
          }
        />
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
      {header && <div className={styles[`${baseClass}-header`]}>{header}</div>}
      <div className={styles[`${baseClass}-text`]}>{text}</div>
      <div className={styles[`${baseClass}-footer`]}>
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
