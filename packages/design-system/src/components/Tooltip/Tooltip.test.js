import { getTooltipPosition } from './helpers';
import { DIRECTION, ALIGMENT, TOOLTIP_MARGIN } from '../../constants/tooltip';

describe('Tooltip', () => {
  describe('Calculate tooltip position', () => {
    const tooltipRefRect = {
      left: 500,
      right: 500,
      top: 500,
      width: 500,
      height: 500
    };
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

    describe('for direction top', () => {
      it('should return correct position when alignment is center', () => {
        const { tooltipXPosition, tooltipYPosition } = getPositionsFactory(
          DIRECTION.Top,
          ALIGMENT.Center,
          20
        );
        expect(tooltipXPosition).toEqual(650);
        expect(tooltipYPosition).toEqual(280);
      });

      it('should return correct position when alignment is left', () => {
        const { tooltipXPosition, tooltipYPosition } = getPositionsFactory(
          DIRECTION.Top,
          ALIGMENT.Left,
          20
        );
        expect(tooltipXPosition).toEqual(500 - TOOLTIP_MARGIN);
        expect(tooltipYPosition).toEqual(280);
      });

      it('should return correct position when alignment right', () => {
        const { tooltipXPosition, tooltipYPosition } = getPositionsFactory(
          DIRECTION.Top,
          ALIGMENT.Right,
          20
        );
        expect(tooltipXPosition).toEqual(800 + TOOLTIP_MARGIN);
        expect(tooltipYPosition).toEqual(280);
      });
    });

    describe('for direction bottom', () => {
      it('should return correct position when alignment is center', () => {
        const { tooltipXPosition, tooltipYPosition } = getPositionsFactory(
          DIRECTION.Bottom,
          ALIGMENT.Center,
          20
        );
        expect(tooltipXPosition).toEqual(650);
        expect(tooltipYPosition).toEqual(1020);
      });

      it('should return correct position when alignment is left', () => {
        const { tooltipXPosition, tooltipYPosition } = getPositionsFactory(
          DIRECTION.Bottom,
          ALIGMENT.Left,
          20
        );
        expect(tooltipXPosition).toEqual(500 - TOOLTIP_MARGIN);
        expect(tooltipYPosition).toEqual(1020);
      });

      it('should return correct position when alignment right', () => {
        const { tooltipXPosition, tooltipYPosition } = getPositionsFactory(
          DIRECTION.Bottom,
          ALIGMENT.Right,
          20
        );
        expect(tooltipXPosition).toEqual(800 + TOOLTIP_MARGIN);
        expect(tooltipYPosition).toEqual(1020);
      });
    });

    describe('for direction left', () => {
      it('should return correct position when alignment is center', () => {
        const { tooltipXPosition, tooltipYPosition } = getPositionsFactory(
          DIRECTION.Left,
          ALIGMENT.Center,
          20
        );
        expect(tooltipXPosition).toEqual(280);
        expect(tooltipYPosition).toEqual(650);
      });

      it('should return correct position when alignment is top', () => {
        const { tooltipXPosition, tooltipYPosition } = getPositionsFactory(
          DIRECTION.Left,
          ALIGMENT.Top,
          20
        );
        expect(tooltipXPosition).toEqual(280);
        expect(tooltipYPosition).toEqual(500 - TOOLTIP_MARGIN);
      });

      it('should return correct position when alignment bottom', () => {
        const { tooltipXPosition, tooltipYPosition } = getPositionsFactory(
          DIRECTION.Left,
          ALIGMENT.Bottom,
          20
        );
        expect(tooltipXPosition).toEqual(280);
        expect(tooltipYPosition).toEqual(800 + TOOLTIP_MARGIN);
      });
    });

    describe('for direction right', () => {
      it('should return correct position when alignment is center', () => {
        const { tooltipXPosition, tooltipYPosition } = getPositionsFactory(
          DIRECTION.Right,
          ALIGMENT.Center,
          20
        );
        expect(tooltipXPosition).toEqual(1020);
        expect(tooltipYPosition).toEqual(650);
      });

      it('should return correct position when alignment is top', () => {
        const { tooltipXPosition, tooltipYPosition } = getPositionsFactory(
          DIRECTION.Right,
          ALIGMENT.Top,
          20
        );
        expect(tooltipXPosition).toEqual(1020);
        expect(tooltipYPosition).toEqual(500 - TOOLTIP_MARGIN);
      });

      it('should return correct position when alignment bottom', () => {
        const { tooltipXPosition, tooltipYPosition } = getPositionsFactory(
          DIRECTION.Right,
          ALIGMENT.Bottom,
          20
        );
        expect(tooltipXPosition).toEqual(1020);
        expect(tooltipYPosition).toEqual(800 + TOOLTIP_MARGIN);
      });
    });
  });
});
