import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const TextArea = props => {
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

TextArea.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string
};

export default TextArea;
