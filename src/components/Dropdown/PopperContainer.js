import * as React from 'react';
import * as PropTypes from 'prop-types';
import cssClassNames from 'classnames/bind';
import Popper from 'popper.js';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import { KeyCodes } from '../../constants/keyCodes';

const cx = cssClassNames.bind(styles);

const baseClass = 'popper';

class PopperContainer extends React.PureComponent {
  static defaultProps = {
    flipBehavior: 'flip',
    preventOverflow: true,
    closeOnEscPress: true
  };

  componentDidMount() {
    if (this.props.isVisible) {
      this.initializePopper();
    }
  }

  componentDidUpdate(prevProps) {
    const isShown = !prevProps.isVisible && this.props.isVisible;
    const isHidden = prevProps.isVisible && !this.props.isVisible;

    if (isShown) {
      this.initializePopper();
    }

    if (isHidden) {
      this.removeEventHandlers();
    }
  }

  componentWillUnmount() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }

    this.removeEventHandlers();
  }

  onDocumentClick = event => {
    if (
      this.modalRef.current &&
      !this.modalRef.current.contains(event.target)
    ) {
      this.handleCloseModal();
    }
  };

  getPopperOptions() {
    const { placement, offset, flipBehavior, preventOverflow } = this.props;
    return {
      placement,
      modifiers: {
        offset: {
          offset
        },
        flip: {
          enabled: true,
          behavior: flipBehavior
        },
        hide: {
          enabled: false
        },
        preventOverflow: {
          enabled: preventOverflow
        }
      }
    };
  }

  initializePopper = () => {
    if (!this.popperInstance) {
      this.popperInstance = new Popper(
        this.triggerRef.current,
        this.contentRef.current,
        this.getPopperOptions()
      );
    }

    this.addEventHandlers();
    this.popperInstance.scheduleUpdate();
  };

  addEventHandlers = () => {
    if (this.props.closeOnEscPress) {
      document.addEventListener('keyup', this.handleEscKeyUp, true);
    }
    document.addEventListener('click', this.handleDocumentClick);
  };

  removeEventHandlers = () => {
    document.removeEventListener('keyup', this.handleEscKeyUp, true);
    document.removeEventListener('click', this.handleDocumentClick);
  };

  handleDocumentClick = event => {
    if (
      this.props.onClose &&
      this.contentRef.current &&
      !this.contentRef.current.contains(event.target)
    ) {
      this.props.onClose();
    }
  };

  handleEscKeyUp = event => {
    if (this.props.onClose && event.keyCode === KeyCodes.esc) {
      this.props.onClose();
    }
  };

  toggle = () => {
    if (this.props.isVisible) {
      if (this.props.onClose) {
        this.props.onClose();
      }
    } else if (this.props.onOpen) {
      this.props.onOpen();
    }
  };

  triggerRef = React.createRef();
  contentRef = React.createRef();

  render() {
    const {
      children,
      className,
      trigger,
      isVisible,
      closeOnEscPress,
      preventOverflow,
      flipBehavior,
      onOpen,
      onClose,
      ...restProps
    } = this.props;

    const mergedClassNames = getMergedClassNames(
      styles[`${baseClass}`],
      className
    );

    return (
      <div className={mergedClassNames} {...restProps}>
        <div
          ref={this.triggerRef}
          className={cx('popper__trigger')}
          onClick={this.toggle}
        >
          {trigger}
        </div>

        <div
          ref={this.contentRef}
          className={cx({
            popper__popup: true,
            'popper__popup--visible': isVisible
          })}
        >
          {children}
        </div>
      </div>
    );
  }
}

PopperContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeOnEscPress: PropTypes.bool,
  trigger: PropTypes.node.isRequired,
  flipBehavior: PropTypes.string,
  isVisible: PropTypes.bool,
  preventOverflow: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func
};

export default PopperContainer;
