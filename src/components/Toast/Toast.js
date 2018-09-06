import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
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

class Toast extends React.Component {
  constructor(props) {
    super(props);

    this.hideDelayTimeout = null;
    this.state = {
      exit: false
    };
  }

  componentDidMount() {
    const { hideDelayTime, onClose } = this.props;

    if (hideDelayTime && onClose) {
      this.hideDelayTimeout = setTimeout(() => {
        this.handleToastClose(onClose);
      }, hideDelayTime);
    }
  }

  componentWillUnmount() {
    if (this.hideDelayTimeout) {
      clearTimeout(this.hideDelayTimeout);
    }
  }

  handleToastClose(onCloseCallback) {
    if (this.props.fixed) {
      this.setState({
        exit: true
      });
      setTimeout(() => {
        onCloseCallback();
      }, ANIMATION_TIME);
    } else {
      onCloseCallback();
    }
  }

  render() {
    const toastProps = Object.assign({}, this.props);
    delete toastProps.hideDelayTime;

    const {
      children,
      className,
      id,
      horizontalPosition,
      verticalPosition,
      fixed,
      success,
      warning,
      error,
      info,
      onClose,
      ...restProps
    } = toastProps;

    if (horizontalPosition === 'center' && verticalPosition === 'middle')
      throw new Error("Toast can't be positioned on center of the screen!");

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

    const componentClassNames = `
    ${cx({
      toast: true,
      'toast--fixed': fixed,
      [`toast--${toastType}`]: toastType,
      [`toast--horizontal-${horizontalPosition}`]:
        fixed && HORIZONTAL_POSITION.some(s => s === horizontalPosition),
      [`toast--vertical-${verticalPosition}`]:
        fixed && VERTICAL_POSITION.some(s => s === verticalPosition),
      'toast--animation-exit': this.state.exit,
      'toast--animation-exit-active': this.state.exit
    })} ${className}
    `;

    return (
      <TransitionGroup>
        <CSSTransition
          key="toast"
          classNames={{
            appear: 'lc-toast--animation-appear',
            appearActive: 'lc-toast--animation-appear-active',
            exit: 'lc-toast--animation-exit',
            exitActive: 'lc-toast--animation-exit-active'
          }}
          appear={fixed}
          timeout={ANIMATION_TIME}
          enter={false}
        >
          <div {...restProps} className={componentClassNames} id={id}>
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
                onClick={() => this.handleToastClose(onClose)}
              >
                <CloseIcon />
              </div>
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

Toast.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  hideDelayTime: PropTypes.number,
  /**
   * Toast's horizontal position. Available values: 'left' | 'center' | 'right'
   */
  horizontalPosition: PropTypes.oneOf(['left', 'center', 'right']),
  /**
   * Toast's vertical position. Available values: 'top' | 'middle' | 'bottom'
   */
  verticalPosition: PropTypes.oneOf(['top', 'middle', 'bottom']),
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
