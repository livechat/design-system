import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import getMergedClassNames from '../../utils/getMergedClassNames';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import AlertIcon from 'react-material-icon-svg/dist/AlertIcon';
import InformationOutlineIcon from 'react-material-icon-svg/dist/InformationOutlineIcon';
import BlockHelperIcon from 'react-material-icon-svg/dist/BlockHelperIcon';
import CheckCircleIcon from 'react-material-icon-svg/dist/CheckCircleIcon';

import styles from './style.scss';

const cx = classNames.bind(styles);

const baseClass = 'banner';

export const Banner = props => {
  const {
    className,
    closeIcon,
    onClose,
    size,
    text,
    type,
    ...restProps
  } = props;

  const mergedWrapperClassNames = getMergedClassNames(
    cx({
      [`${baseClass}--close`]: true,
      [`${baseClass}--content--${size}`]: size,
      [`${baseClass}--content`]: true,
      [`${baseClass}--text--${size}`]: size,
      [`${baseClass}--wrapper--${type}`]: true,
      [`${baseClass}--wrapper`]: true,
      [`${baseClass}`]: true,
    }),
    className
  );

  const getIconByType = (type) => {
    switch(type) {
      case 'info':
        return <InformationOutlineIcon fill="#4384f5" className={styles['banner-icon']} width="20px" height="20px"/>;
      case 'warning':
        return <AlertIcon fill="#fb9d01" className={styles['banner-icon']} width="20px" height="20px"/>;
      case 'success':
        return <CheckCircleIcon fill="#38c776" className={styles['banner-icon']} width="20px" height="20px"/>;
      case 'error':
        return <BlockHelperIcon fill="#d64646" className={styles['banner-icon']} width="20px" height="20px"/>;
      default:
        return <AlertIcon fill="#fb9d01" className={styles['banner-icon']} width="20px" height="20px"/>;
    }
  }

  return (
    <div className={mergedWrapperClassNames} {...restProps}>
      {
        closeIcon && <CloseIcon onClick={onClose} fill="#424d57" className={styles['banner--icon-close']} data-test="banner-close"/>
      }
      <div className={styles[`banner--content--${size}`]}>
        {getIconByType(type)}
        <p className={styles[`banner--text--${size}`]}>{text}</p>
      </div>      
    </div>
  );
}

Banner.propTypes = {
  closeIcon: PropTypes.bool,
  onClose: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'warning', 'success', 'error']),
};

Banner.defaultProps = {
  closeIcon: false,
  size: 'small',
  type: 'info',
};

export default Banner;
