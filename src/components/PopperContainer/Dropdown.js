import * as React from 'react';
import * as PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import cssClassNames from 'classnames/bind';
import { Manager, Reference, Popper } from 'react-popper';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import { KeyCodes } from '../../constants/keyCodes';

const cx = cssClassNames.bind(styles);

class Dropdown extends React.PureComponent {
  static defaultProps = {
    modifiers: {}
  };

  static buildPopperModifiers(modifiers) {
    const {
      offset,
      flip,
      hide,
      preventOverflow,
      arrow,
      ...restModifiers
    } = modifiers;
    return {
      offset: {
        offset: 1,
        ...(offset || {})
      },
      flip: {
        enabled: true,
        behavior: 'flip',
        ...(flip || {})
      },
      arrow: {
        enabled: false,
        ...(arrow || {})
      },
      hide: {
        enabled: false,
        ...(hide || {})
      },
      preventOverflow: {
        enabled: true,
        ...(preventOverflow || {})
      },
      ...restModifiers
    };
  }

  componentDidMount() {
    if (this.props.isVisible) {
      this.addEventHandlers();
    }
  }

  componentDidUpdate(prevProps) {
    const isShown = !prevProps.isVisible && this.props.isVisible;
    const isHidden = prevProps.isVisible && !this.props.isVisible;

    if (isShown) {
      this.addEventHandlers();
    }

    if (isHidden) {
      this.removeEventHandlers();
    }
  }

  componentWillUnmount() {
    this.removeEventHandlers();
  }

  getModifiers = memoizeOne(this.buildPopperModifiers);

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

  render() {
    const {
      children,
      className,
      trigger,
      isVisible,
      triggerContainerProps
    } = this.props;

    const mergedClassNames = getMergedClassNames(
      cx({
        popper__popup: true,
        'popper__popup--visible': isVisible
      }),
      className
    );

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <div {...triggerContainerProps} ref={ref}>
              {trigger}
            </div>
          )}
        </Reference>
        <Popper
          placement={this.props.placement}
          modifiers={this.getModifiers(this.props.modifiers)}
          eventsEnabled={this.props.popperEventsEnabled}
          positionFixed={this.props.positionFixed}
        >
          {({ ref, style, placement, arrowProps }) => (
            <div
              ref={ref}
              style={style}
              data-placement={placement}
              className={mergedClassNames}
            >
              {children}
              {arrowProps.enabled && (
                <div ref={arrowProps.ref} style={arrowProps.style} />
              )}
            </div>
          )}
        </Popper>
      </Manager>
    );
  }
}

Dropdown.propTypes = {
  children: PropTypes.node,
  triggerRenderer: PropTypes.func,
  className: PropTypes.string,
  closeOnEscPress: PropTypes.bool,
  trigger: PropTypes.node.isRequired,
  flipBehavior: PropTypes.string,
  isVisible: PropTypes.bool,
  triggerContainerProps: PropTypes.object,
  popperEventsEnabled: PropTypes.bool,
  positionFixed: PropTypes.bool,
  preventOverflow: PropTypes.bool,
  modifiers: PropTypes.object,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placement: PropTypes.oneOf(['auto', 'top', 'right', 'bottom', 'left'])
};

export default Dropdown;
