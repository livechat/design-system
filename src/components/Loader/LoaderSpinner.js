import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import { THICKNESS } from './constants';

const cx = classNames.bind(styles);

const baseClass = 'loader__spinner';

export const LoaderSpinner = props => {
  const {
    className,
    thickness,
    primaryColor,
    secondaryColor,
    style,
    ...restProps
  } = props;

  const mergedClassNames = getMergedClassNames(
    cx(baseClass, `${baseClass}--${thickness || THICKNESS.medium}`),
    className
  );

  return (
    <div
      className={mergedClassNames}
      style={{
        borderColor: secondaryColor,
        borderTopColor: primaryColor,
        ...(style || {})
      }}
      {...restProps}
    />
  );
};

LoaderSpinner.propTypes = {
  className: PropTypes.string,
  /**
   * Changing primary color of spinner
   */
  primaryColor: PropTypes.string,
  /**
   * Changing secondary color of spinner
   */
  secondaryColor: PropTypes.string,
  style: PropTypes.object,
  /**
   * Thickness prop defines width of spinner stroke (border-width). To define you custom thickness use css and className property
   */
  thickness: PropTypes.oneOf(['thin', 'medium', 'thick'])
};
