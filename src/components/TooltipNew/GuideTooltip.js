import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import PopperTooltip from './PopperTooltip';
import TooltipPortal from './TooltipPortal';

const baseClass = 'guide-tooltip';

const cx = classNames.bind(styles);

class VirtualReference {
  constructor(element) {
    this.element = element;
  }

  getBoundingClientRect() {
    return this.element.getBoundingClientRect();
  }

  get clientWidth() {
    return this.getBoundingClientRect().width;
  }

  get clientHeight() {
    return this.getBoundingClientRect().height;
  }
}

class GuideTooltip extends React.PureComponent {
  constructor(props) {
    super(props);

    // we don't use the following state params but we need to re-render when the window changes
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
      zIndex,
      element,
      isVisible,
      slide
    } = this.props;
    const referenceElement = element && new VirtualReference(element);

    return (
      <TooltipPortal>
        {isVisible && (
          <div
            onClick={this.onOverlayClick}
            className={cx({
              [styles[`${baseClass}__overlay`]]: true,
              [styles[`${baseClass}__overlay--visible`]]: isVisible
            })}
          />
        )}
        <PopperTooltip
          className={cx({
            [styles[baseClass]]: true,
            [styles[`${baseClass}--slide`]]: slide,
            [className]: className
          })}
          triggerActionType="managed"
          isVisible={isVisible}
          referenceElement={referenceElement}
          zIndex={zIndex}
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
  element: PropTypes.node.isRequired,
  isVisible: PropTypes.bool,
  slide: PropTypes.bool
};

export default GuideTooltip;
