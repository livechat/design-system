import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'popup-modal__content';

const PopupModalContent = props => {
  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    props.className
  );

  return <div className={mergedClassNames}>{props.children}</div>;
};

PopupModalContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default PopupModalContent;
