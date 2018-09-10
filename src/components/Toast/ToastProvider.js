import React from 'react';
import { generateUniqueId } from '@livechat/data-utils';
import ToastWrapper from './ToastWrapper';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

class ToastContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toasts: {}
    };
    this.props.attachApi(this);
  }

  addToast = ({ content, variant, autoHideDelayTime, onClick }) => {
    const toastId = generateUniqueId(this.state.toasts);
    this.setState(
      {
        toasts: {
          ...this.state.toasts,
          [toastId]: {
            content,
            variant,
            onClose: callAll(onClick, () => this.removeToast(toastId))
          }
        }
      },
      () => {
        if (autoHideDelayTime) {
          setTimeout(() => {
            this.removeToast(toastId);
          }, autoHideDelayTime);
        }
      }
    );
  };

  removeToast = toastId => {
    const { [toastId]: id, ...restToasts } = this.state.toasts;
    this.setState({
      toasts: { ...restToasts }
    });
  };

  render() {
    const { toastSystem, ...restProps } = this.props;
    const toasts = Object.keys(this.state.toasts)
      .map(toastId => ({ ...this.state.toasts[toastId], toastId }))
      .reverse();

    return <ToastWrapper {...restProps} toasts={toasts} />;
  }
}

export default ToastContainer;
