import * as React from 'react';
import * as PropTypes from 'prop-types';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import styles from './style.scss';

const baseClass = 'inapp-base__close';

const InAppMessageCloseButton = props => (
  <div className={styles[`${baseClass}`]}>
    <button title="Close" onClick={props.onClick}>
      <CloseIcon width="24px" height="24px" fill="#424D57" />
    </button>
  </div>
);

InAppMessageCloseButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default InAppMessageCloseButton;
