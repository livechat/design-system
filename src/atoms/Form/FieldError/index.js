import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

const FieldError = ({ children }) => (
  <span className={styles['field-error']}>{children}</span>
);

FieldError.propTypes = {
  children: PropTypes.node
};

export default FieldError;
