import * as React from 'react';
import cx from 'classnames';
import {
  ChevronUp,
  ChevronDown,
} from '@livechat/design-system-icons/dist/material';
import { Icon } from './Icon';

enum EventKeys {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
}

const baseClass = 'lc-numeric-input';

export interface IProps {
  className?: string;
  error?: string;
  value: string;
  max?: number;
  min?: number;
  disabled?: boolean;
  noControls?: boolean;
  onChange: (value: string) => void;
}

export type INumericInputProps = IProps &
  React.InputHTMLAttributes<HTMLInputElement>;

export const NumericInput: React.FC<INumericInputProps> = ({
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
    baseClass,
    {
      [`${baseClass}--error`]: error,
      [`${baseClass}--no-controls`]: noControls,
      [`${baseClass}--disabled`]: disabled,
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
    if (e.key === EventKeys.ArrowDown) {
      e.preventDefault();
      updateValue(-1);
    }

    if (e.key === EventKeys.ArrowUp) {
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
            className={`${baseClass}__increment`}
            type="button"
          >
            <Icon
              source={ChevronUp}
              disabled={disabled || hasReachedTheLimit(value, max)}
            />
          </button>
          <button
            tabIndex={-1}
            disabled={disabled || hasReachedTheLimit(value, min)}
            aria-label="Decrement value"
            className={`${baseClass}__decrement`}
            onClick={handleDecrementClick}
            type="button"
          >
            <Icon
              source={ChevronDown}
              disabled={disabled || hasReachedTheLimit(value, min)}
            />
          </button>
        </>
      )}
    </div>
  );
};
