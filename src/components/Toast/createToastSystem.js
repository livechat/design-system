import { INFO, WARNING, ERROR, SUCCESS } from './constants';

class ToastSystem {
  constructor(container = null) {
    if (container) {
      this.container = container;
    }
  }

  setContainer = container => {
    this.container = container;
  };

  addToast(opts) {
    if (!this.container) {
      return;
    }

    const defaults = {
      content: '',
      variant: null,
      autoHideDelayTime: null,
      removable: false
    };

    this.container.addToast({ ...defaults, ...opts });
  }

  default = opts => {
    const { variant, ...restOpts } = opts;
    return this.addToast(restOpts);
  };

  success = opts => this.addToast({ ...opts, variant: SUCCESS });

  info = opts => this.addToast({ ...opts, variant: INFO });

  warning = opts => this.addToast({ ...opts, variant: WARNING });

  error = opts => this.addToast({ ...opts, variant: ERROR });
}

const createToastSystem = () => new ToastSystem();

export default createToastSystem;
