import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './style.scss';

const TabsList = ({ children, className, ...restProps }) => (
  <div
    {...restProps}
    className={cx(styles.tabs__list, { [className]: className })}
  >
    {children}
  </div>
);

TabsList.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default TabsList;
