import * as React from 'react';

import { Icon } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Button, ButtonKind } from '../Button';

import styles from './PromoBannerV2.module.scss';

const baseClass = 'promo-banner-v2';

export interface IPromoBannerV2Props {
  /**
   * Specify an optional className to be applied to the main container node
   */
  className?: string;
  /**
   * Element with additional content for second column
   */
  additionalContent?: React.ReactNode;
  /**
   * Shows the primary CTA button
   */
  primaryButton?: {
    handleClick: () => void;
    label: string;
    kind?: ButtonKind;
  };
  /**
   * Shows the secondary CTA button
   */
  secondaryButton?: {
    handleClick: () => void;
    label: string;
    kind?: ButtonKind;
  };
  /**
   * Event handler for close button press
   */
  onClose?: () => void;
}

export const PromoBannerV2: React.FC<
  React.PropsWithChildren<IPromoBannerV2Props>
> = ({
  children,
  className,
  additionalContent,
  primaryButton,
  secondaryButton,
  onClose,
}) => {
  const mergedClassNames = cx(styles[baseClass], className);

  return (
    <div className={styles[`main-wrapper`]}>
      <div role="banner" className={mergedClassNames}>
        <div className={styles[`${baseClass}__content`]}>
          {children}
          {(primaryButton || secondaryButton) && (
            <div className={styles[`${baseClass}__content__cta`]}>
              {primaryButton && (
                <Button
                  kind={primaryButton?.kind || 'high-contrast'}
                  onClick={primaryButton.handleClick}
                >
                  {primaryButton.label}
                </Button>
              )}
              {secondaryButton && (
                <Button
                  kind={secondaryButton?.kind || 'text'}
                  onClick={secondaryButton.handleClick}
                  className={styles[`${baseClass}__content__cta__secondary`]}
                >
                  {secondaryButton.label}
                </Button>
              )}
            </div>
          )}
        </div>
        {additionalContent && (
          <div className={styles[`${baseClass}__additional-content`]}>
            {additionalContent}
          </div>
        )}
        {onClose && (
          <div className={styles[`${baseClass}__close`]}>
            <Button
              className={styles[`${baseClass}__close__btn`]}
              onClick={onClose}
              icon={<Icon name="Close" kind="primary" />}
              kind="plain"
              size="compact"
            />
          </div>
        )}
      </div>
    </div>
  );
};
