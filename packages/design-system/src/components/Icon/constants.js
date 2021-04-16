export const IconSizeName = {
  XSmall: 'XSmall',
  Small: 'Small',
  Medium: 'Medium',
  Large: 'Large',
  XLarge: 'XLarge'
};

export const IconSize = {
  [IconSizeName.XSmall]: {
    width: 16,
    height: 16
  },
  [IconSizeName.Small]: {
    width: 20,
    height: 20
  },
  [IconSizeName.Medium]: {
    width: 24,
    height: 24
  },
  [IconSizeName.Large]: {
    width: 32,
    height: 32
  },
  [IconSizeName.XLarge]: {
    width: 48,
    height: 48
  }
};

export const IconTypeName = {
  Primary: 'primary',
  Inverted: 'inverted',
  Link: 'link',
  Success: 'success',
  Warning: 'warning',
  Error: 'error'
};

export const IconColorMapper = {
  [IconTypeName.Primary]: '#424d57',
  [IconTypeName.Inverted]: '#fff',
  [IconTypeName.Link]: '#4384f5',
  [IconTypeName.Success]: '#4bb678',
  [IconTypeName.Warning]: '#efa842',
  [IconTypeName.Error]: '#d64646'
};

export const IconColorDisabledMapper = {
  [IconTypeName.Primary]: '#686d72',
  [IconTypeName.Inverted]: '#dbdbdb',
  [IconTypeName.Link]: '#c3d7fa',
  [IconTypeName.Success]: '#4bb678',
  [IconTypeName.Warning]: '#efa842',
  [IconTypeName.Error]: '#d64646'
};
