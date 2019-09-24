import * as React from 'react';
import * as PropTypes from 'prop-types';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import classNames from 'classnames/bind';
import { ToastIcon } from './ToastIcon';
import { VARIANTS } from '../../constants/toast';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import callAll from '../../utils/callAll';

const cx = classNames.bind(styles);

const Toast = props => {
  const {
    children,
    className,
    variant,
    onClose,
    action,
    removable,
    id,
    ...restProps
  } = props;

  const mergedClassNames = getMergedClassNames(
    cx({
      toast: true,
      [`toast--${variant}`]: VARIANTS.some(option => option === variant)
    }),
    className
  );

  const onActionClick = actionProp => {
    if (actionProp && actionProp.closeOnClick && onClose) {
      return callAll(actionProp.handler, onClose);
    }
    return action.handler;
  };

  return (
    <div {...restProps} className={mergedClassNames} id={id}>
      <div className={styles.toast__icon}>
        <ToastIcon variant={variant} />
      </div>
      <div className={styles.toast__content}>{children}</div>
      {(action || removable) && (
        <div className={styles.toast__actions}>
          {action &&
            action.label &&
            action.handler && (
              <button
                className={styles['toast__actions-custom']}
                onClick={onActionClick(action)}
              >
                {action.label}
              </button>
            )}
          {removable && (
            <div
              className={styles['toast__actions-close']}
              aria-label="Close toast"
              onClick={onClose}
            >
              <CloseIcon />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

Toast.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(VARIANTS),
  onClose: PropTypes.func,
  removable: PropTypes.bool,
  action: PropTypes.shape({
    handler: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    closeOnClick: PropTypes.bool
  })
};

export default Toast;
