import * as React from 'react';
import * as PropTypes from 'prop-types';

import IconTest from './chats.svg';

import styles from './style.scss';

const baseClass = 'icon';

export const Icon = props => {
  const { className, size, icon, ...restProps } = props;

  return (
    <div {...restProps} className={className}>
      <div className={styles[`${baseClass}__small`]}>
        <IconTest fill="#d56767" />
      </div>
      <div className={styles[`${baseClass}__medium`]}>
        <IconTest fill="#d56767" />
      </div>
      <div className={styles[`${baseClass}__large`]}>
        <IconTest fill="#d56767" />
      </div>
      <div className={styles[`${baseClass}__xlarge`]}>
        <IconTest fill="#d56767" />
      </div>
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
  icon: PropTypes.node
};

export default Icon;
