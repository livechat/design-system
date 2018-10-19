// <reference types="react" />

export interface INotificationContext {
  add?: (
    opts: {
      type: string;
      autoHideDelayTime?: number;
      payload?: { [key: string]: any };
    }
  ) => string;
  remove?: (id: string) => string;
  removeAll?: () => string[];
  notifications?: {
    id: string;
    type: string;
    autoHideDelayTime?: number;
    payload: {
      [key: string]: any;
    };
  }[];
}

export interface INotificationQueueManager {
  shouldAddToQueue(currentItems: Array<any>): boolean;
  shouldPickFromQueue(currentItems: Array<any>): boolean;
  addToQueue(toast: { id: string; [key: string]: any }): string;
  pickFromQueue(): { id: string; [key: string]: any };
  clearQueue(): void;
}

export interface INotificationQueueManagerConstructor {
  new (itemsLimit: number, queueLimit: number): INotificationQueueManager;
}

export interface INotificationProviderProps {
  queueLimit?: number;
  itemsLimit?: number;
}

export var NotificationProvider: React.ComponentType<INotificationProviderProps>;
export var NotificationContext: React.Context<INotificationContext>;
export var notificationConnect: <P extends INotificationContext>(Component: React.ComponentType<P>) => React.ComponentType<P>;
