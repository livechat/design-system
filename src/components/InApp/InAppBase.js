import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import { KeyNames, KeyCodes } from '../../constants/keyCodes';
import InAppHeader from './InAppHeader';
import InAppFooter from './InAppFooter';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'inapp-base';

const cx = classNames.bind(styles);

class InAppBase extends React.PureComponent {
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
      this.inAppContentRef.current &&
      !this.inAppContentRef.current.contains(event.target)
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
    if (
      (event.key && event.key === KeyNames.esc) ||
      (event.keyCode && event.keyCode === KeyCodes.esc)
    ) {
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

  inAppContentRef = React.createRef();

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
      >
        <div className={cx(`${baseClass}__container`)}>
          <div
            ref={this.inAppContentRef}
            className={cx(`${baseClass}__wrapper`)}
          >
            <InAppHeader
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
              {footerButtons && <InAppFooter buttons={footerButtons} />}
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
  header: PropTypes.shape({
    avatar: InAppHeader.propTypes.avatar,
    text: InAppHeader.propTypes.text
  }),
  onClose: InAppHeader.propTypes.onCloseButtonClick,
  closeOnEscPress: PropTypes.bool,
  footerButtons: InAppFooter.propTypes.buttons
};

export default InAppBase;
