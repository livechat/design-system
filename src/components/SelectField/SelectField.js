import * as React from 'react';
import * as PropTypes from 'prop-types';
import Select from './Select';
import TextField from '../TextField';

const SelectField = props => {
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
      <Select {...restProps} className={fieldClassName} id={id} error={error} />
    </TextField>
  );
};

SelectField.propTypes = {
  labelText: PropTypes.string,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  fieldClassName: PropTypes.string,
  inline: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  description: PropTypes.node
};

export default SelectField;
