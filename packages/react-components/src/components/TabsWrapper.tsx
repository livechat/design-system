import * as React from 'react';
import cx from 'classnames';

const baseClass = 'lc-tabs';

export const TabsWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
}) => {
  return <div className={cx(baseClass, className)}>{children}</div>;
};

export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
}) => {
  return <div className={cx(`${baseClass}__list`, className)}>{children}</div>;
};
