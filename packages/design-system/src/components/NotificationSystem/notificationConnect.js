import * as React from 'react';
import NotificationContext from './NotificationContext';

const notificationConnect = Component =>
  function ComponentWithNotifications(props) {
    return (
      <NotificationContext.Consumer>
        {({ add, remove, removeAll }) => (
          <Component
            {...props}
            notificationSystem={{ add, remove, removeAll }}
          />
        )}
      </NotificationContext.Consumer>
    );
  };

export default notificationConnect;
