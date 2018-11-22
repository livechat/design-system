import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';

const TabsList = ({ children }) => (
  <div className={styles.tabs__list}>{children}</div>
);

TabsList.propTypes = {
  children: PropTypes.node.isRequired
};

export default TabsList;
