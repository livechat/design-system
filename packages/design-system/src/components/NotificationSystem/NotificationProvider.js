import * as React from 'react';
import * as PropTypes from 'prop-types';
import generateNotificationUniqueId from '../../utils/generateNotificationUniqueId';
import NotificationContext from './NotificationContext';
import NotificationQueueManager from './NotificationQueueManager';

const initialState = {
  notifications: {}
};

class NotificationProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.timeouts = {};
    if (props.queueLimit) {
      this.queueManager = new NotificationQueueManager(
        props.itemsLimit,
        props.queueLimit
      );
    }
  }

  componentWillUnmount() {
    Object.keys(this.timeouts).forEach(t => clearTimeout(this.timeouts[t]));
  }

  setRemoveDelay = notification => {
    if (notification.autoHideDelayTime) {
      this.timeouts[notification.id] = setTimeout(() => {
        this.remove(notification.id);
      }, notification.autoHideDelayTime);
    }
  };

  add = opts => {
    const defaults = {
      type: 'toast',
      autoHideDelayTime: null,
      payload: {}
    };

    const { notifications } = this.state;

    const notificationId = generateNotificationUniqueId(notifications);

    const notification = {
      ...defaults,
      ...opts,
      id: notificationId
    };

    if (
      this.queueManager &&
      this.queueManager.shouldAddToQueue(Object.keys(notifications))
    ) {
      return this.queueManager.addToQueue(notification);
    }

    if (Object.keys(notifications).length >= this.props.itemsLimit) {
      return null;
    }

    this.setState(
      {
        notifications: {
          ...notifications,
          [notificationId]: {
            ...notification
          }
        }
      },
      () => this.setRemoveDelay(notification)
    );
    return notificationId;
  };

  remove = notificationId => {
    const {
      [notificationId]: removedNotification,
      ...restNotifications
    } = this.state.notifications;

    let newState = { notifications: { ...restNotifications } };
    let notificationFromQueue;

    if (
      this.queueManager &&
      this.queueManager.shouldPickFromQueue(Object.keys(restNotifications))
    ) {
      notificationFromQueue = this.queueManager.pickFromQueue();
      newState = {
        notifications: {
          ...restNotifications,
          [notificationFromQueue.id]: notificationFromQueue
        }
      };
    }

    this.clearDelayTimeout(notificationId);

    if (!notificationFromQueue) {
      this.setState(newState);
      return null;
    }

    this.setState(newState, () => this.setRemoveDelay(notificationFromQueue));
    return notificationFromQueue.id;
  };

  removeAll = () => {
    const notificationsIds = Object.keys(this.state.notifications);
    this.setState(initialState);
    if (this.queueManager) {
      this.queueManager.clearQueue();
    }
    return notificationsIds;
  };

  clearDelayTimeout = id => {
    const { [id]: timeoutToClear, ...restTimeouts } = this.timeouts;
    clearTimeout(timeoutToClear);
    this.timeouts = restTimeouts;
  };

  render() {
    const { notifications } = this.state;

    return (
      <NotificationContext.Provider
        value={{
          add: this.add,
          remove: this.remove,
          removeAll: this.removeAll,
          notifications: Object.keys(notifications).map(id => ({
            ...notifications[id]
          }))
        }}
      >
        {this.props.children}
      </NotificationContext.Provider>
    );
  }
}

NotificationProvider.propTypes = {
  children: PropTypes.node,
  itemsLimit: PropTypes.number,
  queueLimit: PropTypes.number
};

NotificationProvider.defaultProps = {
  itemsLimit: 1
};

export default NotificationProvider;
