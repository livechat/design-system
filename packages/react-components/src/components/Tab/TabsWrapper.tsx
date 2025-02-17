import * as React from 'react';

import cx from 'clsx';

import * as styles from './styles';

export const TabsWrapper: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
> = ({ className, children }) => {
  return <div className={cx(styles.tabs, className)}>{children}</div>;
};

export const TabsList: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
> = ({ className, children }) => {
  return (
    <div role="tablist" className={cx(styles.tabsList, className)}>
      {children}
    </div>
  );
};
