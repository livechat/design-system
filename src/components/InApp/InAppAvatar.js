import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';

const baseClass = 'inapp__header__avatar';

const InAppAvatar = props => {
  const { src, alt, ...restProps } = props;
  return (
    <img
      className={styles[`${baseClass}`]}
      src={src}
      alt={alt}
      {...restProps}
    />
  );
};

InAppAvatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default InAppAvatar;
