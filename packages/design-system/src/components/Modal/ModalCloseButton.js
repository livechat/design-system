import * as React from 'react';
import * as PropTypes from 'prop-types';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import styles from './style.scss';

const baseClass = 'modal-base__close';

const ModalCloseButton = props => (
  <button
    title="Close modal"
    className={styles[`${baseClass}`]}
    onClick={props.onClick}
    type="button"
  >
    <CloseIcon width="24px" height="24px" fill="#424D57" />
  </button>
);

ModalCloseButton.propTypes = {
  onClick: PropTypes.func
};

export default ModalCloseButton;
