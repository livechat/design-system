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
            [`${baseClass}__label--inline`]: inline
          })}
        >
          <FieldLabel htmlFor={htmlFor}>{labelText}</FieldLabel>
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
  htmlFor: PropTypes.string.isRequired,
  className: PropTypes.string,
  inline: PropTypes.bool,
  error: PropTypes.string,
  description: PropTypes.node,
  children: PropTypes.node
};

export default TextField;
