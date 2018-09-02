import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

const FieldDescription = ({ children }) => (
  <span className={styles['field-description']}>{children}</span>
);

FieldDescription.propTypes = {
  children: PropTypes.node
};

export default FieldDescription;
