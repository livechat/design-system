import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import { KeyNames } from '../../constants/keyCodes';
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
      this.inAppContainerRef.current &&
      !this.inAppContainerRef.current.contains(event.target)
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
    if (event.key === KeyNames.esc) {
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

  inAppContainerRef = React.createRef();

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
        <div
          className={cx(`${baseClass}__container`)}
          ref={this.inAppContainerRef}
        >
          <div>
            <InAppHeader
              avatarSrc={
                header &&
                Object.prototype.hasOwnProperty.call(header, 'avatarSrc')
                  ? header.avatarSrc
                  : ''
              }
              avatarAlt={
                header &&
                Object.prototype.hasOwnProperty.call(header, 'avatarAlt')
                  ? header.avatarAlt
                  : ''
              }
              text={
                header && Object.prototype.hasOwnProperty.call(header, 'text')
                  ? header.text
                  : null
              }
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
    avatarSrc: InAppHeader.propTypes.avatarSrc,
    avatarAlt: InAppHeader.propTypes.avatarAlt,
    text: InAppHeader.propTypes.text
  }),
  onClose: InAppHeader.propTypes.onCloseButtonClick,
  closeOnEscPress: PropTypes.bool,
  footerButtons: InAppFooter.propTypes.buttons
};

export default InAppBase;
