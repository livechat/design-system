import { FC, MouseEvent, KeyboardEvent, PropsWithChildren } from 'react';

import cx from 'clsx';

import { ActionCardProps } from './types';

import styles from './ActionCard.module.scss';

const baseClass = 'action-card';

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
  const mergedClassNames = cx(styles[baseClass], className);

  const wrapperClassNames = cx(styles[`main-wrapper`], {
    [styles[`${baseClass}--loading`]]: isLoading,
    [styles[`${baseClass}--loading--animated`]]: isLoadingAnimated,
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
      <div aria-live="polite" className={styles['visually-hidden']}>
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
              data-testid={`${baseClass}-first-column`}
              className={cx(
                styles[`${baseClass}__column`],
                styles[`${baseClass}__column--first`],
                firstColumnClassName
              )}
            >
              {children}
            </div>
            {secondColumn && (
              <div
                data-testid={`${baseClass}-second-column`}
                className={cx(
                  styles[`${baseClass}__column`],
                  styles[`${baseClass}__column--second`],
                  secondColumnClassName
                )}
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
