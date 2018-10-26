export var helpers: {
  generateNotificationUniqueId: (notifications: {[id: string]: { [key: string]: any; }}) => string;
  getMergedClassNames: (classNames: string, classNameProperty: string) => string;
  callAll: (...fns: Function[]) => (...args: any[]) => any;
}
