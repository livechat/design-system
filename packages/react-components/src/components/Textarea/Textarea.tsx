import * as React from 'react';

import cx from 'clsx';

import { useReadOnlyFormFieldContext } from '../../providers/ReadOnlyFormFieldProvider';
import { ReadOnlyText } from '../ReadOnlyText';
import { Text } from '../Typography';

import styles from './Textarea.module.scss';

const baseClass = 'textarea';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  error?: boolean;
  noDataFallbackText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, noDataFallbackText = 'No data', error, ...textareaProps },
    ref
  ) => {
    const { disabled, onBlur, onFocus } = textareaProps;
    const { readOnly } = useReadOnlyFormFieldContext();
    const computedReadOnly = readOnly || textareaProps.readOnly;
    const [isFocused, setIsFocused] = React.useState(false);
    const mergedClassNames = cx(className, styles[baseClass], {
      [styles[`${baseClass}--disabled`]]: disabled,
      [styles[`${baseClass}--focused`]]: isFocused,
      [styles[`${baseClass}--error`]]: error,
    });

    const handleOnBlur = (
      e: React.FocusEvent<HTMLTextAreaElement, Element>
    ) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleOnFocus = (
      e: React.FocusEvent<HTMLTextAreaElement, Element>
    ) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    if (computedReadOnly) {
      return (
        <ReadOnlyText
          value={textareaProps?.value?.toString()}
          noDataFallbackText={noDataFallbackText}
        />
      );
    }

    return (
      <Text as="div" className={mergedClassNames}>
        <textarea
          {...textareaProps}
          ref={ref}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </Text>
    );
  }
);
