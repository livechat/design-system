import * as React from 'react';
import * as PropTypes from 'prop-types';
import ToastWrapper from '../Toast/ToastWrapper';
import NotificationContext from './NotificationContext';
import { VARIANTS } from '../../constants/toast';
import callAll from '../../utils/callAll';

class ToastConsumer extends React.Component {
  validateToast = ({ payload }) => {
    if (!VARIANTS.some(v => v === payload.variant)) {
      return false;
    }

    if (
      (this.props.name || payload.consumerName) &&
      this.props.name !== payload.consumerName
    ) {
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
      name,
      animationType,
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
            animationType={animationType}
            toasts={notificationSystem.notifications
              .filter(this.validateToast)
              .map(el => ({
                content: el.payload.content,
                variant: el.payload.variant,
                id: el.id,
                removable: el.payload.removable,
                onClose: callAll(el.payload.onClose, () =>
                  notificationSystem.remove(el.id)
                ),
                action: el.payload.action
              }))}
          />
        )}
      </NotificationContext.Consumer>
    );
  }
}

ToastConsumer.propTypes = {
  /**
   * fixed position of toasts
   */
  name: PropTypes.string,
  fixed: PropTypes.bool,
  animationType: PropTypes.string,
  verticalPosition: PropTypes.string.isRequired,
  horizontalPosition: PropTypes.string.isRequired
};

ToastConsumer.defaultProps = {
  animationType: 'slide',
  fixed: true
};

export default ToastConsumer;
