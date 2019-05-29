import * as React from 'react';
import styles from './style.scss';

import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'divider';

const Divider = props => {
  const { className, ...restProps } = props;
  const mergedClassNames = getMergedClassNames(styles[baseClass], className);

  return <div className={mergedClassNames} {...restProps} />;
};

export default Divider;
