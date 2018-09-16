import React from 'react';
import { generateUniqueId } from '@livechat/data-utils';
import ToastWrapper from './ToastWrapper';
import { INFO, WARNING, ERROR, SUCCESS } from './constants';
import ToastContext from './ToastContext';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

class ToastProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toasts: {},
      queue: []
    };
    this.timeouts = {};
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
      removable: false
    };

    const { content, variant, autoHideDelayTime, onClose, removable } = {
      ...defaults,
      ...toast
    };
    const { itemsLimit } = this.props;
    const { toasts } = this.state;

    if (itemsLimit && Object.keys(toasts).length >= itemsLimit) {
      return this.addToQueue(toast);
    }

    const toastId = generateUniqueId(toasts);
    return this.setState(
      {
        toasts: {
          ...toasts,
          [toastId]: {
            content,
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
    this.setState(
      {
        toasts: { ...restToasts }
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

  default = opts => {
    const { variant, ...restOpts } = opts;
    return this.addToast(restOpts);
  };

  render() {
    const { toastSystem, children, ...restProps } = this.props;
    const toasts = Object.keys(this.state.toasts).map(toastId => ({
      ...this.state.toasts[toastId],
      toastId
    }));

    return (
      <React.Fragment>
        <ToastWrapper {...restProps} toasts={toasts} />
        <ToastContext.Provider
          value={{
            success: this.success,
            info: this.info,
            warning: this.warning,
            error: this.error,
            default: this.default
          }}
        >
          {children}
        </ToastContext.Provider>
      </React.Fragment>
    );
  }
}

export default ToastProvider;
