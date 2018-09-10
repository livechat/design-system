import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {
  HORIZONTAL_POSITION,
  VERTICAL_POSITION,
  ANIMATION_TIME,
  VARIANTS
} from './constants';
import styles from './style.scss';
import Toast from './Toast';

const cx = classNames.bind(styles);

const ToastWrapper = props => {
  const { className, horizontalPosition, verticalPosition, fixed } = props;

  if (horizontalPosition === 'center' && verticalPosition === 'middle')
    throw new Error("Toast can't be positioned on center of the screen!");

  const componentClassNames = `
    ${cx({
      toast: true,
      'toast--fixed': fixed,
      [`toast--horizontal-${horizontalPosition}`]:
        fixed && HORIZONTAL_POSITION.some(s => s === horizontalPosition),
      [`toast--vertical-${verticalPosition}`]:
        fixed && VERTICAL_POSITION.some(s => s === verticalPosition)
    })} ${className}
    `;

  return (
    <TransitionGroup>
      {props.toasts.map(({ toastId, variant, content, onClose }, index) => (
        <CSSTransition
          key={toastId}
          classNames={{
            enter: 'lc-toast--animation-appear',
            enterActive: 'lc-toast--animation-appear-active',
            exit: 'lc-toast--animation-exit',
            exitActive: 'lc-toast--animation-exit-active'
          }}
          appear={fixed}
          timeout={ANIMATION_TIME}
        >
          <Toast
            className={componentClassNames}
            // style={{ top: `calc(${index * 40}px + ${(index + 1) * 5}px)` }}
            variant={variant}
            onClose={onClose}
          >
            {content}
          </Toast>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

ToastWrapper.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.node,
      variant: PropTypes.oneOf(VARIANTS)
    })
  ),
  className: PropTypes.string,
  /**
   * Toast's horizontal position. Available values: 'left' | 'center' | 'right'
   */
  horizontalPosition: PropTypes.string,
  /**
   * Toast's vertical position. Available values: 'top' | 'middle' | 'bottom'
   */
  verticalPosition: PropTypes.string,
  fixed: PropTypes.bool
};

ToastWrapper.defaultProps = {
  className: '',
  toasts: [],
  fixed: true,
  horizontalPosition: 'center',
  verticalPosition: 'top'
};

export default ToastWrapper;
