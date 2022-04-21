import * as React from 'react';
import cx from 'clsx';

import styles from './Input.module.scss';

type InputSize = 'xsmall' | 'small' | 'medium' | 'large';

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  size?: InputSize;
  error?: boolean;
}

const baseClass = 'input';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'medium', error = false, className, ...inputProps }, ref) => {
    return (
      <input
        className={cx(
          className,
          styles[baseClass],
          styles[`${baseClass}--${size}`],
          {
            [styles[`${baseClass}--error`]]: error,
          }
        )}
        type="text"
        ref={ref}
        {...inputProps}
      />
    );
  }
);
