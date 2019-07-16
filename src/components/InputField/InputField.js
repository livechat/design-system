import * as React from 'react';
import * as PropTypes from 'prop-types';
import Input from './Input';
import TextField from '../TextField';

const InputField = React.forwardRef((props, ref) => {
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
      <Input
        {...restProps}
        ref={ref}
        className={fieldClassName}
        id={id}
        error={error}
      />
    </TextField>
  );
});

InputField.propTypes = {
  labelText: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  fieldClassName: PropTypes.string,
  inline: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  description: PropTypes.node
};

export default InputField;
