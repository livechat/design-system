import * as React from 'react';
import * as PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import { Manager, Reference, Popper } from 'react-popper';
import cx from 'classnames';
import { KeyCodes } from '../../constants/keyCodes';
import styles from './style.scss';

const baseClass = 'popper-tooltip';

class PopperTooltip extends React.PureComponent {
  static defaultProps = {
    modifiers: {},
    style: {},
    zIndex: 30,
    closeOnEscPress: true,
    closeOnEnterPress: false,
    triggerActionType: 'custom'
  };

  static buildPopperModifiers(modifiers) {
    const { offset, flip, hide, preventOverflow, arrow, ...rest } = modifiers;
    return {
      offset: {
        offset: (arrow || {}).enabled ? '0, 12' : '0, 4',
        ...(offset || {})
      },
      flip: { enabled: true, behavior: 'flip', ...(flip || {}) },
      arrow: { enabled: true, ...(arrow || {}) },
      hide: { enabled: false, ...(hide || {}) },
      preventOverflow: { enabled: true, ...(preventOverflow || {}) },
      ...rest
    };
  }

  static buildTooltipStyle(popperCalculatedStyle, propsStyle, zIndex) {
    return {
      ...popperCalculatedStyle,
      ...propsStyle,
      zIndex
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

  getModifiers = memoizeOne(PopperTooltip.buildPopperModifiers);

  getTooltipStyle = memoizeOne(PopperTooltip.buildTooltipStyle);

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

  renderTriggerElement = ({ ref }) => {
    const { trigger } = this.props;

    if (typeof trigger === 'function') {
      return trigger({ ref });
    }

    return React.cloneElement(trigger, { ref });
  };

  renderPopperContent = ({
    ref,
    style: popperCalculatedStyle,
    placement,
    arrowProps
  }) => {
    const {
      children,
      className,
      zIndex,
      closeOnEscPress,
      closeOnEnterPress,
      eventsEnabled,
      modifiers,
      style: propsStyle,
      positionFixed,
      isVisible,
      referenceElement,
      trigger,
      triggerActionType,
      onClose,
      ...restProps
    } = this.props;

    const computedModifiers = this.getModifiers(this.props.modifiers);
    const style = this.getTooltipStyle(
      popperCalculatedStyle,
      propsStyle,
      zIndex
    );

    return (
      <div
        tabIndex={0}
        {...restProps}
        ref={ref}
        style={style}
        data-placement={placement}
        className={cx({
          [styles[baseClass]]: true,
          [className]: className
        })}
      >
        {children}
        {computedModifiers.arrow.enabled && (
          <div
            {...arrowProps}
            className={cx({
              [styles[`${baseClass}__arrow`]]: true,
              [arrowProps.className]: arrowProps.className
            })}
            data-placement={placement}
          />
        )}
      </div>
    );
  };

  render() {
    const modifiers = this.getModifiers(this.props.modifiers);

    return (
      <Manager>
        <Reference innerRef={this.setTriggerRef}>
          {this.renderTriggerElement}
        </Reference>
        {this.props.isVisible && (
          <Popper
            innerRef={this.setPopupRef}
            placement={this.props.placement || 'bottom-start'}
            modifiers={modifiers}
            eventsEnabled={this.props.eventsEnabled}
            positionFixed={this.props.positionFixed}
            referenceElement={this.props.referenceElement}
          >
            {this.renderPopperContent}
          </Popper>
        )}
      </Manager>
    );
  }
}

PopperTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeOnEscPress: PropTypes.bool,
  closeOnEnterPress: PropTypes.bool,
  eventsEnabled: PropTypes.bool,
  isVisible: PropTypes.bool,
  style: PropTypes.object,
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
  trigger: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  triggerActionType: PropTypes.oneOf(['custom', 'click', 'hover']),
  zIndex: PropTypes.number,
  onClose: PropTypes.func
};

export default PopperTooltip;
