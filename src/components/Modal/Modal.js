import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import styles from './style.scss';
import { KeyCodes } from '../../constants/keyCodes';
import ModalMask from './ModalMask';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'modal';

const cx = classNames.bind(styles);

export class Modal extends React.Component {
  static defaultProps = {
    closeOnEscClick: true,
    isOpen: true
  };

  componentDidMount() {
    if (this.props.isOpen) {
      this.addEventListeners();
    }
  }

  componentDidUpdate(prevProps) {
    const isVisible = !prevProps.isOpen && this.props.isOpen;
    const isHidden = prevProps.isOpen && !this.props.isOpen;

    if (isVisible) {
      this.addEventListeners();
    }
    if (isHidden) {
      this.removeEventListeners();
    }
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
    if (event.keyCode === KeyCodes.enter && this.props.closeOnEscClick) {
      this.handleCloseModal();
    }
  };

  addEventListeners = () => {
    document.addEventListener('keyup', this.onKeyUp, true);
    document.addEventListener('click', this.onDocumentClick);
  };

  removeEventListeners = () => {
    document.removeEventListener('keyup', this.onKeyUp, true);
    document.removeEventListener('click', this.onDocumentClick);
  };

  handleCloseModal = () => {
    this.props.closeModal();
  };

  modalRef = React.createRef();

  render() {
    const {
      className,
      children,
      title,
      closeModal,
      closeOnEscClick,
      isOpen,
      allowOverflow,
      ...restProps
    } = this.props;

    const mergedClassNames = getMergedClassNames(
      styles[`${baseClass}`],
      className
    );

    return (
      <ModalMask
        className={cx({
          [`${baseClass}__mask`]: true,
          [`${baseClass}__mask--visible`]: isOpen
        })}
      >
        <div className={mergedClassNames} {...restProps} ref={this.modalRef}>
          {!!title && (
            <div className={styles[`${baseClass}__header`]}>{title}</div>
          )}
          <button
            title="Close modal"
            className={styles[`${baseClass}__close`]}
            onClick={this.onCloseButtonClick}
          >
            <CloseIcon width="14px" height="14px" fill="#000" />
          </button>
          <div className={styles[`${baseClass}__body`]}>{children}</div>
        </div>
      </ModalMask>
    );
  }
}

Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  closeOnEscClick: PropTypes.bool,
  isOpen: PropTypes.bool,
  allowOverflow: PropTypes.bool
};
