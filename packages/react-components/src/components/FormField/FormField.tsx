import * as React from 'react';

import cx from 'clsx';

import {
  ReadOnlyFormFieldContextProvider,
  useReadOnlyFormFieldContext,
} from '../../providers/ReadOnlyFormFieldProvider';
import { FieldDescription } from '../FieldDescription';
import { FieldError } from '../FieldError';
import { Text } from '../Typography';

import styles from './FormField.module.scss';

const baseClass = 'form-field';

export interface FormFieldProps {
  /**
   * Define label text
   */
  labelText?: string;
  /**
   * Renders given element aligned to label, `inline` will affect
   */
  labelAdornment?: React.ReactNode;
  /**
   * Define to associate the label with the field
   */
  labelFor?: string;
  /**
   * Makes the label text bold. Note: This prop should only be used together with PromoInput.
   */
  boldLabel?: boolean;
  /**
   * The CSS class for field container
   */
  className?: string;
  /**
   * Set the label to inline version
   */
  inline?: boolean;
  /**
   * Define error text
   */
  error?: React.ReactNode;
  /**
   * Define the description text
   */
  description?: React.ReactNode;
  /**
   * Wrapped element
   */
  children?: React.ReactNode;
  /**
   * Renders given element above the filed
   */
  labelRightNode?: React.ReactNode;
  /**
   * Whether the form field is read-only
   */
  readOnly?: boolean;
}

const FormFieldContent: React.FC<React.PropsWithChildren<FormFieldProps>> = ({
  inline,
  error,
  description,
  labelText,
  labelAdornment,
  className,
  labelFor,
  children,
  labelRightNode,
  boldLabel = false,
  readOnly = false,
}) => {
  const childrenRef = React.useRef<HTMLDivElement>(null);
  const [labelHeight, setLabelHeight] = React.useState('auto');

  const { isEmpty } = useReadOnlyFormFieldContext();

  const mergedClassNames = cx(
    styles[baseClass],
    {
      [styles[`${baseClass}--inline`]]: inline,
    },
    className
  );

  React.useEffect(() => {
    const div = childrenRef;

    if (inline && div.current) {
      return setLabelHeight(`${div.current.clientHeight}px`);
    }

    return setLabelHeight('auto');
  });

  return (
    <div className={mergedClassNames}>
      {labelRightNode && inline && (
        <React.Fragment>
          <Text
            as="div"
            size="sm"
            className={cx(
              styles[`${baseClass}__label-right-node`],
              styles[`${baseClass}__label-right-node--inline`]
            )}
          >
            {labelRightNode}
          </Text>
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
              <div
                className={cx(
                  styles[`${baseClass}__label-wrapper`],
                  inline && styles[`${baseClass}__label-wrapper--inline`]
                )}
                style={{
                  height: labelHeight,
                }}
              >
                <label
                  className={cx(
                    styles[`${baseClass}__label-left-node`],
                    readOnly &&
                      styles[`${baseClass}__label-left-node--read-only`]
                  )}
                  htmlFor={labelFor}
                >
                  <Text
                    as="span"
                    size="sm"
                    bold={!readOnly && boldLabel}
                    customColor={
                      isEmpty ? 'var(--content-basic-secondary)' : undefined
                    }
                  >
                    {labelText}
                  </Text>
                </label>
                {labelAdornment && (
                  <Text
                    as="div"
                    size="sm"
                    className={cx(
                      styles[`${baseClass}__label-adornment`],
                      inline && styles[`${baseClass}__label-adornment--inline`]
                    )}
                  >
                    {labelAdornment}
                  </Text>
                )}
              </div>
            )}
            {labelRightNode && !inline && (
              <Text
                as="div"
                size="sm"
                className={cx(styles[`${baseClass}__label-right-node`])}
              >
                {labelRightNode}
              </Text>
            )}
          </div>
        )}
        <div className={cx(styles[`${baseClass}__content`])}>
          <div ref={childrenRef}>{children}</div>
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

export const FormField: React.FC<React.PropsWithChildren<FormFieldProps>> = ({
  readOnly,
  ...props
}) => {
  return (
    <ReadOnlyFormFieldContextProvider readOnly={readOnly}>
      <FormFieldContent readOnly={readOnly} {...props} />
    </ReadOnlyFormFieldContextProvider>
  );
};
