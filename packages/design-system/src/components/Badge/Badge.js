import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './style.scss';

function Badge({ children, className: extraClassName, secondary, ...props }) {
  const className = cx(styles.badge, {
    [styles['badge--secondary']]: secondary,
    ...(extraClassName ? {[extraClassName]: true} : {})
  });

  return (
    <span className={className} {...props}>
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  secondary: PropTypes.bool
};

export default Badge;
