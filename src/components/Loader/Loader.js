import * as React from 'react';
import * as PropTypes from 'prop-types';
import { LoaderWrapper } from './LoaderWrapper';
import { LoaderSpinner } from './LoaderSpinner';
import { LoaderLabel } from './LoaderLabel';

export const Loader = props => {
  const {
    className,
    isLoading,
    label,
    spinnerClassName,
    spinnerWrapperClassName,
    labelClassName,
    primaryColor,
    secondaryColor,
    size,
    ...restProps
  } = props;

  return (
    <LoaderWrapper {...restProps} isLoading={isLoading} className={className}>
      <LoaderSpinner
        className={spinnerWrapperClassName}
        spinnerClassName={spinnerClassName}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        size={size}
      />
      {label && <LoaderLabel className={labelClassName}>{label}</LoaderLabel>}
    </LoaderWrapper>
  );
};

Loader.propTypes = {
  /**
   * It passes provided class name as `className` to `LoaderWrapper`.
   */
  className: PropTypes.string,
  /**
   * It passes provided node as `children` to `LoaderLabel`.
   */
  label: PropTypes.string,
  /**
   * It passes provided class name as `className` to `LoaderLabel`.
   */
  labelClassName: PropTypes.string,
  /**
   * It passes provided class name as `spinnerClassName` to `LoaderSpinner`.
   */
  spinnerClassName: PropTypes.string,
  /**
   * It passes provided class name as `className` to `LoaderSpinner`.
   */
  spinnerWrapperClassName: PropTypes.string,
  /**
   * You can unmount Loader when it's not necessary or use `isLoading` prop to control its visibility without unmounting.
   * It passes provided boolean as `isLoading` to `LoaderWrapper`.
   */
  isLoading: PropTypes.bool,
  /**
   * Changing primary color of spinner.
   * It passes provided color as `primaryColor` to `LoaderSpinner`.
   */
  primaryColor: PropTypes.string,
  /**
   * Changing secondary color of spinner.
   * It passes provided color as `secondaryColor` to `LoaderSpinner`.
   */
  secondaryColor: PropTypes.string,
  /**
   * `Size` prop defines width and height of the wrapper and spinner thickness if it is not provided.
   * To define your custom size use css and `spinnerWrapperClassName` property.
   * It passes provided `size` as `size` to `LoaderSpinner`.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};
