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

  inAppHeaderRef = React.createRef();
  inAppBodyRef = React.createRef();

  render() {
    const {
      className,
      children,
      headerAvatar,
      headerFrom,
      footer,
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
          <div>
            <InAppHeader
              avatar={headerAvatar}
              from={headerFrom}
              onCloseButtonClick={this.onCloseButtonClick}
              ref={this.inAppHeaderRef}
            />
            <div
              className={cx({
                [mergedClassNames]: true,
                [`${baseClass}__with_footer`]: footer
              })}
              ref={this.inAppBodyRef}
              {...restProps}
            >
              <div className={cx(`${baseClass}__content-container`)}>
                {children}
              </div>
              {footer && <InAppFooter>{footer}</InAppFooter>}
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
  closeOnEscPress: PropTypes.bool,
  footer: PropTypes.node
};

export default InAppBase;
