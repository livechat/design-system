import React from 'react';
import PropTypes from 'prop-types';
import { generateUniqueId } from '@livechat/data-utils';
import NotificationContext from './NotificationContext';
import NotificationQueueManager from './NotificationQueueManager';

const initialState = {
  notifications: {}
};

class NotificationProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.queueManager = new NotificationQueueManager(0, 10);
  }
  state = initialState;

  add = opts => {
    const defaults = {
      type: 'toast',
      payload: {}
    };

    const notification = {
      ...defaults,
      ...opts
    };

    const { notifications } = this.state;

    const notificationId = generateUniqueId(notifications);

    if (this.queueManager.shouldAddToQueue(Object.keys(notifications))) {
      return this.queueManager.addToQueue();
    }

    this.setState({
      notifications: {
        ...notifications,
        [notificationId]: {
          ...notification,
          id: notificationId
        }
      }
    });
    return notificationId;
  };

  remove = notificationId => {
    const {
      [notificationId]: removedNotification,
      ...restNotifications
    } = this.state.notifications;

    this.setState({
      notifications: { ...restNotifications }
    });
  };

  removeAll = () => {
    this.setState(initialState);
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
            ...notifications[id],
            id
          }))
        }}
      >
        {this.props.children}
      </NotificationContext.Provider>
    );
  }
}

NotificationProvider.propTypes = {
  children: PropTypes.node
};

export default NotificationProvider;
