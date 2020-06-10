import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import { Loader } from '../Loader';
import { noticeAboutDeprecation } from '../../helpers/notice-about-deprecation';
import { ButtonIcon } from './ButtonIcon';

const cx = classNames.bind(styles);
const acceptedSizes = ['large', 'compact'];
const acceptedKinds = ['primary', 'secondary', 'destructive', 'text'];

const getDeprecatedKind = (primary, destructive, secondary) => {
  if (primary) {
    return 'primary';
  }

  if (destructive) {
    return 'destructive';
  }

  if (secondary) {
    return 'secondary';
  }

  return null;
};

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
    kind,
    iconPosition,
    ...buttonProps
  } = props;

  const isDisabled = disabled || loading;
  const type = submit ? 'submit' : htmlType || 'button';
  const isValidKind = kind && acceptedKinds.includes(kind);
  const deprecatedKind = getDeprecatedKind(primary, destructive, secondary);
  const buttonKind = (isValidKind && kind) || deprecatedKind || null;

  if (deprecatedKind) {
    noticeAboutDeprecation(
      `deprecated prop '${deprecatedKind}' in Button component - please use 'kind' prop instead`
    );
  }

  const baseClass = 'btn';
  const mergedClassNames = getMergedClassNames(
    cx({
      [baseClass]: true,
      [`${baseClass}--disabled`]: disabled,
      [`${baseClass}--loading`]: loading,
      [`${baseClass}--full-width`]: fullWidth,
      [`${baseClass}--${buttonKind}`]: !!buttonKind,
      [`${baseClass}--${size}`]: acceptedSizes.some(s => s === size)
    }),
    className
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
      {icon && <ButtonIcon position={iconPosition}>{icon}</ButtonIcon>}
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
   * Size of button
   */
  size: PropTypes.oneOf(['compact', 'large']),
  submit: PropTypes.bool,
  type: PropTypes.string,
  /**
   * Type of button
   */
  kind: PropTypes.oneOf(['primary', 'secondary', 'destructive', 'text']),
  /**
   * Position of provided icon
   */
  iconPosition: PropTypes.oneOf(['left', 'right']),
  /**
   * DEPRECATED - use 'kind' instead
   */
  primary: PropTypes.bool,
  /**
   * DEPRECATED - use 'kind' instead
   */
  destructive: PropTypes.bool,
  /**
   * DEPRECATED - use 'kind' instead
   */
  secondary: PropTypes.bool
};

export default Button;
