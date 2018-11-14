import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'action-modal__body';

const ModalBody = props => {
  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    props.className
  );

  return <div className={mergedClassNames}>{props.children}</div>;
};

ModalBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default ModalBody;
