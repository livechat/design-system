import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { throttle } from '@livechat/data-utils';
import styles from './style.scss';
import PopperTooltip from './PopperTooltip';
import ModalPortal from '../Modal/ModalPortal';
import SpotlightOverlay from './SpotlightOverlay';
import VirtualReference from '../../helpers/virtual-element-reference';

const baseClass = 'guide-tooltip';

const cx = classNames.bind(styles);

const virtualReference = (element, padding) =>
  new VirtualReference(element, padding);

const offsetModifiers = {
  offset: {
    offset: '0, 20'
  }
};

const spotlightPadding = 8;

class UserGuideTooltip extends React.PureComponent {
  static getDerivedStateFromProps(props, state) {
    if (props.isVisible) {
      if (!state.lastElement) {
        // this is the first time the tooltip is shown - don't slide from the (0, 0) origin
        return {
          shouldSlide: false,
          lastElement: props.element,
          rect: virtualReference(
            props.element,
            spotlightPadding
          ).getBoundingClientRect()
        };
      }

      if (props.element !== state.lastElement) {
        // the element has changed - slide to the next one
        return {
          shouldSlide: true,
          lastElement: props.element,
          rect: virtualReference(
            props.element,
            spotlightPadding
          ).getBoundingClientRect()
        };
      }

      // window was scrolled or any other change has happened - don't slide
      return {
        shouldSlide: false
      };
    }

    // reset the element when the tooltip hides
    return {
      lastElement: null
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      shouldSlide: false,
      rect: virtualReference(
        props.element,
        spotlightPadding
      ).getBoundingClientRect()
    };

    this.handleViewPortChange = throttle(
      16,
      this.handleDocumentChange.bind(this)
    );
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleViewPortChange);
    (this.props.scrollableWrapper || document).addEventListener(
      'scroll',
      this.handleViewPortChange
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleViewPortChange);
    (this.props.scrollableWrapper || document).removeEventListener(
      'scroll',
      this.handleViewPortChange
    );
  }

  handleDocumentChange() {
    this.setState({
      rect: virtualReference(
        this.props.element,
        spotlightPadding
      ).getBoundingClientRect()
    });
  }

  render() {
    const {
      children,
      className,
      placement,
      zIndex,
      element,
      isVisible,
      slide,
      theme,
      containerName,
      disableSpotlightPointerEvents
    } = this.props;
    const { rect } = this.state;

    const referenceElement = virtualReference(element, spotlightPadding);
    const shouldSlide = !!(slide && this.state.shouldSlide);

    return (
      <ModalPortal parentElementName={containerName} zIndex={zIndex}>
        <SpotlightOverlay
          gap={rect}
          isVisible={isVisible}
          slide={shouldSlide}
          disablePointerEvents={disableSpotlightPointerEvents}
        />
        <PopperTooltip
          theme={theme || 'invert'}
          className={cx({
            [styles[baseClass]]: true,
            [styles[`${baseClass}--slide`]]: shouldSlide,
            [className]: className
          })}
          placement={placement}
          triggerActionType="managed"
          isVisible={isVisible}
          referenceElement={referenceElement}
          zIndex={zIndex}
          modifiers={offsetModifiers}
        >
          {children}
        </PopperTooltip>
      </ModalPortal>
    );
  }
}

UserGuideTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  zIndex: PropTypes.number.isRequired,
  element: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.instanceOf(typeof Element === 'undefined' ? () => {} : Element)
  ]).isRequired,
  scrollableWrapper: PropTypes.instanceOf(
    typeof Element === 'undefined' ? () => {} : Element
  ),
  isVisible: PropTypes.bool.isRequired,
  slide: PropTypes.bool,
  theme: PropTypes.oneOf(['invert', 'important']),
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
  containerName: PropTypes.string,
  disableSpotlightPointerEvents: PropTypes.bool
};

export default UserGuideTooltip;
