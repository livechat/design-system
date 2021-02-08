import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';

const cx = classNames.bind(styles);

const baseClass = 'multiselect-head';

const MultiSelectHead = React.forwardRef((props, ref) => {
  const { isFocused, disabled, children, ...restProps } = props;

  return (
    <div
      ref={ref}
      className={cx({
        [`${baseClass}`]: true,
        [`${baseClass}--focused`]: isFocused,
        [`${baseClass}--disabled`]: disabled
      })}
      data-testid="multiselect-head"
      {...restProps}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </div>
  );
});

MultiSelectHead.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  isFocused: PropTypes.bool
};

export default MultiSelectHead;
