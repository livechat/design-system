import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

const TabsWrapper = ({ children }) => (
  <div className={styles.tabs}>{children}</div>
);

TabsWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default TabsWrapper;
