import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import FieldLabel from '../FieldLabel';
import FieldError from '../FieldError';
import FieldDescription from '../FieldDescription';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const TextField = props => {
  const {
    inline,
    error,
    description,
    labelText,
    labelAdornment,
    className,
    htmlFor,
    children
  } = props;

  const baseClass = 'text-field';
  const mergedClassNames = getMergedClassNames(
    cx({
      [baseClass]: true,
      [`${baseClass}--inline`]: inline
    }),
    className
  );

  return (
    <div className={mergedClassNames}>
      {labelText && (
        <div
          className={cx({
            [`${baseClass}__label`]: true,
            [`${baseClass}__label--inline`]: inline
          })}
        >
          <FieldLabel htmlFor={htmlFor}>{labelText}</FieldLabel>
          {labelAdornment && (
            <div className={cx({ [`${baseClass}__label-adornment`]: true })}>
              {labelAdornment}
            </div>
          )}
        </div>
      )}
      <div>
        {children}
        {error && <FieldError>{error}</FieldError>}
        {description && <FieldDescription>{description}</FieldDescription>}
      </div>
    </div>
  );
};

TextField.propTypes = {
  labelText: PropTypes.string,
  /**  specifies additional decorative element rendered at the end of the label */
  labelAdornment: PropTypes.node,
  htmlFor: PropTypes.string.isRequired,
  className: PropTypes.string,
  inline: PropTypes.bool,
  error: PropTypes.string,
  description: PropTypes.node,
  children: PropTypes.node
};

export default TextField;
