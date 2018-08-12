import { getTooltipPosition } from './helpers';
import { DIRECTION, ALIGMENT, ARROW_WIDTH, TOOLTIP_MARGIN } from './constants';

describe('Tooltip', () => {
  describe('Calculate tooltip position', () => {
    const tooltipRefRect = { left: 500, top: 500, width: 500, height: 500 };
    const tooltipBoxRefRect = { height: 200, width: 200 };

    const getPositionsFactory = (direction, align, offset) =>
      getTooltipPosition({
        direction,
        align,
        offset,
        tooltipRefRect,
        tooltipBoxRefRect
      });

    it('should return X and Y position equal 0 if direction is different then available in TooltipDirection', () => {
      const { tooltipXPosition, tooltipYPosition } = getPositionsFactory(
        null,
        ALIGMENT.Top,
        10
      );
      expect(tooltipXPosition).toEqual(0);
      expect(tooltipYPosition).toEqual(0);
    });

    it('should correct position for direction top', () => {
      const { tooltipXPosition, tooltipYPosition } = getPositionsFactory(
        DIRECTION.Top,
        ALIGMENT.Center,
        20
      );
      expect(tooltipXPosition).toEqual(650);
      expect(tooltipYPosition).toEqual(280);
    });

    it('should correct position for direction bottom', () => {
      const { tooltipXPosition, tooltipYPosition } = getPositionsFactory(
        DIRECTION.Bottom,
        ALIGMENT.Center,
        20
      );
      expect(tooltipXPosition).toEqual(650);
      expect(tooltipYPosition).toEqual(1020);
    });

    it('should correct position for direction left and align center', () => {
      const { tooltipXPosition, tooltipYPosition } = getPositionsFactory(
        DIRECTION.Left,
        ALIGMENT.Center,
        20
      );
      expect(tooltipXPosition).toEqual(280);
      expect(tooltipYPosition).toEqual(650);
    });

    it('should correct position for direction left and align top', () => {
      const { tooltipXPosition, tooltipYPosition } = getPositionsFactory(
        DIRECTION.Left,
        ALIGMENT.Top,
        20
      );
      expect(tooltipXPosition).toEqual(280);
      expect(tooltipYPosition).toEqual(500 - ARROW_WIDTH - TOOLTIP_MARGIN);
    });

    it('should correct position for direction right and align center', () => {
      const { tooltipXPosition, tooltipYPosition } = getPositionsFactory(
        DIRECTION.Right,
        ALIGMENT.Center,
        20
      );
      expect(tooltipXPosition).toEqual(1020);
      expect(tooltipYPosition).toEqual(650);
    });

    it('should correct position for direction right and align top', () => {
      const { tooltipXPosition, tooltipYPosition } = getPositionsFactory(
        DIRECTION.Right,
        ALIGMENT.Top,
        20
      );
      expect(tooltipXPosition).toEqual(1020);
      expect(tooltipYPosition).toEqual(500 - ARROW_WIDTH - TOOLTIP_MARGIN);
    });
  });
});
