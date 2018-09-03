import React from 'react';
import styles from './style.scss';
import getMergedClassNames from '../../../utils/getMergedClassNames';

const Label = ({ className, ...restProps }) => {
  const mergedClassNames = getMergedClassNames(styles.label, className);

  return <label className={mergedClassNames} {...restProps} />;
};

export default Label;
