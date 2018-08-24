import React from 'react';
import PropTypes from 'prop-types';
import InformationIcon from 'react-material-icon-svg/dist/InformationIcon';
import CheckCircleIcon from 'react-material-icon-svg/dist/CheckCircleIcon';
import AlertIcon from 'react-material-icon-svg/dist/AlertIcon';
import AlertCircleIcon from 'react-material-icon-svg/dist/AlertCircleIcon';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import classNames from 'classnames/bind';
import styles from './style.scss';

const cx = classNames.bind(styles);
const acceptedHorizontalPositions = ['left', 'center', 'right'];
const acceptedVerticalPositions = ['top', 'middle', 'bottom'];

const Toast = props => {
  const {
    children,
    className,
    id,
    autoHideDuration,
    horizontalPosition,
    verticalPosition,
    fixed,
    success,
    warning,
    error,
    info,
    onClose,
    ...toastProps
  } = props;

  let toastType = false;

  if (success) {
    toastType = 'success';
  } else if (warning) {
    toastType = 'warning';
  } else if (error) {
    toastType = 'error';
  } else if (info) {
    toastType = 'info';
  }

  function Icon() {
    switch (toastType) {
      case 'success':
        return <CheckCircleIcon />;
      case 'warning':
        return <AlertIcon />;
      case 'error':
        return <AlertCircleIcon />;
      default:
        return <InformationIcon />;
    }
  }

  const componentClassNames = `
    ${cx({
    toast: true,
    'toast--fixed': fixed,
    [`toast--${toastType}`]: toastType,
    [`toast--horizontal-${horizontalPosition}`]:
    fixed &&
    acceptedHorizontalPositions.some(s => s === horizontalPosition),
    [`toast--vertical-${verticalPosition}`]:
    fixed && acceptedVerticalPositions.some(s => s === verticalPosition),
    'toast--centered':
      horizontalPosition === 'center' && verticalPosition === 'middle'
  })} ${className}
  `;

  if (autoHideDuration && onClose) {
    setTimeout(() => {
      onClose();
    }, autoHideDuration);
  }

  return (
    <div {...toastProps} className={componentClassNames} id={id}>
      <div
        className={cx({
          'toast-icon': true
        })}
      >
        <Icon />
      </div>
      <div
        className={cx({
          'toast-content': true
        })}
      >
        {children}
      </div>
      {onClose && (
        <div className={cx({ 'toast-close': true })} onClick={onClose}>
          <CloseIcon />
        </div>
      )}
    </div>
  );
};

Toast.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  autoHideDuration: PropTypes.number,
  /**
   * Toast's horizontal position. Available values: 'left' | 'center' | 'right'
   */
  horizontalPosition: PropTypes.string,
  /**
   * Toast's vertical position. Available values: 'top' | 'middle' | 'bottom'
   */
  verticalPosition: PropTypes.string,
  fixed: PropTypes.bool,
  /**
   * Type of toast
   */
  success: PropTypes.bool,
  /**
   * Type of toast
   */
  warning: PropTypes.bool,
  /**
   * Type of toast
   */
  error: PropTypes.bool,
  /**
   * Type of toast
   */
  info: PropTypes.bool,
  /**
   * Function triggered on toast's close action (both on click and after auto-hide duration)
   */
  onClose: PropTypes.func
};

Toast.defaultProps = {
  className: '',
  fixed: true,
  autoHideDuration: 0,
  horizontalPosition: 'center',
  verticalPosition: 'top'
};

export default Toast;