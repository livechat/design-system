import * as React from 'react';
import * as PropTypes from 'prop-types';

import { IconSize, IconColor, IconColorDisabledMapper } from './constants';

export const Icon = props => {
  const { source, size, color, disabled, className, ...restProps } = props;
  let filledColor = color ? IconColor[color] : 'inherit';

  if (color && disabled) {
    filledColor = IconColorDisabledMapper[color];
  }

  const GeneratedIcon = React.createElement(source, {
    ...IconSize[size],
    fill: filledColor
  });

  return (
    <span {...restProps} className={className}>
      {GeneratedIcon}
    </span>
  );
};

Icon.propTypes = {
  /**
   * Icon passed in svg format
   */
  source: PropTypes.func.isRequired,
  /**
   * Defines width and height of the icon
   */
  size: PropTypes.oneOf(['XSmall', 'Small', 'Medium', 'Large', 'XLarge'])
    .isRequired,
  /**
   * Adjusts color of the icon (if passed)
   */
  disabled: PropTypes.bool,
  color: PropTypes.oneOf([
    'IconColorPrimaryDefault',
    'IconColorInvertedDefault',
    'IconColorLinkDefault',
    'IconColorSuccessDefault',
    'IconColorWarningDefault',
    'IconColorErrorDefault'
  ]),
  className: PropTypes.string
};

export default Icon;
