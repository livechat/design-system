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
    hideDuration,
    fixed,
    success,
    warning,
    error,
    info,
    className,
    onClose,
    ...toastProps
  } = props;

  const componentClassNames = `
  ${cx({
    toast: true,
    'toast--success': success,
    'toast--warning': warning,
    'toast--error': error,
    'toast--info': info,
    'toast--fixed': fixed,
  })} ${className}
`;

  if (hideDuration && onClose) {
    setTimeout(() => {
      onClose();
    }, hideDuration);
  }

  return (
    <div
      {...toastProps}
      className={componentClassNames}
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
  trigger: PropTypes.bool,
  hideDuration: PropTypes.number,
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
   * Function triggered on close (both by click and auto-hide)
   */
  onClose: PropTypes.func,
};

Toast.defaultProps = {
  className: '',
  fixed: true,
  hideDuration: 0,
};

export default Toast;
