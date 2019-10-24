import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'modal__footer';

const ModalFooter = props => {
  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    props.className
  );

  return <div className={mergedClassNames}>{props.children}</div>;
};

ModalFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default ModalFooter;
