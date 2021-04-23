import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';

import getMergedClassNames from '../../utils/getMergedClassNames';

import { Button } from '../Button';
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
      [`${baseClass}`]: true
    }),
    className
  );
  const shouldRenderLargeFooter = (buttonText || linkText) && size === 'large';
  const shouldRenderSmallOrMediumFooter =
    (buttonText || linkText) && size !== 'large';

  const footer = (
    <div className={styles[`${baseClass}__footer`]}>
      {buttonText && (
        <Button
          kind="primary"
          size="compact"
          onClick={onButtonClick}
          className={styles[`${baseClass}__button-text`]}
        >
          {buttonText}
        </Button>
      )}
      {linkText && (
        <Button size="compact" kind="text" onClick={onLinkClick}>
          {linkText}
        </Button>
      )}
    </div>
  );

  return (
    <div className={mergedWrapperClassNames} {...restProps}>
      <div className={styles[`${baseClass}__content`]}>
        {img && <img src={img} className={styles[`${baseClass}__img`]} />}
        <div className={styles[`${baseClass}__wrapper`]}>
          <div className={styles[`${baseClass}__header`]}>{header}</div>
          <div>{children}</div>
          {shouldRenderSmallOrMediumFooter && footer}
        </div>
        {shouldRenderLargeFooter && footer}
      </div>
      <button
        type="button"
        className={styles[`${baseClass}__close-icon`]}
        onClick={onClose}
      >
        <CloseIcon fill="#424d57" />
      </button>
    </div>
  );
};

Promo.propTypes = {
  className: PropTypes.string,
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
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Promo.defaultProps = {
  size: 'small'
};

export default Promo;
