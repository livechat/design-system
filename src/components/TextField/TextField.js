import React from 'react';
import PropTypes from 'prop-types';
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
    id,
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
      <div
        className={cx({
          [`${baseClass}__label--inline`]: inline
        })}
      >
        <FieldLabel htmlFor={id}>{labelText}</FieldLabel>
      </div>
      <div>
        {children}
        <FieldError>{error}</FieldError>
        <FieldDescription>{description}</FieldDescription>
      </div>
    </div>
  );
};

TextField.propTypes = {
  labelText: PropTypes.string,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  inline: PropTypes.bool,
  error: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node
};

export default TextField;
