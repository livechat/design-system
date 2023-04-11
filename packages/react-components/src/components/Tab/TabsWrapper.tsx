import cx from 'clsx';
import { FC, HTMLAttributes } from 'react';

import styles from './TabsWrapper.module.scss';

const baseClass = 'tabs';

export const TabsWrapper: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
}) => {
  return <div className={cx(styles[baseClass], className)}>{children}</div>;
};

export const TabsList: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
}) => {
  return (
    <div className={cx(styles[`${baseClass}__list`], className)}>
      {children}
    </div>
  );
};
