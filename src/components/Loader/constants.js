export const THICKNESS = {
  thin: 'thin',
  medium: 'medium',
  thick: 'thick'
};

export const SIZE = {
  small: 'small',
  medium: 'medium',
  large: 'large'
};

export const BAR_DIRECTIONS = {
  vertical: 'vertical',
  horizontal: 'horizontal'
};

export const THICKNESS_FROM_SIZE = {
  [SIZE.small]: THICKNESS.thin,
  [SIZE.medium]: THICKNESS.medium,
  [SIZE.large]: THICKNESS.thick
};
