import React from 'react';
import NotificationContext from './NotificationContext';

const notificationConnect = Component =>
  function ComponentWithNotifications(props) {
    return (
      <NotificationContext.Consumer>
        {({ add, remove, removeAll }) => (
          <Component {...props} notification={{ add, remove, removeAll }} />
        )}
      </NotificationContext.Consumer>
    );
  };

export default notificationConnect;
