import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import { KeyCodes } from '../../constants/keyCodes';
import ModalCloseButton from './ModalCloseButton';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'modal-base';

const cx = classNames.bind(styles);

class ModalBase extends React.Component {
  static defaultProps = {
    closeOnEscPress: true
  };

  componentDidMount() {
    this.addEventListeners();
  }

  componentWillUnmount() {
    this.removeEventListeners();
  }

  onOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.handleCloseModal();
    }
  };

  onCloseButtonClick = event => {
    event.preventDefault();
    event.stopPropagation();
    this.handleCloseModal();
  };

  onKeyUp = event => {
    if (event.keyCode === KeyCodes.esc) {
      this.handleCloseModal();
    }
  };

  addEventListeners = () => {
    if (this.props.closeOnEscPress) {
      document.addEventListener('keyup', this.onKeyUp, true);
    }
  };

  removeEventListeners = () => {
    document.removeEventListener('keyup', this.onKeyUp, true);
  };

  handleCloseModal = () => {
    this.props.onClose();
  };

  modalRef = React.createRef();

  render() {
    const {
      className,
      children,
      onClose,
      closeOnEscPress,
      ...restProps
    } = this.props;

    const mergedClassNames = getMergedClassNames(
      styles[`${baseClass}`],
      className
    );

    return (
      <div
        onMouseDown={this.onOverlayClick}
        className={cx(
          `${baseClass}__overlay`,
          `${baseClass}__overlay--visible`
        )}
      >
        <div className={mergedClassNames} {...restProps} ref={this.modalRef}>
          <ModalCloseButton onClick={this.onCloseButtonClick} />
          {children}
        </div>
      </div>
    );
  }
}

ModalBase.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  closeOnEscPress: PropTypes.bool
};

export default ModalBase;
