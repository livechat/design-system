import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import { KeyNames, KeyCodes } from '../../constants/keyCodes';
import InAppMessageHeader from './InAppMessageHeader';
import InAppMessageFooter from './InAppMessageFooter';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'inapp-base';

const cx = classNames.bind(styles);

class InAppMessageBase extends React.PureComponent {
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
      this.handleCloseInAppMessage();
    }
  };

  onCloseButtonClick = event => {
    event.preventDefault();
    event.stopPropagation();
    this.handleCloseInAppMessage();
  };

  onKeyUp = event => {
    if (
      (event.key && event.key === KeyNames.esc) ||
      (event.keyCode && event.keyCode === KeyCodes.esc)
    ) {
      this.handleCloseInAppMessage();
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

  handleCloseInAppMessage = () => {
    this.props.onClose();
  };

  inAppMessageContentRef = React.createRef();

  render() {
    const {
      className,
      children,
      header,
      footerButtons,
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
        onMouseDown={this.onOverlayClick}
      >
        <div className={cx(`${baseClass}__container`)}>
          <div
            ref={this.inAppMessageContentRef}
            className={cx(`${baseClass}__wrapper`)}
          >
            <InAppMessageHeader
              avatar={header && header.avatar ? header.avatar : undefined}
              text={header && header.text ? header.text : undefined}
              onCloseButtonClick={this.onCloseButtonClick}
            />
            <div
              className={cx({
                [mergedClassNames]: true,
                [`${baseClass}__with_footer`]: footerButtons
              })}
              {...restProps}
            >
              <div className={cx(`${baseClass}__content-container`)}>
                {children}
              </div>
              {footerButtons && <InAppMessageFooter buttons={footerButtons} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InAppMessageBase.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  header: PropTypes.shape({
    avatar: InAppMessageHeader.propTypes.avatar,
    text: InAppMessageHeader.propTypes.text
  }),
  onClose: InAppMessageHeader.propTypes.onCloseButtonClick,
  closeOnEscPress: PropTypes.bool,
  footerButtons: InAppMessageFooter.propTypes.buttons
};

export default InAppMessageBase;
