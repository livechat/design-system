import * as React from 'react';
import cx from 'classnames';
import { Text } from './Text';
import { FieldError } from './FieldError';
import { FieldDescription } from './FieldDescription';

const baseClass = 'lc-text-field';

export interface ITextFieldProps {
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

export const TextField: React.FC<ITextFieldProps> = ({
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
    baseClass,
    {
      [`${baseClass}--inline`]: inline,
    },
    className
  );

  return (
    <div className={mergedClassNames}>
      {labelRightNode && inline && (
        <React.Fragment>
          <div
            className={cx(
              `${baseClass}__label-right-node`,
              `${baseClass}__label-right-node--inline`
            )}
          >
            {labelRightNode}
          </div>
          <div className={cx(`${baseClass}__row-break`)} />
        </React.Fragment>
      )}
      <div
        className={cx(
          `${baseClass}__wrapper`,
          inline && `${baseClass}__wrapper--inline`
        )}
      >
        {(labelText || labelRightNode) && (
          <div
            className={cx(
              `${baseClass}__label`,
              inline && `${baseClass}__label--inline`,
              !labelText && `${baseClass}__label--no-text`
            )}
          >
            {labelText && (
              <div className={cx(`${baseClass}__label-wrapper`)}>
                <label className="lc-field-label" htmlFor={labelFor}>
                  <Text as="span" size="sm">
                    {labelText}
                  </Text>
                </label>
                {labelAdornment && (
                  <div className={cx(`${baseClass}__label-adornment`)}>
                    {labelAdornment}
                  </div>
                )}
              </div>
            )}
            {labelRightNode && !inline && (
              <div className={cx(`${baseClass}__label-right-node`)}>
                {labelRightNode}
              </div>
            )}
          </div>
        )}
        <div className={cx(`${baseClass}__content`)}>
          {children}
          {error && <FieldError>{error}</FieldError>}
          {description && <FieldDescription>{description}</FieldDescription>}
        </div>
      </div>
    </div>
  );
};
