import * as React from 'react';
import * as PropTypes from 'prop-types';

import { IconSize, IconColor } from './constants';
import { generateIcon } from './helpers';

export const Icon = props => {
  const { icon, iconSize, iconColor, className, ...restProps } = props;

  const size = IconSize[iconSize];
  const color = IconColor[iconColor];
  const GeneratedIcon = generateIcon(icon, size, color);

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
  icon: PropTypes.func.isRequired,
  /**
   * Defines width and height of the icon
   */
  iconSize: PropTypes.oneOf(['XSmall', 'Small', 'Medium', 'Large', 'XLarge'])
    .isRequired,
  // iconColor: PropTypes.oneOf(Object.keys(IconColorName)),
  iconColor: PropTypes.oneOf([
    'IconColorPrimaryDefault',
    'IconColorPrimaryDisabled',
    'IconColorInvertedDefault',
    'IconColorInvertedDisabled',
    'IconColorLinkDefault',
    'IconColorLinkDisabled',
    'IconColorSuccessDefault',
    'IconColorWarningDefault',
    'IconColorErrorDefault'
  ]),
  className: PropTypes.string
};

export default Icon;
