import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import getMergedClassNames from '../../utils/getMergedClassNames';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';

import styles from './style.scss';
import { BannerIcon } from './BannerIcon';

const cx = classNames.bind(styles);

const baseClass = 'banner';

export const Banner = props => {
  const {
    children,
    className,
    onClose,
    size,
    text,
    type,
    ...restProps
  } = props;

  const mergedWrapperClassNames = getMergedClassNames(
    cx({
      [`${baseClass}--${type}`]: type,
      [`${baseClass}--${size}`]: size,
      [`${baseClass}`]: true,
    }),
    className
  );

  return (
    <div className={mergedWrapperClassNames} {...restProps}>
      <div className={styles[`${baseClass}__content`]}>
        <BannerIcon type={type} />
        <div className={styles[`${baseClass}__content-text`]}>{children}</div>
      </div>
      {onClose && <CloseIcon onClick={onClose} fill="#424d57" className={styles[`${baseClass}__close-icon`]}/>}
    </div>
  );
}

Banner.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['info', 'warning', 'success', 'error']).isRequired,
};

Banner.defaultProps = {
  size: 'small',
  type: 'info',
};

export default Banner;
