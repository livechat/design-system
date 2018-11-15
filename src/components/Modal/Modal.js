import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import { KeyCodes } from '../../constants/keyCodes';
import ModalMask from './ModalMask';
import ModalCloseButton from './ModalCloseButton';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'modal';

const cx = classNames.bind(styles);

class Modal extends React.Component {
  static defaultProps = {
    closeOnEscPress: true
  };

  componentDidMount() {
    this.addEventListeners();
  }

  componentWillUnmount() {
    this.removeEventListeners();
  }

  onDocumentClick = event => {
    if (this.modalRef && !this.modalRef.current.contains(event.target)) {
      this.handleCloseModal();
    }
  };

  onCloseButtonClick = event => {
    event.preventDefault();
    this.handleCloseModal();
  };

  onKeyUp = event => {
    if (event.keyCode === KeyCodes.enter) {
      this.handleCloseModal();
    }
  };

  addEventListeners = () => {
    if (this.props.closeOnEscPress) {
      document.addEventListener('keyup', this.onKeyUp, true);
    }
    document.addEventListener('click', this.onDocumentClick);
  };

  removeEventListeners = () => {
    document.removeEventListener('keyup', this.onKeyUp, true);
    document.removeEventListener('click', this.onDocumentClick);
  };

  handleCloseModal = () => {
    this.props.onClose();
  };

  modalRef = React.createRef();

  render() {
    const {
      className,
      children,
      title,
      onClose,
      closeOnEscPress,
      ...restProps
    } = this.props;

    const mergedClassNames = getMergedClassNames(
      styles[`${baseClass}`],
      className
    );

    return (
      <ModalMask
        className={cx(`${baseClass}__mask`, `${baseClass}__mask--visible`)}
      >
        <div className={mergedClassNames} {...restProps} ref={this.modalRef}>
          <ModalCloseButton onClick={this.onCloseButtonClick} />
          {children}
        </div>
      </ModalMask>
    );
  }
}

Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  closeOnEscPress: PropTypes.bool
};

export default Modal;
