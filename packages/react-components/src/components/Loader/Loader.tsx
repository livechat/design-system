import * as React from 'react';

import cx from 'clsx';

import { Text } from '../Typography';

import * as styles from './styles';
import { LoaderProps } from './types';

export const Loader: React.FC<LoaderProps> = ({
  primaryColor,
  secondaryColor,
  label,
  className,
  size = 'medium',
  ...props
}) => {
  return (
    <div className={cx(styles.loader, className)} {...props}>
      <div className={styles.spinner(size)}>
        <div
          role="status"
          className={cx(
            styles.spinnerCircle(secondaryColor, primaryColor),
            styles.SPINNER_CIRCLE_CLASS
          )}
        />
      </div>
      {label && (
        <Text as="div" size="md" className={styles.loaderLabel}>
          {label}
        </Text>
      )}
    </div>
  );
};
