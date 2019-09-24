import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';

const cx = classNames.bind(styles);

const baseClass = 'select-head';

const SelectHead = React.forwardRef((props, ref) => {
  const { isFocused, disabled, children, ...restProps } = props;

  return (
    <div
      ref={ref}
      className={cx({
        [`${baseClass}`]: true,
        [`${baseClass}--focused`]: isFocused,
        [`${baseClass}--disabled`]: disabled
      })}
      disabled={disabled}
      {...restProps}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </div>
  );
});

SelectHead.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  isFocused: PropTypes.bool
};

export default SelectHead;
