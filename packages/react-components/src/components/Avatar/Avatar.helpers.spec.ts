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
  it('should return initials for a full name', () => {
    expect(getInitials('John Doe')).toBe('JD');
  });

  it('should return initials for a single name', () => {
    expect(getInitials('John')).toBe('J');
  });

  it('should handle empty names', () => {
    expect(getInitials('')).toBe('');
  });

  it('should limit the initials to the given count', () => {
    expect(getInitials('John Robert Doe Kavinsky', 3)).toBe('JRD');
  });

  it('should limit the initials based on default limit of 2', () => {
    expect(getInitials('John Robert Doe Kavinsky')).toBe('JR');
  });

  it('should convert initials to upper case', () => {
    expect(getInitials('john doe')).toBe('JD');
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
