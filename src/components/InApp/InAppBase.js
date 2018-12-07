import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import { KeyCodes, KeyNames } from '../../constants/keyCodes';
import InAppHeader from './InAppHeader';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'inapp-base';

const cx = classNames.bind(styles);

class InAppBase extends React.Component {
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
    if (
      this.inAppRef.current &&
      !this.inAppRef.current.contains(event.target)
    ) {
      this.handleCloseInApp();
    }
  };

  onCloseButtonClick = event => {
    event.preventDefault();
    event.stopPropagation();
    this.handleCloseInApp();
  };

  onKeyUp = event => {
    if (event.key === KeyNames.esc || event.keyCode === KeyCodes.esc) {
      this.handleCloseInApp();
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

  handleCloseInApp = () => {
    this.props.onClose();
  };

  inAppRef = React.createRef();

  render() {
    const {
      className,
      children,
      headerAvatar,
      headerWho,
      headerText,
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
      <div
        className={cx(
          `${baseClass}__overlay`,
          `${baseClass}__overlay--visible`
        )}
      >
        <div className={`${baseClass}__container`} ref={this.inAppRef}>
          <InAppHeader
            avatar={headerAvatar}
            who={headerWho}
            text={headerText}
            onCloseButtonClick={this.onCloseButtonClick}
          />
          <div className={mergedClassNames} {...restProps}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

InAppBase.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  headerWho: PropTypes.string,
  headerText: PropTypes.string,
  headerAvatar: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  closeOnEscPress: PropTypes.bool
};

export default InAppBase;
