import * as React from 'react';
import cx from 'clsx';
import { Text } from '../Typography';
import { FieldError } from '../FieldError';
import { FieldDescription } from '../FieldDescription';

import styles from './FormField.module.scss';

const baseClass = 'form-field';

export interface FormFieldProps {
  labelText?: string;
  labelAdornment?: React.ReactNode;
  labelFor?: string;
  className?: string;
  inline?: boolean;
  error?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  labelRightNode?: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  inline,
  error,
  description,
  labelText,
  labelAdornment,
  className,
  labelFor,
  children,
  labelRightNode,
}) => {
  const mergedClassNames = cx(
    styles[baseClass],
    {
      [styles[`${baseClass}--inline`]]: inline,
    },
    className
  );

  return (
    <div className={mergedClassNames}>
      {labelRightNode && inline && (
        <React.Fragment>
          <div
            className={cx(
              styles[`${baseClass}__label-right-node`],
              styles[`${baseClass}__label-right-node--inline`]
            )}
          >
            {labelRightNode}
          </div>
          <div className={styles[`${baseClass}__row-break`]} />
        </React.Fragment>
      )}
      <div
        className={cx(
          styles[`${baseClass}__wrapper`],
          inline && styles[`${baseClass}__wrapper--inline`]
        )}
      >
        {(labelText || labelRightNode) && (
          <div
            className={cx(
              styles[`${baseClass}__label`],
              inline && styles[`${baseClass}__label--inline`],
              !labelText && styles[`${baseClass}__label--no-text`]
            )}
          >
            {labelText && (
              <div className={cx(styles[`${baseClass}__label-wrapper`])}>
                <label
                  className={styles[`${baseClass}__label-left-node`]}
                  htmlFor={labelFor}
                >
                  <Text as="span" size="sm">
                    {labelText}
                  </Text>
                </label>
                {labelAdornment && (
                  <div className={cx(styles[`${baseClass}__label-adornment`])}>
                    {labelAdornment}
                  </div>
                )}
              </div>
            )}
            {labelRightNode && !inline && (
              <div className={cx(styles[`${baseClass}__label-right-node`])}>
                {labelRightNode}
              </div>
            )}
          </div>
        )}
        <div className={cx(styles[`${baseClass}__content`])}>
          {children}
          {error && <FieldError>{error}</FieldError>}
          {!error && description && (
            <FieldDescription
              className={cx(styles[`${baseClass}__content__description`])}
            >
              {description}
            </FieldDescription>
          )}
        </div>
      </div>
    </div>
  );
};
