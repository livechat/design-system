import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './style.scss';

const baseClass = 'icon';

export const Icon = props => {
  const { className, size = 'medium', icon, ...restProps } = props;

  const sizeClassName = size
    ? styles[`${baseClass}__${size}`]
    : styles[`${baseClass}__medium`];

  return (
    <div {...restProps} className={className}>
      <div className={sizeClassName}>{icon}</div>
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
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  icon: PropTypes.node.isRequired
};

export default Icon;
