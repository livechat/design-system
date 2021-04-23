import * as React from 'react';
import * as PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import cssClassNames from 'classnames/bind';
import { Manager, Reference, Popper } from 'react-popper';
import ResizeObserver from 'resize-observer-polyfill';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import { KeyCodes } from '../../constants/keyCodes';

const cx = cssClassNames.bind(styles);

class Dropdown extends React.PureComponent {
  static buildPopperModifiers(modifiers) {
    const { offset, flip, hide, preventOverflow, arrow, ...rest } = modifiers;
    return {
      offset: {
        offset: (arrow || {}).enabled ? '0, 12' : '0, 4',
        ...(offset || {})
      },
      flip: { enabled: true, behavior: 'flip', ...(flip || {}) },
      arrow: { enabled: false, ...(arrow || {}) },
      hide: { enabled: true, ...(hide || {}) },
      preventOverflow: {
        enabled: true,
        escapeWithReference: true,
        boundariesElement: 'viewport',
        ...(preventOverflow || {})
      },
      ...rest
    };
  }

  componentDidMount() {
    if (this.props.isVisible) {
      this.addEventHandlers();
      this.attachResizeObserver();
    }
  }

  componentDidUpdate(prevProps) {
    const isShown = !prevProps.isVisible && this.props.isVisible;
    const isHidden = prevProps.isVisible && !this.props.isVisible;

    if (isShown) {
      this.addEventHandlers();
      this.attachResizeObserver();
      if (this.popupRef) {
        this.popupRef.focus({ preventScroll: true });
      }
    }

    if (isHidden) {
      this.removeEventHandlers();
      this.detachResizeObserver();
    }
  }

  componentWillUnmount() {
    this.removeEventHandlers();
    this.detachResizeObserver();
  }

  getModifiers = memoizeOne(Dropdown.buildPopperModifiers);

  setPopupRef = ref => {
    this.popupRef = ref;
  };

  setTriggerRef = ref => {
    this.triggerRef = ref;
  };

  setTriggerRef = ref => {
    this.triggerRef = ref;
  };

  handleDocumentClick = event => {
    if (
      this.props.isVisible &&
      this.props.onClose &&
      this.popupRef &&
      this.triggerRef &&
      !this.popupRef.contains(event.target) &&
      !this.triggerRef.contains(event.target)
    ) {
      this.props.onClose();
    }
  };

  handleKeyDown = event => {
    const { keyCode } = event;
    const {
      closeKeyCodes,
      closeOnEnterPress,
      closeOnEscPress,
      onClose
    } = this.props;

    if (onClose) {
      const isEscKeyPressed = keyCode === KeyCodes.esc;
      const isEnterKeyPressed = keyCode === KeyCodes.enter;
      const isCustomCloseKeyPressed =
        closeKeyCodes && closeKeyCodes.includes(keyCode);

      if (
        (closeOnEscPress && isEscKeyPressed) ||
        (closeOnEnterPress && isEnterKeyPressed) ||
        isCustomCloseKeyPressed
      ) {
        onClose();
        if (this.triggerRef) {
          this.triggerRef.focus();
        }
      }
    }
  };

  attachResizeObserver = () => {
    // to boost component performance resize observer should be optional
    if (this.props.shouldUpdateOnResize && this.popupRef) {
      this.observer = new ResizeObserver(() => {
        if (this.popperScheduleUpdate) {
          this.popperScheduleUpdate();
        }
      });
      this.observer.observe(this.popupRef);
    }
  };

  detachResizeObserver = () => {
    if (this.observer) {
      this.observer.disconnect();
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

  renderDropdownContent = ({
    ref,
    style,
    placement,
    arrowProps,
    scheduleUpdate
  }) => {
    const { className, isVisible, zIndex, children, modifiers } = this.props;
    const mergedClassNames = getMergedClassNames(
      cx({
        dropdown: true,
        'dropdown--visible': isVisible
      }),
      className
    );

    const computedModifiers = this.getModifiers(modifiers);

    // updating `popperScheduleUpdate` reference used in resize observer
    this.popperScheduleUpdate = scheduleUpdate;

    return (
      <div
        ref={ref}
        tabIndex={0}
        style={{ ...style, zIndex }}
        data-placement={placement}
        className={mergedClassNames}
      >
        {children}
        {computedModifiers.arrow.enabled && (
          <div
            ref={arrowProps.ref}
            className={styles.dropdown__arrow}
            data-placement={placement}
            style={arrowProps.style}
          />
        )}
      </div>
    );
  };

  render() {
    const {
      placement,
      triggerRenderer,
      eventsEnabled,
      positionFixed,
      referenceElement,
      isVisible
    } = this.props;

    const computedModifiers = this.getModifiers(this.props.modifiers);

    return (
      <Manager>
        {triggerRenderer && (
          <Reference innerRef={this.setTriggerRef}>{triggerRenderer}</Reference>
        )}
        {isVisible && (
          <Popper
            innerRef={this.setPopupRef}
            placement={placement}
            modifiers={computedModifiers}
            eventsEnabled={eventsEnabled}
            positionFixed={positionFixed}
            referenceElement={referenceElement}
          >
            {this.renderDropdownContent}
          </Popper>
        )}
      </Manager>
    );
  }
}

Dropdown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  closeOnEscPress: PropTypes.bool,
  closeOnEnterPress: PropTypes.bool,
  /**
   * you can specify which key press should trigger Dropdown close
   */
  closeKeyCodes: PropTypes.arrayOf(PropTypes.number),
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
  referenceElement: PropTypes.shape({
    clientWidth: PropTypes.number.isRequired,
    clientHeight: PropTypes.number.isRequired
  }),
  /**
   * Pass `true` when it's possible that content of your dropdown will resize
   * (e.g removing list items on select)
   */
  shouldUpdateOnResize: PropTypes.bool,
  triggerRenderer: PropTypes.func,
  zIndex: PropTypes.number,
  onClose: PropTypes.func
};

Dropdown.defaultProps = {
  modifiers: {},
  zIndex: 20,
  closeOnEscPress: true,
  closeOnEnterPress: false,
  placement: 'bottom-start',
  shouldUpdateOnResize: false
};

export default Dropdown;
