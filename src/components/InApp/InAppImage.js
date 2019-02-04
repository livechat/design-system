import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';

const baseClass = 'inapp__image';

const InAppImage = props => {
  const { alt, ...restProps } = props;
  return (
    <div className={styles[`${baseClass}`]}>
      <img alt={alt || 'InApp Image'} {...restProps} />
    </div>
  );
};

InAppImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
};

export default InAppImage;
