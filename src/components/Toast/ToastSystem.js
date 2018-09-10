class ToastSystem {
  notificationsWrapper;

  setProvider = element => {
    this.notificationsWrapper = element;
  };

  addToast(opts) {
    const { content, variant, autoHideDelayTime } = opts;
    this.notificationsWrapper.addToast({ content, variant, autoHideDelayTime });
  }
}

export default ToastSystem;
