import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames/bind';
import {
  HORIZONTAL_POSITION,
  VERTICAL_POSITION,
  ANIMATION_TIME,
  VARIANTS
} from '../../constants/toast';
import styles from './style.scss';
import Toast from './Toast';

const cx = classNames.bind(styles);

const ToastWrapper = props => {
  const {
    verticalPosition,
    horizontalPosition,
    fixed,
    block,
    toasts,
    animationType,
    className,
    ...restProps
  } = props;

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
      ),
      [className]: className
    });

    return wrapperClassNames;
  };

  return (
    <div {...restProps} className={getWrapperClassNames()}>
      <TransitionGroup component={null}>
        {toasts.map(({ id, variant, content, onClose, removable, action }) => (
          <CSSTransition
            key={id}
            classNames={{
              enter: `lc-toast-appear--${animationType}`,
              enterActive: `lc-toast-appear-active--${animationType}`,
              exit: `lc-toast-exit--${animationType}`,
              exitActive: `lc-toast-exit-active--${animationType}`
            }}
            timeout={ANIMATION_TIME}
          >
            <Toast
              variant={variant}
              onClose={onClose}
              removable={removable}
              action={action}
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
  className: PropTypes.string,
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      content: PropTypes.node,
      variant: PropTypes.oneOf(VARIANTS),
      autoHideDelayTime: PropTypes.number,
      removable: PropTypes.bool
    })
  ),
  fixed: PropTypes.bool,
  block: PropTypes.bool,
  animationType: PropTypes.string,
  verticalPosition: PropTypes.string,
  horizontalPosition: PropTypes.string
};

ToastWrapper.defaultProps = {
  toasts: [],
  fixed: true,
  block: false,
  animationType: 'slide',
  verticalPosition: 'top',
  horizontalPosition: 'center'
};

export default ToastWrapper;
