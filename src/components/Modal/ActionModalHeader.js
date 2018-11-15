import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'action-modal';

const ActionModalHeader = props => {
  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}__header`],
    props.className
  );

  return (
    <div className={mergedClassNames}>
      <div className={styles[`${baseClass}__title`]}>{props.children}</div>
    </div>
  );
};

ActionModalHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default ActionModalHeader;
