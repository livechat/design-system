import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import { Loader } from '../Loader';
import { withTheme } from '../ThemeProvider';

const cx = classNames.bind(styles);
const acceptedSizes = ['large', 'compact'];

const Button = withTheme(props => {
  const {
    children,
    primary,
    destructive,
    disabled,
    loading,
    icon,
    size,
    fullWidth,
    submit,
    secondary,
    accessibilityLabel,
    ariaControls,
    ariaExpanded,
    theme,
    themeName,
    className,
    type: htmlType,
    forwardedRef,
    ...buttonProps
  } = props;

  const isDisabled = disabled || loading;
  const type = submit ? 'submit' : htmlType || 'button';
  let buttonType = null;

  if (primary) {
    buttonType = 'primary';
  } else if (destructive) {
    buttonType = 'destructive';
  } else if (secondary) {
    buttonType = 'secondary';
  }

  const baseClass = 'btn';
  const mergedClassNames = getMergedClassNames(
    cx({
      [baseClass]: true,
      [`lc-${baseClass}--theme-${themeName}`]: true,
      [`${baseClass}--disabled`]: disabled,
      [`${baseClass}--loading`]: loading,
      [`${baseClass}--full-width`]: fullWidth,
      [`${baseClass}--primary`]: buttonType === 'primary',
      [`${baseClass}--destructive`]: buttonType === 'destructive',
      [`${baseClass}--secondary`]: buttonType === 'secondary',
      [`${baseClass}--${size}`]: acceptedSizes.some(s => s === size)
    }),
    className
  );

  return (
    <button
      {...buttonProps}
      ref={forwardedRef}
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
        <Loader size="small" className={styles[`${baseClass}__loader`]} />
      )}
      {icon && <i className={styles[`${baseClass}__icon`]}>{icon}</i>}
      {children}
    </button>
  );
});

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
  size: PropTypes.oneOf(['compact', 'large']),
  submit: PropTypes.bool,
  theme: PropTypes.object,
  themeName: PropTypes.string,
  type: PropTypes.string
};

const ButtonWithRef = React.forwardRef((props, ref) => (
  <Button {...props} forwardedRef={ref} />
));

ButtonWithRef.propTypes = Button.propTypes;
ButtonWithRef.displayName = 'Button';

export default ButtonWithRef;
