import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const TextArea = React.forwardRef((props, ref) => {
  const { error, className, width, style, ...restProps } = props;

  const baseClass = 'textarea';
  const mergedClassNames = getMergedClassNames(
    cx({
      [baseClass]: true,
      [`${baseClass}--error`]: error
    }),
    className
  );
  const mergedStyle = (style || width) ? {
    width,
    ...(style || {})
  } : void 0;

  return <textarea ref={ref} className={mergedClassNames} style={mergedStyle} {...restProps} />;
});

TextArea.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string
};

export default TextArea;
