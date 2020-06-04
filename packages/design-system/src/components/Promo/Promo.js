import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { Button } from '../Button';

import getMergedClassNames from '../../utils/getMergedClassNames';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';

import styles from './style.scss';

const cx = classNames.bind(styles);

const baseClass = 'promo';

export const Promo = props => {
  const {
    buttonText,
    children,
    className,
    header,
    image,
    light,
    linkText,
    onButtonClick,
    onClose,
    onLinkClick,
    size,
    img,
    ...restProps
  } = props;

  const mergedWrapperClassNames = getMergedClassNames(
    cx({
      [`${baseClass}--light`]: light,
      [`${baseClass}--${size}`]: size,
      [`${baseClass}`]: true,
    }),
    className
  );
  const shouldRenderFooter = buttonText || linkText;

  return (
    <div className={mergedWrapperClassNames} {...restProps}>
      <div className={styles[`${baseClass}__content`]}>
        <img src={img} className={styles[`${baseClass}__content-img`]} />
        <div className={styles[`${baseClass}__content-wrapper`]}>
          <div className={styles[`${baseClass}__content-header`]}>{header}</div>
          <div>{children}</div>
        </div>
      </div>
      {shouldRenderFooter && (
        <div className={styles[`${baseClass}__content-footer`]}>
            {buttonText && <Button primary onClick={onButtonClick} className={styles[`${baseClass}__content-footer-button`]}>{buttonText}</Button>}
            {linkText && <Button primary onClick={onLinkClick}>{linkText}</Button>}
        </div>)
      }
      <CloseIcon onClick={onClose} fill="#424d57" className={styles[`${baseClass}__close-icon`]}/>
    </div>
  );
}

Promo.propTypes = {
  buttonText: PropTypes.string,
  children: PropTypes.node.isRequired,
  header: PropTypes.string.isRequired,
  image: PropTypes.node,
  img: PropTypes.string,
  light: PropTypes.bool,
  linkText: PropTypes.string,
  onButtonClick: PropTypes.func,
  onClose: PropTypes.func,
  onLinkClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Promo.defaultProps = {
  size: 'small',
  img: "https://via.placeholder.com/100"
};

export default Promo;
