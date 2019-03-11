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
    modifiers: {},
    zIndex: 20,
    closeOnEscPress: true,
    closeOnEnterPress: false
  };

  static buildPopperModifiers(modifiers) {
    const { offset, flip, hide, preventOverflow, arrow, ...rest } = modifiers;
    return {
      offset: { offset: '0px, 4px', ...(offset || {}) },
      flip: { enabled: true, behavior: 'flip', ...(flip || {}) },
      arrow: { enabled: false, ...(arrow || {}) },
      hide: { enabled: false, ...(hide || {}) },
      preventOverflow: { enabled: true, ...(preventOverflow || {}) },
      ...rest
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
      if (this.popupRef) {
        this.popupRef.focus({ preventScroll: true });
      }
    }

    if (isHidden) {
      this.removeEventHandlers();
    }
  }

  componentWillUnmount() {
    this.removeEventHandlers();
  }

  getModifiers = memoizeOne(Dropdown.buildPopperModifiers);

  setPopupRef = ref => {
    this.popupRef = ref;
  };

  setTriggerRef = ref => {
    this.triggerRef = ref;
  };

  handleDocumentClick = event => {
    if (
      this.props.onClose &&
      this.popupRef &&
      !this.popupRef.contains(event.target)
    ) {
      this.props.onClose();
    }
  };

  handleKeyDown = event => {
    if (this.props.onClose) {
      const isEscKeyPressed = event.keyCode === KeyCodes.esc;
      const isEnterKeyPressed = event.keyCode === KeyCodes.enter;

      if (
        (this.props.closeOnEscPress && isEscKeyPressed) ||
        (this.props.closeOnEnterPress && isEnterKeyPressed)
      ) {
        this.props.onClose();
        if (this.triggerRef) {
          this.triggerRef.focus();
        }
      }
    }
  };

  addEventHandlers = () => {
    document.addEventListener('keydown', this.handleKeyDown, true);
    document.addEventListener('click', this.handleDocumentClick);
  };

  removeEventHandlers = () => {
    document.removeEventListener('keydown', this.handleKeyDown, true);
    document.removeEventListener('click', this.handleDocumentClick);
  };

  render() {
    const { children, className, triggerRenderer, isVisible } = this.props;

    const mergedClassNames = getMergedClassNames(
      cx({
        dropdown: true,
        'dropdown--visible': isVisible
      }),
      className
    );

    return (
      <Manager>
        <Reference innerRef={this.setTriggerRef}>{triggerRenderer}</Reference>
        {this.props.isVisible && (
          <Popper
            innerRef={this.setPopupRef}
            placement={this.props.placement || 'bottom-start'}
            modifiers={this.getModifiers(this.props.modifiers)}
            eventsEnabled={this.props.eventsEnabled}
            positionFixed={this.props.positionFixed}
            referenceElement={this.props.referenceElement}
          >
            {({ ref, style, placement, arrowProps }) => (
              <div
                ref={ref}
                tabIndex={0}
                style={{ ...style, zIndex: this.props.zIndex }}
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
        )}
      </Manager>
    );
  }
}

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeOnEscPress: PropTypes.bool,
  closeOnEnterPress: PropTypes.bool,
  eventsEnabled: PropTypes.bool,
  isVisible: PropTypes.bool.isRequired,
  modifiers: PropTypes.object,
  placement: PropTypes.oneOf([
    'auto',
    'auto-end',
    'auto-start',
    'bottom',
    'bottom-end',
    'bottom-start',
    'left',
    'left-end',
    'left-start',
    'right',
    'right-end',
    'right-start',
    'top',
    'top-end',
    'top-start'
  ]),
  positionFixed: PropTypes.bool,
  referenceElement: PropTypes.instanceOf(Element),
  triggerRenderer: PropTypes.func.isRequired,
  zIndex: PropTypes.number,
  onClose: PropTypes.func
};

export default Dropdown;
