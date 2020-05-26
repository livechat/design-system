import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import { Loader } from '../Loader';

const cx = classNames.bind(styles);
const acceptedSizes = ['large', 'compact'];
const acceptedIconPositions = ['left', 'right'];

const Button = React.forwardRef((props, ref) => {
  const {
    children,
    primary,
    destructive,
    disabled,
    loading,
    loaderLabel,
    icon,
    size,
    fullWidth,
    submit,
    secondary,
    accessibilityLabel,
    ariaControls,
    ariaExpanded,
    className,
    type: htmlType,
    text,
    iconPosition,
    ...buttonProps
  } = props;

  const isDisabled = disabled || loading;
  const type = submit ? 'submit' : htmlType || 'button';
  const buttonType =
    (primary && 'primary') ||
    (destructive && 'destructive') ||
    (secondary && 'secondary') ||
    (text && 'text') ||
    null;

  const baseClass = 'btn';
  const mergedClassNames = getMergedClassNames(
    cx({
      [baseClass]: true,
      [`${baseClass}--disabled`]: disabled,
      [`${baseClass}--loading`]: loading,
      [`${baseClass}--full-width`]: fullWidth,
      [`${baseClass}--${buttonType}`]: !!buttonType,
      [`${baseClass}--${size}`]: acceptedSizes.some(s => s === size)
    }),
    className
  );

  const positionedIcon = (
    <i
      className={getMergedClassNames(
        cx({
          [`${baseClass}__icon`]: true,
          [`${baseClass}__icon-left`]: iconPosition === 'left',
          [`${baseClass}__icon-right`]: iconPosition === 'right'
        })
      )}
    >
      {icon}
    </i>
  );

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={mergedClassNames}
      type={type}
      disabled={isDisabled}
      role={loading ? 'alert' : undefined}
      aria-busy={loading ? true : undefined}
      aria-label={accessibilityLabel}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
    >
      {loading && (
        <Loader
          size="small"
          label={loaderLabel}
          className={styles[`${baseClass}__loader`]}
          labelClassName={styles[`${baseClass}__loader-label`]}
        />
      )}
      {icon && positionedIcon}
      {children && <div>{children}</div>}
    </button>
  );
});

Button.defaultProps = {
  iconPosition: 'left'
};

Button.propTypes = {
  accessibilityLabel: PropTypes.string,
  ariaControls: PropTypes.string,
  ariaExpanded: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  /**
   * Type of button
   */
  primary: PropTypes.bool,
  /**
   * Type of button
   */
  destructive: PropTypes.bool,
  disabled: PropTypes.bool,
  /**
   * Sets button width to max-width=320px
   */
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  loading: PropTypes.bool,
  loaderLabel: PropTypes.node,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  /**
   * Type of button
   */
  secondary: PropTypes.bool,
  /**
   * Size of button
   */
  size: PropTypes.oneOf(acceptedSizes),
  submit: PropTypes.bool,
  type: PropTypes.string,
  /**
   * Type of button
   */
  text: PropTypes.bool,
  /**
   * Position of provided icon
   */
  iconPosition: PropTypes.oneOf(acceptedIconPositions)
};

export default Button;
