import * as React from 'react';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const FieldLabel = ({ className, ...restProps }) => {
  const mergedClassNames = getMergedClassNames(
    styles['field-label'],
    className
  );

  return <label className={mergedClassNames} {...restProps} />;
};

export default FieldLabel;
