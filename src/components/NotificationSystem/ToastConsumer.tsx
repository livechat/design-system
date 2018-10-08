import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IToastConsumerProps } from 'interfaces/Toast';
import ToastWrapper from '../Toast/ToastWrapper';
import { VARIANTS } from './constants';
import NotificationContext from './NotificationContext';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

class ToastConsumer extends React.Component<IToastConsumerProps> {
  static propTypes = {
    /**
     * limit of visible toasts
     */
    itemsLimit: PropTypes.number,
    /**
     * fixed position of toasts
     */
    fixed: PropTypes.bool,
    verticalPosition: PropTypes.string,
    horizontalPosition: PropTypes.string
  };

  static defaultProps = {
    itemsLimit: 1,
    fixed: true
  };

  validateToast = ({ payload }) => {
    if (!VARIANTS.some(v => v === payload.variant)) {
      return false;
    }

    if (
      this.props.verticalPosition !== payload.verticalPosition ||
      this.props.horizontalPosition !== payload.horizontalPosition
    ) {
      return false;
    }

    return true;
  };

  render() {
    const {
      verticalPosition,
      horizontalPosition,
      fixed,
      ...restProps
    } = this.props;

    return (
      <NotificationContext.Consumer>
        {notificationSystem => (
          <ToastWrapper
            {...restProps}
            fixed={fixed}
            verticalPosition={verticalPosition}
            horizontalPosition={horizontalPosition}
            toasts={notificationSystem.notifications
              .filter(this.validateToast)
              .map(el => ({
                content: el.payload.content,
                variant: el.payload.variant,
                id: el.id,
                removable: el.payload.removable,
                onClose: callAll(el.payload.onClose, () =>
                  notificationSystem.remove(el.id)
                )
              }))}
          />
        )}
      </NotificationContext.Consumer>
    );
  }
}

export default ToastConsumer;
