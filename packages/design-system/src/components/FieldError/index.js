import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const FieldError = ({ children, className }) => {
  const mergedClassNames = getMergedClassNames(
    styles['field-error'],
    className
  );

  return <span className={mergedClassNames}>{children}</span>;
};

FieldError.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default FieldError;
