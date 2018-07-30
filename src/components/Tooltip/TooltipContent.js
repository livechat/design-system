import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from '../../styled';

const noop = () => {};

const StyledTooltipContent = styled.div`
  position: fixed;
  top: ${props => `${props.yPosition}px`};
  left: ${props => `${props.xPosition}px`};
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
  opacity: ${props => (props.isVisible ? 1 : 0)};
`;

const StyledTooltipBox = styled.div`
  position: relative;
`;

const TooltipContent = ({
  isVisible,
  xPosition,
  yPosition,
  contentRef,
  onContentMouseEnter,
  onContentMouseLeave,
  children
}) => (
  <StyledTooltipContent
    onMouseEnter={onContentMouseEnter}
    onMouseLeave={onContentMouseLeave}
    innerRef={contentRef}
    isVisible={isVisible}
    xPosition={xPosition}
    yPosition={yPosition}
  >
    <StyledTooltipBox>{children}</StyledTooltipBox>
  </StyledTooltipContent>
);

TooltipContent.propTypes = {
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool.isRequired,
  xPosition: PropTypes.number.isRequired,
  yPosition: PropTypes.number.isRequired,
  onContentMouseEnter: PropTypes.func,
  onContentMouseLeave: PropTypes.func,
  contentRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.string
  ]).isRequired
};

TooltipContent.defaultProps = {
  onContentMouseEnter: noop,
  onContentMouseLeave: noop
};

export default TooltipContent;
