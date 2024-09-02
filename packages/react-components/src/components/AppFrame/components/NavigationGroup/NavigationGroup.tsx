import * as React from 'react';

import cx from 'clsx';

import { INavigationGroupProps } from './types';

import styles from './NavigationGroup.module.scss';

const baseClass = 'navigation-group';

export const NavigationGroup: React.FC<INavigationGroupProps> = ({
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
