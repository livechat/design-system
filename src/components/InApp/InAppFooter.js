import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'inapp__footer';

const InAppFooter = props => {
  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    props.className
  );

  return <div className={mergedClassNames}>{props.children}</div>;
};

InAppFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default InAppFooter;
