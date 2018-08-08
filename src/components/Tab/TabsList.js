import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.css';

const TabsList = ({ children }) => (
  <div className={styles.tabs__list}>{children}</div>
);

TabsList.propTypes = {
  children: PropTypes.node.isRequired
};

export default TabsList;
