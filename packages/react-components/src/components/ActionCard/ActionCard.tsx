import * as React from 'react';

import cx from 'clsx';

import { ActionCardProps } from './types';

import styles from './ActionCard.module.scss';

const baseClass = 'action-card';

export const ActionCard: React.FC<ActionCardProps> = ({
  className,
  children,
  secondColumn,
  firstColumnClassName,
  secondColumnClassName,
  onClick,
}) => {
  const mergedClassNames = cx(styles[baseClass], className);

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget !== document.activeElement) {
      return;
    }

    onClick?.();
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
    <div className={styles[`main-wrapper`]}>
      <div
        role="button"
        aria-label="Action Card"
        tabIndex={0}
        className={mergedClassNames}
        onClick={handleOnClick}
        onKeyDown={handleOnKeyDown}
      >
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
      </div>
    </div>
  );
};
