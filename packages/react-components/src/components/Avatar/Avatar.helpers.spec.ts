import {
  getFontColor,
  getInitials,
  getBackgroundColor,
} from './Avatar.helpers';

describe('getBackgroundColor', () => {
  it('should generate the same background color for the same initials', () => {
    const color1 = getBackgroundColor('JD');
    const color2 = getBackgroundColor('JD');
    expect(color1).toBe(color2);
  });

  it('should generate different background colors for different initials', () => {
    const color1 = getBackgroundColor('JD');
    const color2 = getBackgroundColor('AB');
    expect(color1).not.toBe(color2);
  });

  it('should handle empty initials and return undefined', () => {
    const color = getBackgroundColor('');
    expect(color).toBeUndefined();
  });
});

describe('getInitials', () => {
  it('should return the first letter of a single word name', () => {
    expect(getInitials('John')).toBe('J');
  });

  it('should return the first and last initials for a two word name', () => {
    expect(getInitials('John Doe')).toBe('JD');
  });

  it('should return the first and last initials for a multi-word name', () => {
    expect(getInitials('John Michael Doe')).toBe('JD');
  });

  it('should return the first, second last, and last initials for a multi-word name, ignoring the middle names', () => {
    expect(getInitials('John Doe Robert Stan Kavinsky', 3)).toBe('JSK');
  });

  it('should handle change to upper-case', () => {
    expect(getInitials('john doe')).toBe('JD');
  });

  it('should handle empty input', () => {
    expect(getInitials('')).toBe('');
  });

  it('should handle undefined input', () => {
    expect(getInitials(undefined)).toBe('');
  });

  it('should handle count less than 1', () => {
    expect(getInitials('John Doe', 0)).toBe('');
  });
});

describe('getFontColor', () => {
  let originalGetComputedStyle: Window['getComputedStyle'];

  beforeAll(() => {
    originalGetComputedStyle = window.getComputedStyle;

    (window.getComputedStyle as any) = function () {
      return {
        getPropertyValue(variableName: string) {
          if (variableName === '--some-color-variable') return '#000000';
          if (variableName === '--another-color-variable') return '#FFFFFF';
          return '';
        },
      };
    };
  });

  afterAll(() => {
    window.getComputedStyle = originalGetComputedStyle;
  });

  it('should return white for dark background', () => {
    expect(getFontColor('#000000')).toEqual('var(--color-white)');
  });

  it('should return black for light background', () => {
    expect(getFontColor('#FFFFFF')).toEqual('var(--color-black)');
  });

  it('should resolve CSS variables and return appropriate color', () => {
    expect(getFontColor('var(--some-color-variable)')).toEqual(
      'var(--color-white)'
    );
  });

  it('should handle another CSS variables and return appropriate color', () => {
    expect(getFontColor('var(--another-color-variable)')).toEqual(
      'var(--color-black)'
    );
  });

  it('should handle CSS variables that do not exist and throw error', () => {
    expect(getFontColor('var(--nonexistent-variable)')).toEqual(
      'var(--color-black)'
    );
  });
});
