import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'popup-modal__title';

const PopupModalTitle = props => {
  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    props.className
  );

  return <h2 className={mergedClassNames}>{props.children}</h2>;
};

PopupModalTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default PopupModalTitle;
