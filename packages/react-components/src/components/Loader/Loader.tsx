import * as React from 'react';
import cx from 'clsx';

import { Text } from '../Typography';

import styles from './Loader.module.scss';

const baseClass = 'loader';
const spinnerClass = `${baseClass}__spinner`;

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Specify the loader size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Specify the loader label
   */
  label?: string;
  /**
   * Fragment circle color
   */
  primaryColor?: string;
  /**
   * Main circle color
   */
  secondaryColor?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  primaryColor,
  secondaryColor,
  label,
  className,
  size = 'medium',
}) => {
  return (
    <div className={cx(styles[baseClass], className)}>
      <div
        className={cx(styles[spinnerClass], styles[`${spinnerClass}--${size}`])}
      >
        <div
          className={styles['loader__spinner-circle']}
          style={{
            /* stylelint-disable */
            borderColor: secondaryColor,
            borderTopColor: primaryColor,
          }}
        />
      </div>
      {label && (
        <Text as="div" size="md" className={styles['loader__label']}>
          {label}
        </Text>
      )}
    </div>
  );
};
