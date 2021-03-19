import * as React from 'react';
import * as PropTypes from 'prop-types';

import { IconSize, IconColor } from './constants';

export const Icon = props => {
  const { source, size, color, className, ...restProps } = props;

  const GeneratedIcon = React.createElement(source, {
    ...IconSize[size],
    fill: IconColor[color] || 'inherit'
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
  color: PropTypes.oneOf([
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
