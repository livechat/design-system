import * as React from 'react';
import * as PropTypes from 'prop-types';

import { generateIcon, generateIconFromRequire } from './helpers';
import styles from './style.scss';

const Tool = require('./tool.svg').default;

const baseClass = 'icon';

export const Icon = props => {
  const { className, size = 'medium', icon, ...restProps } = props;

  const sizeClassName = size
    ? styles[`${baseClass}__${size}`]
    : styles[`${baseClass}__medium`];

  const IconFromProps = generateIcon(icon);
  const ToolIcon = generateIconFromRequire(Tool);

  return (
    <div {...restProps} className={className}>
      <Tool width="24px" height="24px" fill="green" />
      {IconFromProps}
      {ToolIcon}
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
  // icon: PropTypes.node.isRequired
  icon: PropTypes.any.isRequired
};

export default Icon;
