import { FC, MouseEvent, KeyboardEvent, PropsWithChildren } from 'react';

import cx from 'clsx';

import { skeletonLoading } from '../../styles/animations';

import * as styles from './styles';
import { ActionCardProps } from './types';

const componentName = 'action-card';

export const ActionCard: FC<PropsWithChildren<ActionCardProps>> = ({
  className,
  children,
  secondColumn,
  firstColumnClassName,
  secondColumnClassName,
  onClick,
  isLoading = false,
  isLoadingAnimated = false,
}) => {
  const mergedClassNames = cx(styles.baseStyles(isLoading), className);

  const wrapperClassNames = cx(styles.mainWrapper(isLoading), {
    [skeletonLoading]: isLoadingAnimated,
  });

  const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
    if (isLoading) return;
    if (e.currentTarget !== document.activeElement) {
      return;
    }

    onClick?.();
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (isLoading) return;
    if (e.currentTarget !== document.activeElement) {
      return;
    }

    if (
      e.key === 'Enter' ||
      e.key === ' ' ||
      e.key === 'Spacebar' ||
      e.key === 'Space'
    ) {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div className={wrapperClassNames}>
      <div aria-live="polite" className={styles.viasuallyHidden}>
        {isLoading ? 'Loading content' : null}
      </div>
      <div
        role={isLoading ? 'presentation' : 'button'}
        aria-label="Action Card"
        aria-busy={isLoading}
        tabIndex={isLoading ? -1 : 0}
        className={mergedClassNames}
        onClick={handleOnClick}
        onKeyDown={handleOnKeyDown}
      >
        {!isLoading && (
          <>
            <div
              data-testid={`${componentName}-first-column`}
              className={cx(styles.firstColumn, firstColumnClassName)}
            >
              {children}
            </div>
            {secondColumn && (
              <div
                data-testid={`${componentName}-second-column`}
                className={cx(styles.secondColumn, secondColumnClassName)}
              >
                {secondColumn}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
