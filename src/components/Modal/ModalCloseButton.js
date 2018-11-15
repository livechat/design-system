import * as React from 'react';
import * as PropTypes from 'prop-types';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import styles from './style.scss';

const baseClass = 'modal__close';

const ModalCloseButton = props => (
  <button
    title="Close modal"
    className={styles[`${baseClass}`]}
    onClick={props.onClick}
  >
    <CloseIcon width="24px" height="24px" fill="#424D57" />
  </button>
);

ModalCloseButton.propTypes = {
  onClick: PropTypes.func
};

export default ModalCloseButton;
