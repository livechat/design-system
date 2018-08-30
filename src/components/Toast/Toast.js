import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import classNames from 'classnames/bind';
import { ToastIcon } from './ToastIcon';
import {
  HORIZONTAL_POSITION,
  VERTICAL_POSITION,
  ANIMATION_TIME
} from './constants';
import styles from './style.scss';

const cx = classNames.bind(styles);

const Toast = props => {
  const {
    children,
    className,
    id,
    hideDelayTime,
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

  if (horizontalPosition === 'center' && verticalPosition === 'middle')
    throw new Error("Toast can't be positioned on center of the screen!");

  const toastRef = React.createRef();

  let toastType = null;

  if (success) {
    toastType = 'success';
  } else if (warning) {
    toastType = 'warning';
  } else if (error) {
    toastType = 'error';
  } else if (info) {
    toastType = 'info';
  }

  function handleToastClose(onCloseCallback) {
    if (fixed) {
      toastRef.current.classList.add('lc-toast--animation-leave');
      toastRef.current.classList.add('lc-toast--animation-leave-active');
      setTimeout(() => {
        onCloseCallback();
      }, ANIMATION_TIME);
    } else {
      onCloseCallback();
    }
  }

  const componentClassNames = `
    ${cx({
      toast: true,
      'toast--fixed': fixed,
      [`toast--${toastType}`]: toastType,
      [`toast--horizontal-${horizontalPosition}`]:
        fixed && HORIZONTAL_POSITION.some(s => s === horizontalPosition),
      [`toast--vertical-${verticalPosition}`]:
        fixed && VERTICAL_POSITION.some(s => s === verticalPosition)
    })} ${className}
    `;

  if (hideDelayTime && onClose) {
    setTimeout(() => {
      handleToastClose(onClose);
    }, hideDelayTime);
  }

  return (
    <ReactCSSTransitionGroup
      transitionName={{
        appear: 'lc-toast--animation-appear',
        appearActive: 'lc-toast--animation-appear-active'
      }}
      transitionAppear={fixed}
      transitionAppearTimeout={ANIMATION_TIME}
      transitionLeave={false}
      transitionEnter={false}
    >
      <div
        {...toastProps}
        className={componentClassNames}
        id={id}
        key="toast"
        ref={toastRef}
      >
        <div
          className={cx({
            'toast-icon': true
          })}
        >
          <ToastIcon toastType={toastType} />
        </div>
        <div
          className={cx({
            'toast-content': true
          })}
        >
          {children}
        </div>
        {onClose && (
          <div
            className={cx({ 'toast-close': true })}
            onClick={() => handleToastClose(onClose)}
          >
            <CloseIcon />
          </div>
        )}
      </div>
    </ReactCSSTransitionGroup>
  );
};

Toast.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  hideDelayTime: PropTypes.number,
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
  hideDelayTime: 0,
  horizontalPosition: 'center',
  verticalPosition: 'top'
};

export default Toast;
