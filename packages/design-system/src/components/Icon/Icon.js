import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  IconSize,
  IconSizeName,
  IconTypeName,
  IconColorMapper,
  IconColorDisabledMapper
} from './constants';

export const Icon = props => {
  const {
    source,
    size = IconSizeName.Medium,
    iconType = IconTypeName.Primary,
    disabled,
    className,
    ...restProps
  } = props;
  let filledColor = IconColorMapper[iconType];

  if (disabled) {
    filledColor = IconColorDisabledMapper[iconType];
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
   * Icon passed in svg format ie. `source={require('svg_icon')}
   */
  source: PropTypes.func.isRequired,
  /**
   * Defines width and height of the icon
   */
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  /**
   * Adjusts color of the icon (if passed)
   */
  disabled: PropTypes.bool,
  iconType: PropTypes.oneOf([
    'primary',
    'inverted',
    'link',
    'success',
    'warning',
    'error'
  ]),
  className: PropTypes.string
};

export default Icon;
