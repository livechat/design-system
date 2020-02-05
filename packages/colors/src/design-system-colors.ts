export const baseColors = {
  blue: '#0066FF',
  orange: '#FF5100',
  yellow: '#ffd000',
  gray: '#808189',
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
  blue100: '#d6e6ff',
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
  orange100: '#ffe3d6',
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
  yellow100: '#fff7d6',
  yellow50: '#fffae5'
};

const gray = {
  gray900: '#0f0f10',
  gray800: '#333336',
  gray700: '#46464b',
  gray600: '#606066',
  gray500: baseColors.gray,
  gray400: '#9fa0a6',
  gray300: '#b9b9be',
  gray200: '#cccccf',
  gray100: '#eaeaec',
  gray50: '#f2f2f3',
  gray40: '#f7f7f7',
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
  green100: '#dff6e9',
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
  red100: '#f8ded9',
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
  ruby100: '#fad8de',
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
