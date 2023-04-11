import cx from 'clsx';
import { TextareaHTMLAttributes, forwardRef, useState } from 'react';

import styles from './Textarea.module.scss';

const baseClass = 'textarea';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...textareaProps }, ref) => {
    const { disabled } = textareaProps;
    const [isFocused, setIsFocused] = useState(false);
    const mergedClassNames = cx(className, styles[baseClass], {
      [styles[`${baseClass}--disabled`]]: disabled,
      [styles[`${baseClass}--focused`]]: isFocused,
      [styles[`${baseClass}--error`]]: error,
    });

    return (
      <div className={mergedClassNames}>
        <textarea
          {...textareaProps}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    );
  }
);
