import * as React from 'react';
import cx from 'clsx';

import styles from './Textarea.module.scss';

const baseClass = 'textarea';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  error?: boolean | undefined;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...textareaProps }, ref) => {
    const { disabled } = textareaProps;
    const [isFocused, setIsFocused] = React.useState(false);
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
