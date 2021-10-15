import * as React from 'react';
import cx from 'classnames';

const baseClass = 'lc-text-field';

export interface ITextFieldProps {
  labelText?: string;
  labelAdornment?: React.ReactNode;
  labelFor?: string;
  className?: string;
  inline?: boolean;
  errorText?: string;
  descriptionNode?: React.ReactNode;
  children?: React.ReactNode;
  labelRightNode?: React.ReactNode;
}

export const TextField: React.FC<ITextFieldProps> = ({
  inline,
  errorText,
  descriptionNode,
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
            className={cx([
              `${baseClass}__label-right-node`,
              `${baseClass}__label-right-node--inline`,
            ])}
          >
            {labelRightNode}
          </div>
          <div className={cx(`${baseClass}__row-break`)}></div>
        </React.Fragment>
      )}
      <div
        className={cx([
          `${baseClass}__wrapper`,
          inline && `${baseClass}__wrapper--inline`,
        ])}
      >
        {(labelText || labelRightNode) && (
          <div
            className={cx([
              `${baseClass}__label`,
              inline && `${baseClass}__label--inline`,
              !labelText && `${baseClass}__label--no-text`,
            ])}
          >
            {labelText && (
              <div className={cx(`${baseClass}__label-wrapper`)}>
                <label className="lc-field-label" htmlFor={labelFor}>
                  {labelText}
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
          {errorText && <span className="lc-field-error">{errorText}</span>}
          {descriptionNode && (
            <span className="lc-field-description">{descriptionNode}</span>
          )}
        </div>
      </div>
    </div>
  );
};
