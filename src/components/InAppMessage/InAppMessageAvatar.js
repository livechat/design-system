import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';

const baseClass = 'inapp__header__avatar';

const InAppMessageAvatar = props => {
  const { alt, ...restProps } = props;
  return (
    <img
      className={styles[`${baseClass}`]}
      alt={alt || 'Avatar'}
      {...restProps}
    />
  );
};

InAppMessageAvatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default InAppMessageAvatar;
