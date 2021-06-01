export const IconSizeName = {
  XSmall: 'xsmall',
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
  XLarge: 'xlarge'
};

export const IconSize = {
  [IconSizeName.XSmall]: {
    width: 12,
    height: 12
  },
  [IconSizeName.Small]: {
    width: 16,
    height: 16
  },
  [IconSizeName.Medium]: {
    width: 20,
    height: 20
  },
  [IconSizeName.Large]: {
    width: 24,
    height: 24
  },
  [IconSizeName.XLarge]: {
    width: 32,
    height: 32
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
