import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import TextField from '../TextField';

const InputField = props => {
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
      id={id}
    >
      <Input
        {...restProps}
        fieldClassName={fieldClassName}
        id={id}
        error={error}
      />
    </TextField>
  );
};

InputField.propTypes = {
  labelText: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  inline: PropTypes.bool,
  type: PropTypes.string,
  error: PropTypes.string,
  description: PropTypes.string
};

InputField.defaultProps = {
  type: 'text'
};

export default InputField;
