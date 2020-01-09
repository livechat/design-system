export const baseColors = {
  blue: '#0066FF',
  orange: '#FF5100',
  yellow: '#ffd000',
  gray: '#71758A',
  green: '#38C776',
  red: '#D93312',
  ruby: '#E30D34'
};

const blue = {
  blue900: '#000c1e',
  blue800: '#002866',
  blue700: '#00388c',
  blue600: '#004cbf',
  blue500: baseColors.blue,
  blue400: '#3f8cff',
  blue300: '#72aaff',
  blue200: '#99c1ff',
  blue100: '#cce0ff',
  blue50: '#e5efff'
};

const orange = {
  orange900: '#1e0900',
  orange800: '#662000',
  orange700: '#8c2c00',
  orange600: '#bf3c00',
  orange500: baseColors.orange,
  orange400: '#ff7c3f',
  orange300: '#ff9f72',
  orange200: '#ffb999',
  orange100: '#ffdccc',
  orange50: '#ffede5'
};

const yellow = {
  yellow900: '#1e1800',
  yellow800: '#665300',
  yellow700: '#8c7200',
  yellow600: '#bf9c00',
  yellow500: baseColors.yellow,
  yellow400: '#ffdb3f',
  yellow300: '#ffe572',
  yellow200: '#ffec99',
  yellow100: '#fff5cc',
  yellow50: '#fffae5'
};

const gray = {
  gray900: '#0d0e10',
  gray800: '#2d2e37',
  gray700: '#3e404b',
  gray600: '#545767',
  gray500: baseColors.gray,
  gray400: '#9497a7',
  gray300: '#b0b3be',
  gray200: '#c6c7d0',
  gray100: '#e2e3e7',
  gray50: '#f0f1f3',
  gray40: '#f6f6f7',
  gray30: '#fcfcfc'
};

const green = {
  green900: '#06170e',
  green800: '#164f2f',
  green700: '#1e6d40',
  green600: '#2a9558',
  green500: baseColors.green,
  green400: '#69d598',
  green300: '#91e0b3',
  green200: '#afe8c8',
  green100: '#d7f3e3',
  green50: '#ebf9f1'
};

const red = {
  red900: '#1a0602',
  red800: '#561407',
  red700: '#771c09',
  red600: '#a2260d',
  red500: baseColors.red,
  red400: '#e2664d',
  red300: '#ea8e7c',
  red200: '#efada0',
  red100: '#f7d6cf',
  red50: '#fbeae7'
};

const ruby = {
  ruby900: '#1b0106',
  ruby800: '#5a0514',
  ruby700: '#7c071c',
  ruby600: '#aa0927',
  ruby500: baseColors.ruby,
  ruby400: '#ea4966',
  ruby300: '#ef798f',
  ruby200: '#f39ead',
  ruby100: '#f9ced6',
  ruby50: '#fce6ea'
};

export default {
  ...blue,
  ...yellow,
  ...orange,
  ...green,
  ...red,
  ...ruby,
  ...gray
};
