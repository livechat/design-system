import React from 'react';
import { generateUniqueId } from '@livechat/data-utils';
import ToastWrapper from './ToastWrapper';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

class ToastContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toasts: {},
      queue: []
    };

    this.props.setToastSystem(this);
    this.timeouts = {};
  }

  componentWillUnmount() {
    Object.keys(this.timeouts).forEach(t => clearTimeout(t));
  }

  shouldPickFromQueue = () => {
    const { toasts, queue } = this.state;
    const { itemsLimit } = this.props;
    console.log(
      'shouldPickFromQueue',
      itemsLimit,
      queue.length > 0,
      Object.keys(toasts).length
    );
    return (
      itemsLimit && queue.length > 0 && Object.keys(toasts).length < itemsLimit
    );
  };

  addToast = toast => {
    const { content, variant, autoHideDelayTime, onClick } = toast;
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
            onClose: callAll(onClick, () => this.removeToast(toastId))
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
    console.log('addToQueue', toast, this.state.queue);
    this.setState({
      queue: [...this.state.queue, toast]
    });
  };

  pickFromQueue = () => {
    if (this.state.queue.length > 0) {
      const [queued, ...restQueued] = this.state.queue;
      console.log('pickFromQueue', queued);
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

  render() {
    const { toastSystem, ...restProps } = this.props;
    const toasts = Object.keys(this.state.toasts).map(toastId => ({
      ...this.state.toasts[toastId],
      toastId
    }));

    return <ToastWrapper {...restProps} toasts={toasts} />;
  }
}

export default ToastContainer;
