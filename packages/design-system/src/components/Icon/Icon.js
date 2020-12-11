import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Icon = props => {
  const { className, size, ...restProps } = props;

  return (
    <div {...restProps} className={className}>
      <h1>Icon</h1>
      <p>Testing</p>
    </div>
  );
};

Icon.propTypes = {
  /**
   * Classname for the wrapper of the loader atoms (label and spinner).
   */
  className: PropTypes.string,
  /**
   * `Size` prop defines width and height of the wrapper and spinner thickness if it is not provided.
   * To define your custom size use css and `spinnerWrapperClassName` property (however, we recommend using defined size).
   */
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default Icon;
