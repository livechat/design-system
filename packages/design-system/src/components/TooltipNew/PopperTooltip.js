import * as React from 'react';
import * as PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import { CSSTransition } from 'react-transition-group';
import { Manager, Reference, Popper } from 'react-popper';
import cx from 'classnames';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import styles from './style.scss';
import { buildPopperModifiers, buildPopperTooltipStyle } from './helpers';

const baseClass = 'popper-tooltip';

const noop = () => {};

class PopperTooltip extends React.PureComponent {
  state = {
    isVisible: false
  };

  componentDidMount() {
    if (this.props.closeOnOutsideClick && this.getIsVisible()) {
      document.addEventListener('click', this.handleDocumentClick);
    }
    if (this.props.closeWithEsc && this.getIsVisible()) {
      document.addEventListener('keydown', this.handleDocumentKeyDown);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevIsVisible = this.getIsVisible(prevProps, prevState);
    const isVisible = this.getIsVisible();

    const didShow = !prevIsVisible && isVisible;
    const didHide = prevIsVisible && !isVisible;

    if (this.props.closeOnOutsideClick && didShow) {
      document.addEventListener('click', this.handleDocumentClick);
    }

    if (this.props.closeWithEsc && this.getIsVisible()) {
      document.addEventListener('keydown', this.handleDocumentKeyDown);
    }

    if (didHide) {
      document.removeEventListener('click', this.handleDocumentClick);
      document.removeEventListener('keydown', this.handleDocumentKeyDown);
    }

    if (this.props.triggerActionType === 'hover') {
      this.manageTooltipListeners(didShow, didHide);
    }
  }

  componentWillUnmount() {
    const tooltipRef = this.getTooltipRef();
    if (tooltipRef) {
      tooltipRef.removeEventListener(
        'mouseenter',
        this.handleTooltipMouseEnter
      );
      tooltipRef.removeEventListener(
        'mouseleave',
        this.handleTooltipMouseLeave
      );
    }
    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
  }

  getModifiers = memoizeOne(buildPopperModifiers);

  getTooltipStyle = memoizeOne(buildPopperTooltipStyle);

  getIsVisible = (props = this.props, state = this.state) =>
    this.isIsVisibleControlled() ? props.isVisible : state.isVisible;

  setTooltipRef = ref => {
    this.tooltipRef = ref;
  };

  setTriggerRef = ref => {
    this.triggerRef = ref;
  };

  getTriggerRef = () => this.props.triggerRef || this.triggerRef;

  getTooltipRef = () => this.props.tooltipRef || this.tooltipRef;

  isIsVisibleControlled = () => this.props.triggerActionType === 'managed';

  handleTriggerMouseEnter = () => {
    this.isTriggerHovered = true;
    this.clearTooltipHideTimeout();
    this.setState(prevState => {
      const shouldTriggerOpenCallback =
        !this.isIsVisibleControlled() &&
        !prevState.isVisible &&
        this.props.onOpen;

      if (shouldTriggerOpenCallback) {
        this.props.onOpen();
      }

      return {
        isVisible: true
      };
    });
  };

  handleTriggerMouseLeave = () => {
    this.isTriggerHovered = false;
    this.handleDelayedTooltipHide();
  };

  handleTooltipMouseEnter = () => {
    this.clearTooltipHideTimeout();
    const tooltipRef = this.getTooltipRef();
    if (tooltipRef) {
      tooltipRef.addEventListener('mouseleave', this.handleTooltipMouseLeave);
    }

    this.setState({
      isVisible: true
    });
  };

  handleTooltipMouseLeave = () => {
    /**
     * We need to check `isTriggerHovered` condition to cover the following scenario.
     * Using custom offset can cause tooltip and trigger overlaping,
     * Then mouse events can be triggered in specific order:
     * - trigger mouse enter (mouse moves to trigger, tooltip shows),
     * - tooltip mouse leave (mouse still moves over trigger, but leaves tooltip),
     * - no second trigger mouse enter event (mouse still over trigger, so it was not entering trigger boudaries)
     * This will close tooltip component despite the fact that mouse cursor is over trigger.
     */
    if (!this.isTriggerHovered) {
      this.clearTooltipHideTimeout();
      this.handleDelayedTooltipHide();
    }
  };

  handleTriggerClick = () => {
    this.setState(prevState => {
      const isVisible = !prevState.isVisible;

      const shouldTriggerOpenCallback =
        !this.isIsVisibleControlled() && isVisible && this.props.onOpen;

      if (shouldTriggerOpenCallback) {
        this.props.onOpen();
      }

      return {
        isVisible
      };
    });
  };

  handleDelayedTooltipHide = () => {
    this.hideTimerId = setTimeout(() => {
      this.setState({
        isVisible: false
      });
    }, this.props.hoverOutDelayTimeout);
  };

  clearTooltipHideTimeout = () => {
    if (this.hideTimerId) {
      clearTimeout(this.hideTimerId);
    }
  };

  manageTooltipListeners = (didShow, didHide) => {
    const tooltipRef = this.getTooltipRef();
    if (!tooltipRef) {
      return;
    }

    if (didShow) {
      tooltipRef.addEventListener('mouseenter', this.handleTooltipMouseEnter);
    }

    if (didHide) {
      tooltipRef.removeEventListener(
        'mouseenter',
        this.handleTooltipMouseEnter
      );
      tooltipRef.removeEventListener(
        'mouseleave',
        this.handleTooltipMouseLeave
      );
    }
  };

  handleDocumentClick = event => {
    const triggerRef = this.getTriggerRef();
    const tooltipRef = this.getTooltipRef();

    if (
      triggerRef &&
      !triggerRef.contains(event.target) &&
      tooltipRef &&
      !tooltipRef.contains(event.target)
    ) {
      this.handleClose();
    }
  };

  handleDocumentKeyDown = event => {
    if (event.key === 'Escape') {
      this.handleClose();
    }
  };

  handleClose = () => {
    if (this.isIsVisibleControlled()) {
      this.props.onClose();
    } else {
      this.setState({
        isVisible: false
      });
    }
  };

  renderTriggerElement = ({ ref }) => {
    const { trigger, triggerActionType } = this.props;

    const triggerProps = { ref };

    if (triggerActionType === 'click') {
      triggerProps.onClick = this.handleTriggerClick;
    }

    if (triggerActionType === 'hover') {
      triggerProps.onMouseEnter = this.handleTriggerMouseEnter;
      triggerProps.onMouseLeave = this.handleTriggerMouseLeave;
    }

    if (typeof trigger === 'function') {
      return trigger(triggerProps);
    }

    return React.cloneElement(trigger, triggerProps);
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
      closeOnOutsideClick,
      closeWithX,
      closeWithEsc,
      hoverOutDelayTimeout,
      zIndex,
      eventsEnabled,
      modifiers,
      style: propsStyle,
      theme,
      positionFixed,
      isVisible,
      referenceElement,
      trigger,
      triggerActionType,
      withFadeAnimation,
      transitionDuration,
      transitionDelay,
      onOpen,
      ...restProps
    } = this.props;

    const computedModifiers = this.getModifiers(this.props.modifiers);
    const style = this.getTooltipStyle(
      popperCalculatedStyle,
      propsStyle,
      zIndex,
      transitionDuration,
      transitionDelay
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
          [styles[`${baseClass}--${theme}`]]: theme,
          [className]: className
        })}
      >
        {closeWithX && (
          <button
            type="button"
            onClick={this.handleClose}
            className={styles[`${baseClass}__close`]}
          >
            <CloseIcon width="16px" height="16px" />
          </button>
        )}
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

  renderPopper = () => {
    const modifiers = this.getModifiers(this.props.modifiers);
    const isVisible = this.getIsVisible();

    const popperComponent = (
      <Popper
        placement={this.props.placement}
        modifiers={modifiers}
        innerRef={this.props.tooltipRef || this.setTooltipRef}
        eventsEnabled={this.props.eventsEnabled}
        positionFixed={this.props.positionFixed}
        referenceElement={this.props.referenceElement}
      >
        {this.renderPopperContent}
      </Popper>
    );

    if (this.props.withFadeAnimation) {
      return (
        <CSSTransition
          timeout={this.props.transitionDuration}
          mountOnEnter
          unmountOnExit
          in={isVisible}
          classNames={styles[baseClass]}
        >
          {popperComponent}
        </CSSTransition>
      );
    }

    return isVisible && popperComponent;
  };

  renderPopperManager = () => (
    <Manager>
      {this.props.trigger && (
        <Reference innerRef={this.props.triggerRef || this.setTriggerRef}>
          {this.renderTriggerElement}
        </Reference>
      )}
      {this.renderPopper()}
    </Manager>
  );

  render() {
    return this.renderPopperManager();
  }
}

PopperTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  /**
   * Use `closeOnOutsideClick=true` when you want tooltip to be closed on click outside it.
   * If you are using `triggerActionType='managed'` event handler will call provided onClose prop.
   */
  closeOnOutsideClick: PropTypes.bool,
  /**
   * Set to `true` to add an X button that will close the tooltip.
   */
  closeWithX: PropTypes.bool,
  /**
   * Set to `true` to close tooltip when ESC key is pressed.
   */
  closeWithEsc: PropTypes.bool,
  eventsEnabled: PropTypes.bool,
  /**
   * Number of miliseconds until tooltip close.
   * `hoverOutDelayTimeout` prop is important when you are using `triggerActionType='hover'`.
   * Thanks to this tooltip won't close when user moves mouse cursor from `trigger` to `tooltip`.
   */
  hoverOutDelayTimeout: PropTypes.number,
  isVisible: PropTypes.bool,
  /**
   * Set to `false` to turn off fade-in/fade-out animations.
   */
  withFadeAnimation: PropTypes.bool,
  style: PropTypes.object,
  /**
   * The theme changes the look of the tooltip.
   */
  theme: PropTypes.oneOf(['invert', 'important']),
  modifiers: PropTypes.object,
  onClose: PropTypes.func,
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
  tooltipRef: PropTypes.func,
  triggerRef: PropTypes.func,
  referenceElement: PropTypes.shape({
    clientWidth: PropTypes.number.isRequired,
    clientHeight: PropTypes.number.isRequired
  }),
  /**
   * Use this props to change default value of opacity transition duration (number of miliseconds).
   */
  transitionDuration: PropTypes.number,
  /**
   * Use this props to delay tooltip visibilty change (number of miliseconds).
   */
  transitionDelay: PropTypes.number,
  /**
   * You can pass as tooltip trigger element a renderer or a component. A couple of props will passed to your
   * component, depending on the chosen `triggerActionType`:
   * - `managed` - `ref`
   * - `click` - `onClick`
   * - `hover` - `onMouseEnter`, `onMouseLeave`
   */
  trigger: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  /**
   * - Using `managed` will switch component visiblity to controlled state - you will need to provide isVisible props to show/hide tooltip.
   *   It's pretty usefull to handle custom use cases, for instance new feature info tooltips which will be shown to user only once.
   * - Using `click` and `hover` will make component visiblity uncontrolled (`isVisible` state handled by component itself). `isVisible` props won't affect
   *   component visibility.
   */
  triggerActionType: PropTypes.oneOf(['managed', 'click', 'hover']),
  zIndex: PropTypes.number.isRequired,
  /**
   * Use this props to trigger the function if the tooltip content is going to be visible. It works for `click` and `hover` trigger action types.
   */
  onOpen: PropTypes.func
};

PopperTooltip.defaultProps = {
  hoverOutDelayTimeout: 100,
  modifiers: {},
  onClose: noop,
  style: {},
  withFadeAnimation: true,
  transitionDuration: 200,
  transitionDelay: 0,
  triggerActionType: 'hover',
  placement: 'bottom'
};

export default PopperTooltip;
