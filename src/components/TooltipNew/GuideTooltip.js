import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import memoizeOne from 'memoize-one';
import styles from './style.scss';
import PopperTooltip from './PopperTooltip';
import TooltipPortal from './TooltipPortal';
import SpotlightOverlay from './SpotlightOverlay';
import VirtualReference from '../../helpers/virtual-element-reference';

const baseClass = 'guide-tooltip';

const cx = classNames.bind(styles);

const memoizedReference = memoizeOne(
  (element, padding) => new VirtualReference(element, padding)
);

class GuideTooltip extends React.PureComponent {
  static getDerivedStateFromProps(props, state) {
    if (props.isVisible) {
      if (!state.lastElement) {
        // this is the first time the tooltip is shown - don't slide from the (0, 0) origin
        return {
          shouldSlide: false,
          lastElement: props.element
        };
      }

      if (props.element !== state.lastElement) {
        // the element has changed - slide to the next one
        return {
          shouldSlide: true,
          lastElement: props.element
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

    // we don't use the following state params but we still need to re-render when the window changes
    /* eslint-disable react/no-unused-state */
    this.state = {
      windowWidth: 0,
      windowHeight: 0,
      windowScrollX: 0,
      windowScrollY: 0
    };
    /* eslint-enable react/no-unused-state */

    this.handleDocumentChange = this.handleDocumentChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleDocumentChange);
    document.addEventListener('scroll', this.handleDocumentChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleDocumentChange);
    document.removeEventListener('scroll', this.handleDocumentChange);
  }

  handleDocumentChange() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowScrollX = document.documentElement.scrollLeft;
    const windowScrollY = document.documentElement.scrollTop;

    /* eslint-disable react/no-unused-state */
    this.setState({
      windowWidth,
      windowHeight,
      windowScrollX,
      windowScrollY
    });
    /* eslint-enable react/no-unused-state */
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
      theme
    } = this.props;
    const referenceElement = memoizedReference(element, 8);
    const rect = referenceElement.getBoundingClientRect();
    const shouldSlide = slide && this.state.shouldSlide;

    return (
      <TooltipPortal>
        <SpotlightOverlay
          gap={rect}
          isVisible={isVisible}
          slide={shouldSlide}
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
          modifiers={{
            offset: {
              offset: '0, 20'
            }
          }}
        >
          {children}
        </PopperTooltip>
      </TooltipPortal>
    );
  }
}

GuideTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  zIndex: PropTypes.number.isRequired,
  element: PropTypes.oneOfType([PropTypes.node, PropTypes.instanceOf(Element)]),
  isVisible: PropTypes.bool,
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
  ])
};

export default GuideTooltip;
