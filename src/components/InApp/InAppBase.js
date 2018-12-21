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
    closeOnEscPress: true,
    headerAvatar: null,
    headerFrom: null
  };

  componentDidMount() {
    this.addEventListeners();
  }

  componentWillUnmount() {
    this.removeEventListeners();
  }

  onDocumentClick = event => {
    if (
      this.inAppHeaderRef.current &&
      this.inAppBodyRef.current &&
      !this.inAppHeaderRef.current.contains(event.target) &&
      !this.inAppBodyRef.current.contains(event.target)
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

  inAppHeaderRef = React.createRef();
  inAppBodyRef = React.createRef();

  render() {
    const {
      className,
      children,
      headerAvatar,
      headerFrom,
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
        <div className={cx('inapp-container')}>
          <div>
            <InAppHeader
              avatar={headerAvatar}
              from={headerFrom}
              onCloseButtonClick={this.onCloseButtonClick}
              ref={this.inAppHeaderRef}
            />
            <div
              className={mergedClassNames}
              ref={this.inAppBodyRef}
              {...restProps}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InAppBase.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  headerAvatar: PropTypes.string,
  headerFrom: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  closeOnEscPress: PropTypes.bool
};

export default InAppBase;
