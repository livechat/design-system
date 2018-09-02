import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';

const cx = classNames.bind(styles);

const Input = props => {
  const { error, ...restProps } = props;
  return (
    <input
      className={cx({
        input: true,
        'input--error': error
      })}
      {...restProps}
    />
  );
};

Input.propTypes = {
  error: PropTypes.string
};

export default Input;
