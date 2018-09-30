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
  const { verticalPosition, horizontalPosition, fixed, block } = props;

  const baseClass = 'toast-wrapper';

  const getWrapperClassNames = () => {
    const wrapperClassNames = cx({
      [baseClass]: true,
      [`${baseClass}--fixed`]: fixed,
      [`${baseClass}--block`]: !fixed && block,
      [`${baseClass}--horizontal-${horizontalPosition}`]: HORIZONTAL_POSITION.some(
        s => s === horizontalPosition
      ),
      [`${baseClass}--vertical-${verticalPosition}`]: VERTICAL_POSITION.some(
        s => s === verticalPosition
      )
    });
    return wrapperClassNames;
  };

  return (
    <div className={getWrapperClassNames()}>
      <TransitionGroup>
        {props.toasts.map(({ id, variant, content, onClose, removable }) => (
          <CSSTransition
            key={id}
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
              variant={variant}
              onClose={onClose}
              removable={removable}
              className={styles.toast__single}
            >
              {content}
            </Toast>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

ToastWrapper.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      toastId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      content: PropTypes.node,
      variant: PropTypes.oneOf(VARIANTS),
      autoHideDelayTime: PropTypes.number,
      removable: PropTypes.bool
    })
  ),
  fixed: PropTypes.bool,
  block: PropTypes.bool,
  verticalPosition: PropTypes.string,
  horizontalPosition: PropTypes.string
};

ToastWrapper.defaultProps = {
  toasts: [],
  fixed: true,
  block: false,
  verticalPosition: 'top',
  horizontalPosition: 'center'
};

export default ToastWrapper;
