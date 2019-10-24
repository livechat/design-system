import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import { THICKNESS_FROM_SIZE } from './constants';

const cx = classNames.bind(styles);

const baseClass = 'loader-spinner';

export const LoaderSpinner = props => {
  const {
    className,
    isLoading,
    size,
    primaryColor,
    secondaryColor,
    spinnerClassName,
    ...restProps
  } = props;

  const mergedWrapperClassNames = getMergedClassNames(
    cx({
      [`${baseClass}-wrapper`]: true,
      [`${baseClass}-wrapper--${size}`]: size,
      [`${baseClass}-wrapper--hidden`]: isLoading !== undefined && !isLoading
    }),
    className
  );

  const mergedSpinnerClassNames = getMergedClassNames(
    cx({
      [baseClass]: true,
      [`${baseClass}--${THICKNESS_FROM_SIZE[size]}`]:
        size && THICKNESS_FROM_SIZE[size]
    }),
    spinnerClassName
  );

  return (
    <div className={mergedWrapperClassNames} {...restProps}>
      <div
        className={mergedSpinnerClassNames}
        style={
          (primaryColor || secondaryColor) && {
            borderColor: secondaryColor,
            borderTopColor: primaryColor
          }
        }
      />
    </div>
  );
};

LoaderSpinner.propTypes = {
  className: PropTypes.string,
  spinnerClassName: PropTypes.string,
  isLoading: PropTypes.bool,
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};
