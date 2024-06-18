import {
  getArrowPositionStyles,
  getArrowTokens,
  getIconType,
} from './Tooltip.helpers';

describe('getIconType', () => {
  it('should return correct icon type', () => {
    const typeUndefined = getIconType(undefined);
    const typeImportant = getIconType('important');
    const typeInvert = getIconType('invert');

    expect(typeUndefined).toBe('primary');
    expect(typeImportant).toBe('lock-black');
    expect(typeInvert).toBe('inverted');
  });
});

describe('getArrowPositionStyles', () => {
  it('should return correct styles for arrow position', () => {
    const arrowY = getArrowPositionStyles(undefined, undefined, 10);
    const arrowYWithOffset = getArrowPositionStyles(10, undefined, 10);
    const arrowX = getArrowPositionStyles(undefined, undefined, undefined, 10);
    const arrowXWithOffset = getArrowPositionStyles(
      undefined,
      10,
      undefined,
      10
    );
    const arrowUndefined = getArrowPositionStyles(
      undefined,
      undefined,
      undefined,
      undefined
    );

    expect(arrowY).toEqual({ top: 10 });
    expect(arrowYWithOffset).toEqual({ top: 20 });
    expect(arrowX).toEqual({ left: 10 });
    expect(arrowXWithOffset).toEqual({ left: 20 });
    expect(arrowUndefined).toBeUndefined();
  });
});

describe('getArrowTokens', () => {
  it('should return correct tokens for arrow', () => {
    const tokensUndefined = getArrowTokens(undefined);
    const tokensImportant = getArrowTokens('important');
    const tokensInvert = getArrowTokens('invert');

    expect(tokensUndefined).toEqual({
      stroke: 'var(--tooltip-border-for-svg)',
      fill: 'var(--tooltip-background-basic)',
    });
    expect(tokensImportant).toEqual({
      stroke: 'var(--surface-accent-emphasis-high-warning)',
      fill: 'var(--surface-accent-emphasis-high-warning)',
    });
    expect(tokensInvert).toEqual({
      stroke: 'var(--tooltip-background-invert)',
      fill: 'var(--tooltip-background-invert)',
    });
  });
});
