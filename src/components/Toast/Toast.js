import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import classNames from 'classnames/bind';
import { ToastIcon } from './ToastIcon';
import { VARIANTS } from './constants';
import styles from './style.scss';

const cx = classNames.bind(styles);

const Toast = props => {
  const {
    children,
    className,
    variant,
    onClose,
    removable,
    toastId,
    ...restProps
  } = props;

  const componentClassNames = `
    ${cx({
      toast: true,
      [`toast--${variant}`]: VARIANTS.some(option => option === variant)
    })} ${className}
  `;

  return (
    <div {...restProps} className={componentClassNames}>
      <div className={styles.toast__icon}>
        <ToastIcon variant={variant} />
      </div>
      <div className={styles.toast__content}>{children}</div>
      {removable && (
        <div
          className={styles.toast__close}
          aria-label="Close toast"
          onClick={onClose}
        >
          <CloseIcon />
        </div>
      )}
    </div>
  );
};

Toast.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  onClose: PropTypes.func,
  removable: PropTypes.bool
};

export default Toast;
