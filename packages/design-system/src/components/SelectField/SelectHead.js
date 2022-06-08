import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';

const cx = classNames.bind(styles);

const baseClass = 'select-head';

const SelectHead = React.forwardRef((props, ref) => {
  const { isFocused, tabIndex = 0, disabled, children, ...restProps } = props;

  return (
    <div
      ref={ref}
      className={cx({
        [`${baseClass}`]: true,
        [`${baseClass}--focused`]: isFocused,
        [`${baseClass}--disabled`]: disabled
      })}
      disabled={disabled}
      data-testid="select-head"
      {...restProps}
      tabIndex={disabled ? -1 : tabIndex}
    >
      {children}
    </div>
  );
});

SelectHead.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  isFocused: PropTypes.bool,
  tabIndex: PropTypes.number,
};

export default SelectHead;
