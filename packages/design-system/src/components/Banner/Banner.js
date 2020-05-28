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

const getIconByType = (type) => {
  switch(type) {
    case 'info':
      return <InformationOutlineIcon fill="#4384f5" width="20px" height="20px"/>;
    case 'warning':
      return <AlertIcon fill="#fb9d01" width="20px" height="20px"/>;
    case 'success':
      return <CheckCircleIcon fill="#38c776" width="20px" height="20px"/>;
    case 'error':
      return <BlockHelperIcon fill="#d64646" width="20px" height="20px"/>;
    default:
      return <AlertIcon fill="#fb9d01" width="20px" height="20px"/>;
  }
}

export const Banner = props => {
  const {
    className,
    onClose,
    size,
    text,
    type,
    ...restProps
  } = props;

  const mergedWrapperClassNames = getMergedClassNames(
    cx({
      [`${baseClass}__close`]: true,
      [`${baseClass}__content--${size}`]: size,
      [`${baseClass}__content--${size}--text`]: size,
      [`${baseClass}--wrapper--${type}`]: type,
      [`${baseClass}--wrapper`]: true,
      [`${baseClass}`]: true,
    }),
    className
  );

  return (
    <div className={mergedWrapperClassNames} {...restProps}>
      {
        onClose && <CloseIcon onClick={onClose} fill="#424d57" className={styles['banner--icon__close']} data-test="banner-close"/>
      }
      <div className={styles[`banner__content--${size}`]}>
        {getIconByType(type)}
        <p>{text}</p>
      </div>      
    </div>
  );
}

Banner.propTypes = {
  onClose: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'warning', 'success', 'error']),
};

Banner.defaultProps = {
  size: 'small',
  type: 'info',
};

export default Banner;
