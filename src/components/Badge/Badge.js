import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';

function Badge(props) {
  const badgeType = `badge--${props.type || 'primary'}`;

  return (
    <span className={`${styles.badge} ${styles[badgeType]}`}>
      {props.children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Type of badge
   */
  type: PropTypes.oneOf(['primary', 'light'])
};

export default Badge;
