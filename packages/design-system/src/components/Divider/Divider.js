import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';

import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'divider';

const Divider = props => {
  const { className, ...restProps } = props;
  const mergedClassNames = getMergedClassNames(styles[baseClass], className);

  return <div className={mergedClassNames} {...restProps} />;
};

Divider.propTypes = {
  className: PropTypes.string
};

export default Divider;
