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
   * Classname for the wrapper of the loader atoms (label and spinner).
   */
  className: PropTypes.string,
  /**
   * A brief description of the process.
   */
  label: PropTypes.string,
  /**
   * Label element classname.
   */
  labelClassName: PropTypes.string,
  /**
   * Spinner element classname.
   */
  spinnerClassName: PropTypes.string,
  /**
   * Spinner wrapper classname.
   */
  spinnerWrapperClassName: PropTypes.string,
  /**
   * You can unmount Loader when it's not necessary or use `isLoading` prop to control its visibility without unmounting.
   */
  isLoading: PropTypes.bool,
  /**
   * Changing primary color of spinner.
   */
  primaryColor: PropTypes.string,
  /**
   * Changing secondary color of spinner.
   */
  secondaryColor: PropTypes.string,
  /**
   * `Size` prop defines width and height of the wrapper and spinner thickness if it is not provided.
   * To define your custom size use css and `spinnerWrapperClassName` property (however, we recommend using defined size).
   */
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};
