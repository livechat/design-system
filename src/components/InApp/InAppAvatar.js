import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';

const baseClass = 'inapp__header__avatar';

const InAppAvatar = props => (
  <img className={styles[`${baseClass}`]} src={props.src} alt={props.alt} />
);

InAppAvatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default InAppAvatar;
