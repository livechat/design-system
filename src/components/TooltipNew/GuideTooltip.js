import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import PopperTooltip from './PopperTooltip';
import TooltipPortal from './TooltipPortal';

const baseClass = 'guide-tooltip';

const cx = classNames.bind(styles);

const addPadding = (rect, padding) => {
  const x = rect.x - padding;
  const y = rect.y - padding;
  const width = rect.width + 2 * padding;
  const height = rect.height + 2 * padding;
  const top = y;
  const left = x;
  const bottom = top + height;
  const right = left + width;

  return {
    x,
    y,
    width,
    height,
    top,
    left,
    bottom,
    right
  };
};

class VirtualReference {
  constructor(element) {
    this.element = element;
  }

  getBoundingClientRect() {
    return addPadding(this.element.getBoundingClientRect(), 8);
  }

  get clientWidth() {
    return this.getBoundingClientRect().width;
  }

  get clientHeight() {
    return this.getBoundingClientRect().height;
  }
}

const GapOverlay = ({ gap, isVisible, slide }) => {
  const overlayLeft = gap && {
    top: '0',
    left: '0',
    width: `${gap.left}px`,
    height: '100%'
  };
  const overlayRight = gap && {
    top: '0',
    left: `${gap.right}px`,
    width: `calc(100% - ${gap.right}px)`,
    height: '100%'
  };
  const overlayTop = gap && {
    top: '0',
    left: `${gap.left}px`,
    width: `${gap.width}px`,
    height: `${gap.top}px`
  };
  const overlayBottom = gap && {
    top: `${gap.bottom}px`,
    left: `${gap.left}px`,
    width: `${gap.width}px`,
    height: `calc(100% - ${gap.bottom}px)`
  };

  return (
    <React.Fragment>
      <div
        className={cx({
          [styles[`${baseClass}__overlay`]]: true,
          [styles[`${baseClass}__overlay--visible`]]: isVisible,
          [styles[`${baseClass}__overlay--slide`]]: slide
        })}
        style={overlayLeft}
      />
      <div
        className={cx({
          [styles[`${baseClass}__overlay`]]: true,
          [styles[`${baseClass}__overlay--visible`]]: isVisible,
          [styles[`${baseClass}__overlay--slide`]]: slide
        })}
        style={overlayTop}
      />
      <div
        className={cx({
          [styles[`${baseClass}__overlay`]]: true,
          [styles[`${baseClass}__overlay--visible`]]: isVisible,
          [styles[`${baseClass}__overlay--slide`]]: slide
        })}
        style={overlayRight}
      />
      <div
        className={cx({
          [styles[`${baseClass}__overlay`]]: true,
          [styles[`${baseClass}__overlay--visible`]]: isVisible,
          [styles[`${baseClass}__overlay--slide`]]: slide
        })}
        style={overlayBottom}
      />
    </React.Fragment>
  );
};

GapOverlay.propTypes = {
  gap: PropTypes.exact({
    top: PropTypes.number,
    left: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
  }),
  isVisible: PropTypes.bool,
  slide: PropTypes.bool
};

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
      placement,
      zIndex,
      element,
      isVisible,
      slide,
      theme
    } = this.props;
    const referenceElement = element && new VirtualReference(element);
    const rect = referenceElement && referenceElement.getBoundingClientRect();

    return (
      <TooltipPortal>
        <GapOverlay gap={rect} isVisible={isVisible} slide={slide} />
        <PopperTooltip
          theme={theme || 'invert'}
          className={cx({
            [styles[baseClass]]: true,
            [styles[`${baseClass}--slide`]]: slide,
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
  element: PropTypes.node.isRequired,
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
