import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const Input = React.forwardRef((props, ref) => {
  const { error, className, width, style, ...restProps } = props;

  const mergedClassNames = getMergedClassNames(
    cx({
      input: true,
      'input--error': error
    }),
    className
  );

  const mergedStyle = (style || width) ? {
    width,
    ...(style || {})
  } : void 0;

  return <input ref={ref} className={mergedClassNames} style={mergedStyle} {...restProps} />;
});

Input.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  width: PropTypes.string
};

Input.defaultProps = {
  type: 'text'
};

export default Input;
