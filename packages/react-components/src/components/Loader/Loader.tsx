import * as React from 'react';
import cx from 'classnames';

import { Text } from '../Text';

const baseClass = 'lc-loader';
const spinnerClass = `${baseClass}__spinner`;

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
  label?: string;
  /** Fragment circle color */
  primaryColor?: string;
  /** Main circle color */
  secondaryColor?: string;
}

export const Loader: React.FC<Props> = ({
  primaryColor,
  secondaryColor,
  label,
  className,
  size = 'medium',
}) => {
  return (
    <div className={cx(baseClass, className)}>
      <div className={cx(spinnerClass, `${spinnerClass}--${size}`)}>
        <div
          className="lc-loader__spinner-circle"
          style={{
            /* stylelint-disable */
            borderColor: secondaryColor,
            borderTopColor: primaryColor,
          }}
        />
      </div>
      {label && (
        <Text as="div" size="md" className="lc-loader__label">
          {label}
        </Text>
      )}
    </div>
  );
};
