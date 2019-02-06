import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const Loader = props => {
  const { className, strokeWidth, ...restProps } = props;

  const baseClass = 'loader';
  const mergedClassNames = getMergedClassNames(styles[baseClass], className);

  return (
    <div
      className={mergedClassNames}
      style={{ borderWidth: strokeWidth || '2px' }}
      {...restProps}
    />
  );
};

Loader.propTypes = {
  strokeWidth: PropTypes.string,
  className: PropTypes.string
};

export default Loader;
