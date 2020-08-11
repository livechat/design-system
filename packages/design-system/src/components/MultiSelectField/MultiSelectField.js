import * as React from 'react';
import * as PropTypes from 'prop-types';
import MultiSelect from './MultiSelect';
import TextField from '../TextField';

const MultiSelectField = props => {
  const {
    inline,
    error,
    description,
    labelText,
    labelAdornment,
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
      labelAdornment={labelAdornment}
      className={className}
      htmlFor={id}
    >
      <MultiSelect
        {...restProps}
        className={fieldClassName}
        id={id}
        error={error}
      />
    </TextField>
  );
};

MultiSelectField.propTypes = {
  labelText: PropTypes.string,
  /**  specifies additional decorative element rendered at the end of the label */
  labelAdornment: PropTypes.node,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  fieldClassName: PropTypes.string,
  inline: PropTypes.bool,
  error: PropTypes.string,
  description: PropTypes.node
};

export default MultiSelectField;
