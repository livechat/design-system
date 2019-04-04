import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);
const acceptedSizes = ['basic', 'compact'];
const baseClass = 'switch';

const Switch = props => {
  const { className, size, innerRef, on, onChange, ...restProps } = props;

  const mergedClassNames = getMergedClassNames(
    cx({
      [baseClass]: true,
      [`${baseClass}--${size}`]: acceptedSizes.some(s => s === size)
    }),
    className
  );
  const valueStyles = on ? 'enabled' : 'disabled';

  return (
    <span className={mergedClassNames} ref={innerRef} {...restProps}>
      <input
        type="checkbox"
        className={styles[`${baseClass}__input`]}
        onChange={onChange}
        checked={on}
      />
      <span className={styles[`${baseClass}__container`]}>
        <span
          className={classNames(
            styles[`${baseClass}__track`],
            styles[`${baseClass}__track--${valueStyles}`]
          )}
        />
        <span
          className={classNames(
            styles[`${baseClass}__slider`],
            styles[`${baseClass}__slider--${size}`],
            styles[`${baseClass}__slider--${size}--${valueStyles}`]
          )}
        />
      </span>
    </span>
  );
};

Switch.propTypes = {
  on: PropTypes.bool,
  size: PropTypes.oneOf(acceptedSizes),
  onChange: PropTypes.func.isRequired
};

Switch.defaultProps = {
  size: 'basic'
};

export default React.forwardRef((props, ref) => (
  <Switch innerRef={ref} {...props} />
));
