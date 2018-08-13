import React from 'react';
import PropTypes from 'prop-types';
import { InformationIcon, CloseIcon } from 'react-material-icon-svg';
import classNames from 'classnames/bind';
import styles from './style.css';

const cx = classNames.bind(styles);

const Toast = props => {
    const {
        children,
        success,
        warning,
        error,
        info,
        className,
        ...toastProps
    } = props;

    let toastType = 'notification';

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
        'toast--success': success,
        'toast--warning': warning,
        'toast--error': error,
        'toast--info': info,
    })} ${className}
  `;

    return (
        <div
            {...toastProps}
            className={componentClassNames}
        >
            <div className={cx({
                'toast-icon': true,
            })}>
                <InformationIcon />
            </div>
            <div className={cx({
                'toast-content': true,
            })}>
                {children}
            </div>
            <div className={cx({
                'toast-close': true,
            })}>
                <CloseIcon />
            </div>
        </div>
    );
};

Toast.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string,
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
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    className: PropTypes.string,
};

Toast.defaultProps = {
    className: ''
};

export default Toast;
