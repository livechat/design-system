import React from 'react';
import PropTypes from 'prop-types';
import InformationIcon from 'react-material-icon-svg/dist/InformationIcon';
import CheckCircleIcon from 'react-material-icon-svg/dist/CheckCircleIcon';
import AlertIcon from 'react-material-icon-svg/dist/AlertIcon';
import AlertCircleIcon from 'react-material-icon-svg/dist/AlertCircleIcon';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import classNames from 'classnames/bind';
import styles from './style.css';

const cx = classNames.bind(styles);

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



  const cssClasses = {
    toast: true,
    'toast--success': success,
    'toast--warning': warning,
    'toast--error': error,
    'toast--info': info,
    'toast--fixed': fixed,
  };

  cssClasses['toast--horizontal-' + horizontalPosition] = fixed;
  cssClasses['toast--vertical-' + verticalPosition] = fixed;
  cssClasses['toast--centered'] = (horizontalPosition == 'center' && verticalPosition == 'middle');

  const componentClassNames = `${cx(cssClasses)} ${className}`;

  if (autoHideDuration && onClose) {
    setTimeout(() => {
      onClose();
    }, autoHideDuration);
  }

  return (
    <div
      {...toastProps}
      className={componentClassNames}
      id={id}
    >
      <div className={cx({
        'toast-icon': true,
      })}>
        {(success) ? <CheckCircleIcon /> : (
          (warning) ? <AlertIcon /> : (
            (error) ? <AlertCircleIcon /> :
              <InformationIcon />
          )
        )}
      </div>
      <div className={cx({
        'toast-content': true,
      })}>
        {children}
      </div>
      {(onClose &&
        <div className={cx({'toast-close': true,})} onClick={onClose}>
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
  horizontalPosition: PropTypes.string,
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
  onClose: PropTypes.func,
};

Toast.defaultProps = {
  className: '',
  fixed: true,
  autoHideDuration: 0,
  horizontalPosition: 'center',
  verticalPosition: 'top',
};

export default Toast;
