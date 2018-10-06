export default class NotificationQueueManager {
  constructor(itemsLimit, queueLimit = 20) {
    this.queue = [];
    this.queueLimit = queueLimit;
    this.itemsLimit = itemsLimit;
  }

  shouldAddToQueue = currentItems => {
    if (
      currentItems.length >= this.itemsLimit &&
      this.queue.length <= this.queueLimit
    ) {
      return true;
    }
    return false;
  };

  /* eslint-disable-next-line */
  shouldPickFromQueue = currentItems => {
    return (
      this.itemsLimit &&
      this.queue.length > 0 &&
      currentItems.length < this.itemsLimit
    );
  };

  addToQueue = toast => {
    this.queue = [...this.queue, toast];
    return toast.id;
  };

  pickFromQueue = () => {
    const [picked, ...restQueued] = this.queue;

    this.queue = restQueued;

    return picked;
  };

  clearQueue = () => {
    this.queue = [];
  };
}
