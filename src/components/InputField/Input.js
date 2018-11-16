import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const Input = props => {
  const { error, className, ...restProps } = props;

  const mergedClassNames = getMergedClassNames(
    cx({
      input: true,
      'input--error': error
    }),
    className
  );

  return <input className={mergedClassNames} {...restProps} />;
};

Input.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string
};

Input.defaultProps = {
  type: 'text'
};

export default Input;
