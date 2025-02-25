import * as React from 'react';

import { ChevronUp, ChevronDown } from '@livechat/design-system-icons';
import cx from 'clsx';

import { useReadOnlyFormFieldContext } from '../../providers/ReadOnlyFormFieldProvider';
import { KeyCodes } from '../../utils/keyCodes';
import { Icon } from '../Icon';
import { ReadOnlyText } from '../ReadOnlyText';

import styles from './NumericInput.module.scss';

const baseClass = 'numeric-input';

export type NumericInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  error?: string;
  value: string;
  max?: number;
  min?: number;
  disabled?: boolean;
  noControls?: boolean;
  onChange: (value: string) => void;
  noDataFallbackText?: string;
};

export const NumericInput: React.FC<
  React.PropsWithChildren<NumericInputProps>
> = ({
  className,
  error,
  value,
  max,
  min,
  disabled,
  noControls,
  style,
  onChange,
  noDataFallbackText = 'No data',
  ...restProps
}) => {
  const inputRef = React.useRef<null | HTMLInputElement>(null);
  const { readOnly } = useReadOnlyFormFieldContext();
  const computedReadOnly = readOnly || restProps.readOnly;

  const mergedClassNames = cx(
    styles[baseClass],
    {
      [styles[`${baseClass}--error`]]: error,
      [styles[`${baseClass}--no-controls`]]: noControls,
      [styles[`${baseClass}--disabled`]]: disabled,
    },
    className
  );

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

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
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
    inputRef.current?.focus();

    return updateValue(1);
  };

  const handleDecrementClick = () => {
    inputRef.current?.focus();

    return updateValue(-1);
  };

  if (computedReadOnly) {
    return (
      <ReadOnlyText
        value={value?.toString()}
        noDataFallbackText={noDataFallbackText}
      />
    );
  }

  return (
    <div className={mergedClassNames} style={style}>
      <input
        type="text"
        ref={inputRef}
        {...restProps}
        value={value}
        disabled={disabled}
        onChange={handleOnChange}
        onKeyDown={onKeyDown}
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
              kind="primary"
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
              kind="primary"
              disabled={disabled || hasReachedTheLimit(value, min)}
            />
          </button>
        </>
      )}
    </div>
  );
};
