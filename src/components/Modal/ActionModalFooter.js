import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'action-modal__footer';

const ActionModalFooter = props => {
  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    props.className
  );

  return <div className={mergedClassNames}>{props.children}</div>;
};

ActionModalFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default ActionModalFooter;
