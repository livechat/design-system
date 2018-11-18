import React from 'react';
import PropTypes from 'prop-types';
import NumericInput from './NumericInput';
import TextField from '../TextField';

const NumericInputField = props => {
  const {
    inline,
    error,
    description,
    labelText,
    className,
    id,
    fieldClassName,
    ...restProps
  } = props;

  return (
    <TextField
      inline={inline}
      error={error}
      description={description}
      labelText={labelText}
      className={className}
      htmlFor={id}
    >
      <NumericInput
        {...restProps}
        className={fieldClassName}
        id={id}
        error={error}
      />
    </TextField>
  );
};

NumericInputField.propTypes = {
  labelText: PropTypes.string,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  inline: PropTypes.bool,
  error: PropTypes.string,
  description: PropTypes.node
};

export default NumericInputField;
