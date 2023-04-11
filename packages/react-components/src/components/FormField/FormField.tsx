import cx from 'clsx';
import { Text } from '../Typography';
import { FieldError } from '../FieldError';
import { FieldDescription } from '../FieldDescription';

import styles from './FormField.module.scss';
import { ReactNode, FC, Fragment } from 'react';

const baseClass = 'form-field';

export interface FormFieldProps {
  labelText?: string;
  labelAdornment?: ReactNode;
  labelFor?: string;
  className?: string;
  inline?: boolean;
  error?: string;
  description?: ReactNode;
  children?: ReactNode;
  labelRightNode?: ReactNode;
}

export const FormField: FC<FormFieldProps> = ({
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
        <Fragment>
          <div
            className={cx(
              styles[`${baseClass}__label-right-node`],
              styles[`${baseClass}__label-right-node--inline`]
            )}
          >
            {labelRightNode}
          </div>
          <div className={styles[`${baseClass}__row-break`]} />
        </Fragment>
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
          {description && <FieldDescription>{description}</FieldDescription>}
        </div>
      </div>
    </div>
  );
};
