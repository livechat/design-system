import * as React from 'react';
import * as PropTypes from 'prop-types';

import { IconSize, IconSizeName } from './constants';
import { generateIcon, generateIconFromRequire } from './helpers';

const ToolSvgIcon = require('./tool.svg').default;

export const Icon = props => {
  const {
    icon,
    iconColor,
    iconSize = IconSizeName.Large,
    className,
    ...restProps
  } = props;

  const iconSizeDimensions = IconSize[IconSizeName.Small];
  const iconSizeDimensions2 = IconSize[iconSize];

  console.log(
    '!!! Icon from props | require: ',
    typeof icon,
    typeof ToolSvgIcon
  );

  // How to handle different imports of svgs
  // What if someone will pass require / icon / component as svg
  const IconFromProps = generateIcon(icon, iconSizeDimensions, iconColor);
  const IconFromRequire = generateIconFromRequire(
    ToolSvgIcon,
    iconSizeDimensions2,
    'lightblue'
  );

  return (
    <div {...restProps} className={className}>
      {IconFromProps}
      {IconFromRequire}
      <ToolSvgIcon width="48px" height="48px" fill="lightgreen" />
    </div>
  );
};

Icon.propTypes = {
  /**
   * Class for the wrapper of the icon
   */
  className: PropTypes.string,
  /**
   * `Size` prop defines width and height of the wrapper icon
   */
  iconSize: PropTypes.oneOf(['small', 'medium', 'large']),
  iconColor: PropTypes.string,

  // icon: PropTypes.node.isRequired,
  icon: PropTypes.any.isRequired
};

export default Icon;
