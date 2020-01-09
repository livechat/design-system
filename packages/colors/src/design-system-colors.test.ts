import { tint, shade } from 'polished';
import { pipe } from 'ramda';
import Colors, { baseColors } from './design-system-colors';

type KeyMap<T> = { [key: string]: T };

const colorTintCreators = {
  30: pipe(tint(0.98)),
  40: pipe(tint(0.94)),
  50: pipe(tint(0.9)),
  100: pipe(tint(0.8)),
  200: pipe(tint(0.6)),
  300: pipe(tint(0.45)),
  400: pipe(tint(0.25)),
  500: (colorValue: string) => colorValue,
  600: pipe(shade(0.25)),
  700: pipe(shade(0.45)),
  800: pipe(shade(0.6)),
  900: pipe(shade(0.88))
};

const commonCreators = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900'
];

const makeColorPalette = (
  colorName: string,
  creatorsNames: string[] = commonCreators
): KeyMap<string> => {
  const baseColor = baseColors[colorName as keyof typeof baseColors];
  return creatorsNames.reduce((acc: KeyMap<string>, creatorName: unknown) => {
    acc[`${colorName}${creatorName}`] = colorTintCreators[
      creatorName as keyof typeof colorTintCreators
    ](baseColor);
    return acc;
  }, {});
};

const generatedColors = {
  ...makeColorPalette('blue'),
  ...makeColorPalette('orange'),
  ...makeColorPalette('yellow'),
  ...makeColorPalette('gray', ['30', '40', ...commonCreators]),
  ...makeColorPalette('green'),
  ...makeColorPalette('red'),
  ...makeColorPalette('ruby')
};

describe('Colors validation', () => {
  Object.keys(Colors).forEach(colorTintName => {
    const color = Colors[colorTintName as keyof typeof Colors];
    const generatedColor =
      generatedColors[colorTintName as keyof typeof generatedColors];
    it(`${colorTintName} (${color}) should be equal it generated value (${generatedColor})`, () => {
      expect(color).toBe(generatedColor);
    });
  });

  it('colors count should be equal count of generated colors', () => {
    expect(Object.keys(Colors).length).toBe(
      Object.keys(generatedColors).length
    );
  });
});
