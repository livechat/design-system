import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const Input = React.forwardRef((props, ref) => {
  const { error, className, ...restProps } = props;

  const mergedClassNames = getMergedClassNames(
    cx({
      input: true,
      'input--error': error
    }),
    className
  );

  return <input ref={ref} className={mergedClassNames} {...restProps} />;
});

Input.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  type: PropTypes.string
};

Input.defaultProps = {
  type: 'text'
};

export default Input;
