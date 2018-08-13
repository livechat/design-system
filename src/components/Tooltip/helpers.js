import { DIRECTION, ALIGMENT, TOOLTIP_MARGIN } from './constants';

export const getTooltipPosition = opts => {
  const { direction, align, offset, tooltipRefRect, tooltipBoxRefRect } = opts;

  let tooltipXPosition;
  let tooltipYPosition;

  switch (direction) {
    case DIRECTION.Top:
      tooltipXPosition =
        tooltipRefRect.left +
        (tooltipRefRect.width / 2 - tooltipBoxRefRect.width / 2);
      tooltipYPosition = tooltipRefRect.top - tooltipBoxRefRect.height - offset;
      break;

    case DIRECTION.Bottom:
      tooltipYPosition = tooltipRefRect.top + tooltipRefRect.height + offset;
      tooltipXPosition =
        tooltipRefRect.left +
        (tooltipRefRect.width / 2 - tooltipBoxRefRect.width / 2);
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
