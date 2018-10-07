import * as React from 'react';
import { INotificationContext } from 'interfaces/NotificationSystem';

const NotificationContext: React.Context<
  INotificationContext
> = React.createContext({});

export default NotificationContext;
