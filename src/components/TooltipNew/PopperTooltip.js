import * as React from 'react';
import * as PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import { CSSTransition } from 'react-transition-group';
import { Manager, Reference, Popper } from 'react-popper';
import cx from 'classnames';
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
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.closeOnOutsideClick &&
      !this.getIsVisible(prevProps, prevState) &&
      this.getIsVisible()
    ) {
      document.addEventListener('click', this.handleDocumentClick);
    }

    if (this.getIsVisible(prevProps, prevState) && !this.getIsVisible()) {
      document.removeEventListener('click', this.handleDocumentClick);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
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

  handleDocumentClick = event => {
    const triggerRef = this.getTriggerRef();
    const tooltipRef = this.getTooltipRef();

    if (
      triggerRef &&
      !triggerRef.contains(event.target) &&
      tooltipRef &&
      !tooltipRef.contains(event.target)
    ) {
      if (this.isIsVisibleControlled()) {
        this.props.onClose();
      } else {
        this.setState({
          isVisible: false
        });
      }
    }
  };

  renderTriggerElement = ({ ref }) => {
    const { trigger, triggerActionType, withWrapper } = this.props;

    const triggerProps = { ref };

    if (triggerActionType === 'click') {
      triggerProps.onClick = this.handleTriggerClick;
    }

    if (triggerActionType === 'hover' && !withWrapper) {
      triggerProps.onMouseEnter = this.handleTriggerMouseEnter;
      triggerProps.onMouseLeave = this.handleTriggerMouseLeave;
    }

    if (typeof trigger === 'function') {
      return trigger(triggerProps);
    }

    return React.cloneElement(trigger, triggerProps);
  };

  renderPopperWithWrapper = () => {
    const { triggerActionType, wrapperClassName, wrapperProps } = this.props;

    const computedWrapperProps = {
      ...wrapperProps,
      className: cx(styles[`${baseClass}__wrapper`])
    };

    if (wrapperClassName) {
      computedWrapperProps.className = cx({
        [styles[`${baseClass}__wrapper`]]: true,
        [wrapperClassName]: wrapperClassName
      });
    }

    if (triggerActionType === 'hover') {
      computedWrapperProps.onMouseEnter = this.handleTriggerMouseEnter;
      computedWrapperProps.onMouseLeave = this.handleTriggerMouseLeave;
    }

    return <div {...computedWrapperProps}>{this.renderPopperManager()}</div>;
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
      withWrapper,
      wrapperClassName,
      wrapperProps,
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
    if (this.props.withWrapper) {
      return this.renderPopperWithWrapper();
    }
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
  eventsEnabled: PropTypes.bool,
  isVisible: PropTypes.bool,
  /**
   * Set to `false` to turn off fade-in/fade-out animations.
   */
  withFadeAnimation: PropTypes.bool,
  style: PropTypes.object,
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
  /**
   * It will render additional wrapper around tooltip and trigger.
   * It could be useful for tooltips with `triggerActionType='hover`.
   * Set it to `true` for tooltips with interactive content, when user should be able to, for instance click some button inside tooltip.

   */
  withWrapper: PropTypes.bool,
  /**
   * You can use `wrapperClassName` to style tooltip wrapper (when `withWrapper` is `true`)
   */
  wrapperClassName: PropTypes.string,
  /**
   * Other html div attributes for tooltip wrapper
   */
  wrapperProps: PropTypes.object,
  zIndex: PropTypes.number.isRequired
};

PopperTooltip.defaultProps = {
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
