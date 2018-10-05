import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const Input = props => {
  const { error, className, ...restProps } = props;

  const baseClass = 'textarea';
  const mergedClassNames = getMergedClassNames(
    cx({
      [baseClass]: true,
      [`${baseClass}--error`]: error
    }),
    className
  );

  return <textarea className={mergedClassNames} {...restProps} />;
};

Input.propTypes = {
  error: PropTypes.string
};

export default Input;
