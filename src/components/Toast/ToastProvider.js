import React from 'react';
import PropTypes from 'prop-types';
import { generateUniqueId } from '@livechat/data-utils';
import ToastWrapper from './ToastWrapper';
import { INFO, WARNING, ERROR, SUCCESS } from './constants';
import ToastContext from './ToastContext';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));
const initialState = {
  toasts: {},
  queue: []
};

class ToastProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.timeouts = {};
    this.wrappers = [
      { id: 1, vertical: 'top', horizontal: 'right' },
      { id: 2, vertical: 'top', horizontal: 'center' },
      { id: 3, vertical: 'top', horizontal: 'left' },
      { id: 4, vertical: 'bottom', horizontal: 'right' },
      { id: 5, vertical: 'bottom', horizontal: 'center' },
      { id: 6, vertical: 'bottom', horizontal: 'left' }
    ];
  }

  componentWillUnmount() {
    Object.keys(this.timeouts).forEach(t => clearTimeout(t));
  }

  shouldPickFromQueue = () => {
    const { toasts, queue } = this.state;
    const { itemsLimit } = this.props;

    return (
      itemsLimit && queue.length > 0 && Object.keys(toasts).length < itemsLimit
    );
  };

  addToast = toast => {
    const defaults = {
      content: '',
      variant: null,
      autoHideDelayTime: null,
      removable: false,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    };

    const {
      content,
      variant,
      autoHideDelayTime,
      onClose,
      verticalPosition,
      horizontalPosition,
      removable
    } = {
      ...defaults,
      ...toast
    };
    const { itemsLimit } = this.props;
    const { toasts } = this.state;

    const toastId = generateUniqueId(toasts);

    if (itemsLimit && Object.keys(toasts).length >= itemsLimit) {
      this.addToQueue({ ...toast, id: toastId });
      return toastId;
    }

    this.setState(
      {
        toasts: {
          ...toasts,
          [toastId]: {
            content,
            horizontalPosition,
            verticalPosition,
            variant,
            removable,
            onClose: callAll(onClose, () => this.removeToast(toastId))
          }
        }
      },
      () => {
        if (autoHideDelayTime) {
          this.timeouts[toastId] = setTimeout(() => {
            this.removeToast(toastId);
          }, autoHideDelayTime);
        }
      }
    );
    return toastId;
  };

  addToQueue = toast => {
    this.setState({
      queue: [...this.state.queue, toast]
    });
  };

  pickFromQueue = () => {
    if (this.state.queue.length > 0) {
      const [queued, ...restQueued] = this.state.queue;
      this.setState(
        {
          queue: [...restQueued]
        },
        () => this.addToast(queued)
      );
    }
  };

  removeToast = toastId => {
    const { [toastId]: id, ...restToasts } = this.state.toasts;
    const filteredQueue = this.state.queue.filter(
      queued => queued.id !== toastId
    );

    this.setState(
      {
        toasts: { ...restToasts },
        queue: filteredQueue
      },
      () => {
        if (this.shouldPickFromQueue()) {
          this.pickFromQueue();
        }
      }
    );
  };

  success = opts => this.addToast({ ...opts, variant: SUCCESS });

  info = opts => this.addToast({ ...opts, variant: INFO });

  warning = opts => this.addToast({ ...opts, variant: WARNING });

  error = opts => this.addToast({ ...opts, variant: ERROR });

  notification = opts => {
    const { variant, ...restOpts } = opts;
    return this.addToast(restOpts);
  };

  removeAllToasts = () => {
    this.setState(initialState);
  };

  render() {
    const { toastSystem, children, ...restProps } = this.props;
    const toasts = Object.keys(this.state.toasts).map(toastId => ({
      ...this.state.toasts[toastId],
      toastId
    }));

    return (
      <React.Fragment>
        {this.wrappers.map(({ id, vertical, horizontal }) => {
          const wrapperToasts = toasts.filter(
            toast =>
              toast.horizontalPosition === horizontal &&
              toast.verticalPosition === vertical
          );
          return (
            <ToastWrapper
              key={id}
              {...restProps}
              verticalPosition={vertical}
              horizontalPosition={horizontal}
              toasts={wrapperToasts}
            />
          );
        })}
        <ToastContext.Provider
          value={{
            success: this.success,
            info: this.info,
            warning: this.warning,
            error: this.error,
            notification: this.notification,
            removeToast: this.removeToast,
            removeAllToasts: this.removeAllToasts
          }}
        >
          {children}
        </ToastContext.Provider>
      </React.Fragment>
    );
  }
}

ToastProvider.propTypes = {
  /**
   * limit of visible toasts
   */
  itemsLimit: PropTypes.number,
  /**
   * fixed position of toasts
   */
  fixed: PropTypes.bool
};

ToastProvider.defaultProps = {
  itemsLimit: 1,
  fixed: true
};

export default ToastProvider;
