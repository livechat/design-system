import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './style.scss';
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
    inline,
    ...restProps
  } = props;
  let filledColor = IconColorMapper[iconType];

  if (disabled) {
    filledColor = IconColorDisabledMapper[iconType];
  }

  const iconClassName =
    cx(className, {
      [styles['icon--inline']]: inline
    }) || null;

  const GeneratedIcon = React.createElement(source, {
    ...IconSize[size],
    fill: filledColor
  });

  return (
    <span {...restProps} className={iconClassName}>
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
  className: PropTypes.string,
  inline: PropTypes.bool
};

export default Icon;
