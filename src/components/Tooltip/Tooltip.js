import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from '../../styled';
import TooltipContent from './TooltipContent';
import throttle from '../../helpers/throttle';

const TooltipDirection = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right'
};

const TooltipAlignment = {
  Top: 'top',
  Center: 'center'
};

export const StyledTooltip = styled.div`
  position: relative;
`;

class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      offset: props.offset ? props.offset : 0,
      xPosition: 0,
      yPosition: 0
    };

    this.onWindowScroll = this.onWindowScroll.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onContentMouseEnter = this.onContentMouseEnter.bind(this);
    this.onContentMouseLeave = this.onContentMouseLeave.bind(this);
    this.calculatePosition = this.calculatePosition.bind(this);
    this.scrollListener = throttle(() => this.onWindowScroll(), 50);
  }

  static getDerivedStateFromProps(props) {
    if (props.trigger === 'custom') {
      return { isVisible: props.isTooltipVisible };
    }
    return null;
  }

  componentDidUpdate(_prevProps, prevState) {
    // Add event handlers only when tooltip is visible
    if (this.state.isVisible && !prevState.isVisible) {
      this.addEventHandlers();
    }

    // Tooltip is hidden, we don't need listen to global events anymore
    if (!this.state.isVisible && prevState.isVisible) {
      this.removeEventHandlers();
    }

    // Do recalculate tooltip position if the one is shown
    if (this.state.isVisible) {
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

  onWindowScroll() {
    if (this.state.isVisible) {
      this.setState({ isVisible: false });
    }
  }

  onMouseEnter() {
    if (this.props.trigger === 'hover') {
      this.setState({ isVisible: true });
    }
  }

  onMouseLeave() {
    if (this.props.trigger === 'hover') {
      this.setState({ isVisible: false });
    }
  }

  onContentMouseEnter() {
    if (this.props.trigger === 'hover') {
      this.setState({
        isVisible: this.props.keepContentVisibleOnHover || false
      });
    }
  }

  onContentMouseLeave() {
    if (this.props.trigger === 'hover') {
      this.setState({ isVisible: false });
    }
  }

  getAlignment(direction) {
    const supportedAlignments = {
      [TooltipDirection.Left]: [TooltipAlignment.Center, TooltipAlignment.Top],
      [TooltipDirection.Right]: [TooltipAlignment.Center],
      [TooltipDirection.Top]: [TooltipAlignment.Center],
      [TooltipDirection.Bottom]: [TooltipAlignment.Center]
    };

    if (
      this.props.align &&
      supportedAlignments[direction].indexOf(this.props.align) > -1
    ) {
      return this.props.align;
    }

    return TooltipAlignment.Center;
  }

  addEventHandlers() {
    window.addEventListener('scroll', this.scrollListener);
  }

  removeEventHandlers() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  recalculatePosition() {
    const directionsChecked = [];
    let tooltipDirection = this.tooltipDirection(directionsChecked);

    while (!this.calculatePosition(tooltipDirection)) {
      directionsChecked.push(tooltipDirection);
      tooltipDirection = this.tooltipDirection(directionsChecked);
    }
  }

  calculatePosition(direction) {
    const tooltipRefRect = this.tooltipRef.current.getBoundingClientRect();
    const tooltipContentRefRect = this.tooltipContentRef.current.getBoundingClientRect();
    let tooltipXPosition;
    let tooltipYPosition;

    this.lastTooltipRefTop = tooltipRefRect.top;
    this.lastTooltipRefLeft = tooltipRefRect.left;
    const align = this.getAlignment(direction);

    switch (direction) {
      case TooltipDirection.Top:
        tooltipXPosition =
          tooltipRefRect.left +
          (tooltipRefRect.width / 2 - tooltipContentRefRect.width / 2);
        tooltipYPosition =
          tooltipRefRect.top - tooltipContentRefRect.height - this.state.offset;
        break;

      case TooltipDirection.Bottom:
        tooltipXPosition =
          tooltipRefRect.left +
          (tooltipRefRect.width / 2 - tooltipContentRefRect.width / 2);
        tooltipYPosition =
          tooltipRefRect.top + tooltipRefRect.height + this.state.offset;
        break;

      case TooltipDirection.Right:
        tooltipXPosition =
          tooltipRefRect.left + tooltipRefRect.width + this.state.offset;
        tooltipYPosition =
          tooltipRefRect.top +
          tooltipRefRect.height / 2 -
          tooltipContentRefRect.height / 2;
        break;
      // 131 34 220
      // 131 34 255
      case TooltipDirection.Left:
        tooltipXPosition =
          tooltipRefRect.left - tooltipContentRefRect.width - this.state.offset;
        switch (align) {
          case TooltipAlignment.Center:
            tooltipYPosition =
              tooltipRefRect.top +
              tooltipRefRect.height / 2 -
              tooltipContentRefRect.height / 2;
            break;
          case TooltipAlignment.Top:
            tooltipYPosition = tooltipRefRect.top - 4 - 10; // minus TooltipContent margin and overlap
            break;
          // no default
        }
        break;

      default:
        tooltipXPosition = 0;
        tooltipYPosition = 0;
        break;
    }

    this.setState({ xPosition: tooltipXPosition, yPosition: tooltipYPosition });

    return true;
  }

  tooltipDirection(directionsChecked) {
    const defaultQueue = [
      TooltipDirection.Top,
      TooltipDirection.Bottom,
      TooltipDirection.Left,
      TooltipDirection.Right
    ];
    const propsQueue = this.props.directions;
    const propsDirection = propsQueue.filter(
      direction => directionsChecked.indexOf(direction) === -1
    )[0];
    const defaultDirection = defaultQueue.filter(
      direction => directionsChecked.indexOf(direction) === -1
    )[0];

    if (propsDirection) {
      return propsDirection;
    } else if (defaultDirection) {
      return defaultDirection;
    }
    return TooltipDirection.Top;
  }

  tooltipRef = React.createRef();
  tooltipContentRef = React.createRef();

  render() {
    return (
      <StyledTooltip
        innerRef={this.tooltipRef}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        className={this.props.className}
      >
        {this.props.children}

        <TooltipContent
          contentRef={this.tooltipContentRef}
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
        </TooltipContent>
      </StyledTooltip>
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
  align: PropTypes.oneOf(['top', 'center']),
  directions: (props, propName, componentName) => {
    const acceptedValues = ['left', 'right', 'top', 'bottom'];
    let isWrongValue = false;

    if (!Array.isArray(props[propName])) {
      isWrongValue = true;
    } else {
      for (let i = 0; i < props[propName].length; i += 1) {
        if (!acceptedValues.some(value => value === props[propName][i])) {
          isWrongValue = true;
        }
      }
    }

    if (isWrongValue) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. 
        Prop should be equal to array with some of values ['left', 'right', 'top', 'bottom']. Validation failed.`
      );
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
  directions: ['bottom']
};

export default Tooltip;
