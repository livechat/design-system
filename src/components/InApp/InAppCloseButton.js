import * as React from 'react';
import * as PropTypes from 'prop-types';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import styles from './style.scss';

const baseClass = 'inapp-base__close';

const InAppCloseButton = props => (
  <button
    title="Close inApp"
    className={styles[`${baseClass}`]}
    onClick={props.onClick}
  >
    <CloseIcon width="24px" height="24px" fill="#424D57" />
  </button>
);

InAppCloseButton.propTypes = {
  onClick: PropTypes.func
};

export default InAppCloseButton;
