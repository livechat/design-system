import * as React from 'react';
import cx from 'clsx';
import {
  ChevronUp,
  ChevronDown,
} from '@livechat/design-system-icons/react/material';
import { Icon, IconTypeName } from '../Icon';
import { KeyCodes } from '../../utils/keyCodes';

import styles from './NumericInput.module.scss';

const baseClass = 'numeric-input';

interface Props {
  className?: string;
  error?: string;
  value: string;
  max?: number;
  min?: number;
  disabled?: boolean;
  noControls?: boolean;
  onChange: (value: string) => void;
}

export type NumericInputProps = Props &
  React.InputHTMLAttributes<HTMLInputElement>;

export const NumericInput: React.FC<NumericInputProps> = ({
  className,
  error,
  value,
  max,
  min,
  disabled,
  noControls,
  style,
  onChange,
  ...restProps
}) => {
  const mergedClassNames = cx(
    styles[baseClass],
    {
      [styles[`${baseClass}--error`]]: error,
      [styles[`${baseClass}--no-controls`]]: noControls,
      [styles[`${baseClass}--disabled`]]: disabled,
    },
    className
  );

  const handleOnFocus = () =>
    window.addEventListener('keydown', onKeyDown, true);

  const handleOnBlur = () => window.removeEventListener('keydown', onKeyDown);

  const callOnChange = (val: number | string) => onChange(String(val));

  const calcValue = (val: number) => {
    if (max !== undefined && val > max) {
      return max;
    }

    if (min !== undefined && val < min) {
      return min;
    }

    return val;
  };

  const updateValue = (val: number) => {
    const newValue = parseInt(value, 10) + val;

    return callOnChange(calcValue(newValue));
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === KeyCodes.arrowDown) {
      e.preventDefault();
      updateValue(-1);
    }

    if (e.key === KeyCodes.arrowUp) {
      e.preventDefault();
      updateValue(1);
    }
  };

  const hasReachedTheLimit = (value: string, margin?: number) =>
    margin !== undefined && parseInt(value, 10) === margin;

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const inputVal = e.currentTarget.value.replace(
      /((?!([-]|([-]?\d+))).)/,
      ''
    );

    if (inputVal === '' || inputVal === '-') {
      return callOnChange(inputVal);
    }

    const newValue = parseInt(inputVal, 10);

    return callOnChange(calcValue(newValue));
  };

  const handleIncrementClick = () => {
    return updateValue(1);
  };

  const handleDecrementClick = () => {
    return updateValue(-1);
  };

  return (
    <div className={mergedClassNames} style={style}>
      <input
        type="text"
        {...restProps}
        value={value}
        disabled={disabled}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        min={min}
        max={max}
      />
      {!noControls && (
        <>
          <button
            tabIndex={-1}
            disabled={disabled || hasReachedTheLimit(value, max)}
            onClick={handleIncrementClick}
            aria-label="Increment value"
            className={styles[`${baseClass}__increment`]}
            type="button"
          >
            <Icon
              source={ChevronUp}
              disabled={disabled || hasReachedTheLimit(value, max)}
              iconType={IconTypeName.Primary}
            />
          </button>
          <button
            tabIndex={-1}
            disabled={disabled || hasReachedTheLimit(value, min)}
            aria-label="Decrement value"
            className={styles[`${baseClass}__decrement`]}
            onClick={handleDecrementClick}
            type="button"
          >
            <Icon
              source={ChevronDown}
              iconType={IconTypeName.Primary}
              disabled={disabled || hasReachedTheLimit(value, min)}
            />
          </button>
        </>
      )}
    </div>
  );
};
