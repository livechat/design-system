import * as React from 'react';

import cx from 'clsx';

import styles from './TabsWrapper.module.scss';

const baseClass = 'tabs';

export const TabsWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
}) => {
  return <div className={cx(styles[baseClass], className)}>{children}</div>;
};

export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
}) => {
  return (
    <div role="tablist" className={cx(styles[`${baseClass}__list`], className)}>
      {children}
    </div>
  );
};
