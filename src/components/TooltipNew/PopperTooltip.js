import * as React from 'react';
import * as PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import { CSSTransition } from 'react-transition-group';
import { Manager, Reference, Popper } from 'react-popper';
import cx from 'classnames';
import styles from './style.scss';

const baseClass = 'popper-tooltip';

const DEFAULT_TRANSITION_DURATION = 200;
const DEFAULT_TRANSITION_DELAY = 0;

class PopperTooltip extends React.PureComponent {
  static defaultProps = {
    modifiers: {},
    style: {},
    zIndex: 30,
    withFadeAnimation: true,
    transitionDuration: DEFAULT_TRANSITION_DURATION,
    transitionDelay: DEFAULT_TRANSITION_DELAY,
    triggerActionType: 'custom',
    placement: 'bottom'
  };

  static buildPopperModifiers(modifiers) {
    const { offset, flip, hide, preventOverflow, arrow, ...rest } = modifiers;
    const arrowProps = { enabled: true, ...(arrow || {}) };

    return {
      offset: {
        offset: arrowProps.enabled ? '0, 8' : '0, 4',
        ...(offset || {})
      },
      flip: { enabled: true, behavior: 'flip', ...(flip || {}) },
      arrow: arrowProps,
      hide: { enabled: false, ...(hide || {}) },
      preventOverflow: { enabled: true, ...(preventOverflow || {}) },
      ...rest
    };
  }

  static buildTooltipStyle(
    popperCalculatedStyle,
    propsStyle,
    zIndex,
    transitionDuration,
    transitionDelay
  ) {
    return {
      ...popperCalculatedStyle,
      ...propsStyle,
      zIndex,
      transitionDuration: `${transitionDuration}ms`,
      transitionDelay: `${transitionDelay}ms`
    };
  }

  state = {
    isVisible: false
  };

  getModifiers = memoizeOne(PopperTooltip.buildPopperModifiers);

  getTooltipStyle = memoizeOne(PopperTooltip.buildTooltipStyle);

  getIsVisible = (props = this.props, state = this.state) =>
    this.isIsVisibleControlled() ? props.isVisible : state.isVisible;

  setTooltipRef = ref => {
    this.tooltipRef = ref;
  };

  setTriggerRef = ref => {
    this.triggerRef = ref;
  };

  isIsVisibleControlled = () => this.props.triggerActionType === 'custom';

  handleTriggerMouseEnter = () => {
    this.setState({
      isVisible: true
    });
  };

  handleTriggerMouseLeave = () => {
    this.setState({
      isVisible: false
    });
  };

  handleTriggerClick = () => {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }));
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
      zIndex,
      eventsEnabled,
      modifiers,
      style: propsStyle,
      positionFixed,
      isVisible,
      referenceElement,
      trigger,
      triggerActionType,
      withFadeAnimation,
      transitionDuration,
      transitionDelay,
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

  render() {
    return (
      <Manager>
        <Reference innerRef={this.props.triggerRef || this.setTriggerRef}>
          {this.renderTriggerElement}
        </Reference>
        {this.renderPopper()}
      </Manager>
    );
  }
}

PopperTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  eventsEnabled: PropTypes.bool,
  isVisible: PropTypes.bool,
  /**
   * Set to `false` to turn off fade-in/fade-out animations.
   */
  withFadeAnimation: PropTypes.bool,
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
  tooltipRef: PropTypes.func,
  triggerRef: PropTypes.func,
  referenceElement: PropTypes.instanceOf(Element),
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
   * - `custom` - `ref`
   * - `click` - `onClick`
   * - `hover` - `onMouseEnter`, `onMouseLeave`
   */
  trigger: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  /**
   * - Using `custom` will switch component visiblity to controlled state - you will need to provide isVisible props to show/hide tooltip.
   *   It's pretty usefull to handle custom use cases, for instance new feature info tooltips which will be shown to user only once.
   * - Using `click` and `hover` will make component visiblity uncontrolled (`isVisible` state handled by component itself). `isVisible` props won't affect
   *   component visibility.
   */
  triggerActionType: PropTypes.oneOf(['custom', 'click', 'hover']),
  zIndex: PropTypes.number
};

export default PopperTooltip;
