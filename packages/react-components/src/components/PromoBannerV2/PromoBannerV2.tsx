import * as React from 'react';

import { Close } from '@livechat/design-system-icons';
import cx from 'clsx';

import { ThemeClassName } from '../../providers';
import { Button } from '../Button';
import { Icon } from '../Icon';

import * as styles from './styles';
import { IPromoBannerV2Props } from './types';

export const PromoBannerV2: React.FC<
  React.PropsWithChildren<IPromoBannerV2Props>
> = ({
  children,
  className,
  additionalContent,
  primaryButton,
  secondaryButton,
  vertical,
  contentClassName,
  additionalContentClassName,
  onClose,
  kind = 'default',
}) => {
  const mergedClassNames = cx(
    styles.mainWrapper(kind === 'dark'),
    kind === 'dark' && ThemeClassName.Dark,
    className
  );

  return (
    <div role="banner" className={mergedClassNames}>
      <div className={styles.baseStyles(vertical)}>
        <div
          data-testId="content"
          className={cx(styles.content, 'content', contentClassName)}
        >
          {children}
          {(primaryButton || secondaryButton) && (
            <div className={styles.cta}>
              {primaryButton && (
                <Button
                  {...primaryButton}
                  kind={primaryButton?.kind || 'high-contrast'}
                  onClick={primaryButton.handleClick}
                >
                  {primaryButton.label}
                </Button>
              )}
              {secondaryButton && (
                <Button
                  {...secondaryButton}
                  kind={secondaryButton?.kind || 'text'}
                  onClick={secondaryButton.handleClick}
                  className={cx(
                    styles.secondaryButton,
                    secondaryButton.className
                  )}
                >
                  {secondaryButton.label}
                </Button>
              )}
            </div>
          )}
        </div>
        {additionalContent && (
          <div
            data-testId="additional-content"
            className={cx(
              styles.additionalContent,
              'additional-content',
              additionalContentClassName
            )}
          >
            {additionalContent}
          </div>
        )}
        {onClose && (
          <div
            className={cx(
              styles.closeButtonContainer,
              'close-button-container'
            )}
          >
            <Button
              className={styles.closeButton}
              onClick={onClose}
              icon={<Icon source={Close} kind="primary" />}
              kind="plain"
              size="compact"
              aria-label="Close banner"
            />
          </div>
        )}
      </div>
    </div>
  );
};
