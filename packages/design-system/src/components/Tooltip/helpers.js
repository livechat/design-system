import {
  DIRECTION,
  ALIGMENT,
  TOOLTIP_MARGIN,
  ARROW_POSITION
} from '../../constants/tooltip';

export const getTooltipPosition = opts => {
  const { direction, align, offset, tooltipRefRect, tooltipBoxRefRect } = opts;

  let tooltipXPosition;
  let tooltipYPosition;

  switch (direction) {
    case DIRECTION.Top:
      tooltipYPosition = tooltipRefRect.top - tooltipBoxRefRect.height - offset;
      switch (align) {
        case ALIGMENT.Center:
        default:
          tooltipXPosition =
            tooltipRefRect.left +
            (tooltipRefRect.width / 2 - tooltipBoxRefRect.width / 2);
          break;
        case ALIGMENT.Left:
          tooltipXPosition = tooltipRefRect.left - TOOLTIP_MARGIN;
          break;
        case ALIGMENT.Right:
          tooltipXPosition =
            tooltipRefRect.left +
            tooltipRefRect.width -
            tooltipBoxRefRect.width +
            TOOLTIP_MARGIN;
          break;
      }
      break;

    case DIRECTION.Bottom:
      tooltipYPosition = tooltipRefRect.top + tooltipRefRect.height + offset;
      switch (align) {
        case ALIGMENT.Center:
        default:
          tooltipXPosition =
            tooltipRefRect.left +
            (tooltipRefRect.width / 2 - tooltipBoxRefRect.width / 2);
          break;
        case ALIGMENT.Left:
          tooltipXPosition = tooltipRefRect.left - TOOLTIP_MARGIN;
          break;
        case ALIGMENT.Right:
          tooltipXPosition =
            tooltipRefRect.left +
            tooltipRefRect.width -
            tooltipBoxRefRect.width +
            TOOLTIP_MARGIN;
          break;
      }
      break;

    case DIRECTION.Right:
      tooltipXPosition = tooltipRefRect.left + tooltipRefRect.width + offset;
      switch (align) {
        case ALIGMENT.Center:
        default:
          tooltipYPosition =
            tooltipRefRect.top +
            tooltipRefRect.height / 2 -
            tooltipBoxRefRect.height / 2;
          break;
        case ALIGMENT.Top:
          tooltipYPosition = tooltipRefRect.top - TOOLTIP_MARGIN;
          break;
        case ALIGMENT.Bottom:
          tooltipYPosition =
            tooltipRefRect.top +
            tooltipRefRect.height -
            tooltipBoxRefRect.height +
            TOOLTIP_MARGIN;
          break;
      }
      break;

    case DIRECTION.Left:
      tooltipXPosition = tooltipRefRect.left - tooltipBoxRefRect.width - offset;
      switch (align) {
        case ALIGMENT.Center:
        default:
          tooltipYPosition =
            tooltipRefRect.top +
            tooltipRefRect.height / 2 -
            tooltipBoxRefRect.height / 2;
          break;
        case ALIGMENT.Top:
          tooltipYPosition = tooltipRefRect.top - TOOLTIP_MARGIN;
          break;
        case ALIGMENT.Bottom:
          tooltipYPosition =
            tooltipRefRect.top +
            tooltipRefRect.height -
            tooltipBoxRefRect.height +
            TOOLTIP_MARGIN;
          break;
      }
      break;

    default:
      tooltipXPosition = 0;
      tooltipYPosition = 0;
      break;
  }

  return {
    tooltipXPosition,
    tooltipYPosition
  };
};

export const getArrowOffsetStyle = (arrowOffset, arrowPosition, arrowAlign) => {
  if (!arrowOffset) {
    return {};
  }

  switch (arrowPosition) {
    case ARROW_POSITION.Left:
    case ARROW_POSITION.Right:
      if (arrowAlign === ALIGMENT.Bottom) {
        return { bottom: `${arrowOffset}px`, top: 'auto' };
      }
      return { top: `${arrowOffset}px`, bottom: 'auto' };
    case ARROW_POSITION.Top:
    case ARROW_POSITION.Bottom:
      if (arrowAlign === ALIGMENT.Right) {
        return { right: `${arrowOffset}px`, left: 'auto' };
      }
      return { left: `${arrowOffset}px`, right: 'auto' };
    default:
      return {};
  }
};
