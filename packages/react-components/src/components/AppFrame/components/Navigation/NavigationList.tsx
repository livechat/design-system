import * as React from 'react';

import cx from 'clsx';

import { INavigationListProps } from './types';

import styles from './NavigationList.module.scss';

const baseClass = 'navigation-list';

export const NavigationList: React.FC<INavigationListProps> = ({
  children,
  className,
  scrollable,
  ...props
}) => {
  return (
    <ul
      className={cx(
        styles[baseClass],
        {
          [styles[`${baseClass}--scrollable`]]: scrollable,
        },
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
};
