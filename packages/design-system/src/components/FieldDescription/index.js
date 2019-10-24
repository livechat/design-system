import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const FieldDescription = ({ children, className }) => {
  const mergedClassNames = getMergedClassNames(
    styles['field-description'],
    className
  );

  return <span className={mergedClassNames}>{children}</span>;
};

FieldDescription.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default FieldDescription;
