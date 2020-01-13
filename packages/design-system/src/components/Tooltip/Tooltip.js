import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { throttle } from '@livechat/data-utils';
import styles from './style.scss';
import TooltipBox from './TooltipBox';
import { getTooltipPosition } from './helpers';
import { DIRECTION, ALIGMENT } from '../../constants/tooltip';
import { noticeAboutDeprecation } from '../../helpers/notice-about-deprecation'

class Tooltip extends React.Component {
  constructor(props) {
    noticeAboutDeprecation('deprecated component - Tooltip, please use CSSTooltip or PopperTooltip instead');
    super(props);

    this.state = {
      isVisible: false,
      offset: props.offset ? props.offset : 0,
      xPosition: 0,
      yPosition: 0
    };

    this.viewportListener = throttle(50, this.onViewportChange);
  }

  static getDerivedStateFromProps(props) {
    if (props.trigger === 'custom') {
      return { isVisible: props.isTooltipVisible };
    }
    return null;
  }

  componentDidUpdate(_prevProps, prevState) {
    if (this.state.isVisible && !prevState.isVisible) {
      this.addEventHandlers();
    }

    if (!this.state.isVisible && prevState.isVisible) {
      this.removeEventHandlers();
    }

    if (this.state.isVisible && this.tooltipRef.current) {
      const tooltipRefRect = this.tooltipRef.current.getBoundingClientRect();

      if (
        tooltipRefRect.top !== this.lastTooltipRefTop ||
        tooltipRefRect.left !== this.lastTooltipRefLeft
      ) {
        this.recalculatePosition();
      }
    }
  }

  componentWillUnmount() {
    this.removeEventHandlers();
  }

  onViewportChange = () => {
    if (this.state.isVisible) {
      this.setState({ isVisible: false });
    }
  };

  onMouseEnter = () => {
    if (this.props.trigger === 'hover') {
      this.setState({ isVisible: true });
    }
  };

  onMouseLeave = () => {
    if (this.props.trigger === 'hover') {
      this.setState({ isVisible: false });
    }
  };

  onContentMouseEnter = () => {
    if (this.props.trigger === 'hover') {
      this.setState({
        isVisible: this.props.keepContentVisibleOnHover || false
      });
    }
  };

  onContentMouseLeave = () => {
    if (this.props.trigger === 'hover') {
      this.setState({ isVisible: false });
    }
  };

  getAlignment(direction) {
    const supportedAlignments = {
      [DIRECTION.Left]: [ALIGMENT.Center, ALIGMENT.Top, ALIGMENT.Bottom],
      [DIRECTION.Right]: [ALIGMENT.Center, ALIGMENT.Top, ALIGMENT.Bottom],
      [DIRECTION.Top]: [ALIGMENT.Center, ALIGMENT.Left, ALIGMENT.Right],
      [DIRECTION.Bottom]: [ALIGMENT.Center, ALIGMENT.Left, ALIGMENT.Right]
    };

    if (supportedAlignments[direction].indexOf(this.props.align) > -1) {
      return this.props.align;
    }

    return ALIGMENT.Center;
  }

  addEventHandlers() {
    window.addEventListener('scroll', this.viewportListener);
    window.addEventListener('resize', this.viewportListener);
  }

  removeEventHandlers() {
    window.removeEventListener('scroll', this.viewportListener);
    window.removeEventListener('resize', this.viewportListener);
  }

  recalculatePosition() {
    const directionsChecked = [];
    let tooltipDirection = this.tooltipDirection(directionsChecked);

    while (!this.calculatePosition(tooltipDirection)) {
      directionsChecked.push(tooltipDirection);
      tooltipDirection = this.tooltipDirection(directionsChecked);
    }
  }

  calculatePosition = direction => {
    if (!this.tooltipRef.current) {
      return true;
    }
    const tooltipRefRect = this.tooltipRef.current.getBoundingClientRect();
    const tooltipBoxRefRect = this.tooltipBoxRef.current.getBoundingClientRect();

    this.lastTooltipRefTop = tooltipRefRect.top;
    this.lastTooltipRefLeft = tooltipRefRect.left;
    const align = this.getAlignment(direction);
    const { offset } = this.state;

    const { tooltipXPosition, tooltipYPosition } = getTooltipPosition({
      direction,
      align,
      offset,
      tooltipRefRect,
      tooltipBoxRefRect
    });

    this.setState({ xPosition: tooltipXPosition, yPosition: tooltipYPosition });

    return true;
  };

  tooltipDirection(directionsChecked) {
    const defaultQueue = [
      DIRECTION.Top,
      DIRECTION.Bottom,
      DIRECTION.Left,
      DIRECTION.Right
    ];
    const propsQueue = this.props.directions;
    const [propsDirection] = propsQueue.filter(
      direction => directionsChecked.indexOf(direction) === -1
    );
    const [defaultDirection] = defaultQueue.filter(
      direction => directionsChecked.indexOf(direction) === -1
    );

    if (propsDirection) {
      return propsDirection;
    } else if (defaultDirection) {
      return defaultDirection;
    }
    return DIRECTION.Top;
  }

  tooltipClassNames() {
    return classNames(
      styles.tooltip,
      { [`${styles.tooltip}--inline`]: this.props.inline },
      this.props.className
    );
  }

  tooltipRef = React.createRef();
  tooltipBoxRef = React.createRef();

  render() {
    return (
      <div
        className={this.tooltipClassNames()}
        ref={this.tooltipRef}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {this.props.children}

        <TooltipBox
          contentRef={this.tooltipBoxRef}
          isVisible={
            (this.props.trigger === 'custom' && this.props.isTooltipVisible) ||
            this.state.isVisible
          }
          xPosition={this.state.xPosition}
          yPosition={this.state.yPosition}
          onContentMouseEnter={this.onContentMouseEnter}
          onContentMouseLeave={this.onContentMouseLeave}
        >
          {this.props.content}
        </TooltipBox>
      </div>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  className: PropTypes.string,
  keepContentVisibleOnHover: PropTypes.bool,
  isTooltipVisible: PropTypes.bool,
  offset: PropTypes.number,
  trigger: PropTypes.oneOf(['hover', 'click', 'custom']),
  align: PropTypes.oneOf(['top', 'center', 'bottom', 'left', 'right']),
  inline: PropTypes.bool,
  directions: (props, propName, componentName) => {
    const values = obj => Object.keys(obj).map(key => obj[key]);

    const validationError = new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`.
      Prop should be equal to array with some of values ${values(
        DIRECTION
      ).join(', ')}. Validation failed.`
    );

    if (!Array.isArray(props[propName])) {
      return validationError;
    }

    const check = props[propName].filter(v =>
      values(DIRECTION).some(value => value === v)
    );
    if (check.length !== props[propName].length) {
      return validationError;
    }

    return null;
  }
};

Tooltip.defaultProps = {
  className: null,
  keepContentVisibleOnHover: false,
  isTooltipVisible: false,
  offset: 0,
  trigger: 'hover',
  align: 'top',
  inline: false,
  directions: ['bottom']
};

export default Tooltip;
